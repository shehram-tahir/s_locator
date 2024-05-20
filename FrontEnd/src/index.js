import axios from 'axios';


let common_config = {
    "fetch_data_url": "http://localhost:8000/fetch-data",
    "websocket_url": "ws://localhost:8000/ws/"
};

document.getElementById('send-button').addEventListener('click', async function () {
    console.log('Button clicked');
    const jsonInput = document.getElementById('json-input').value;
    const resultElement = document.getElementById('result');

    // Clear previous result and show loading message
    resultElement.textContent = 'Sending request...';
    console.log('Loading message set');

    try {
        const jsonData = JSON.parse(jsonInput);
        console.log('JSON parsed:', jsonData);

        // Make an HTTP POST request to initiate the process and get the acknowledgment
        const response = await axios.post(common_config.fetch_data_url, jsonData);
        console.log('HTTP response received:', response.data);

        // Display the immediate acknowledgment
        resultElement.textContent = JSON.stringify(response.data, null, 2);

        const requestId = response.data.request_id;
        console.log('returned request ID= ', requestId)

        // Establish a WebSocket connection for real-time updates
        const websocket = new WebSocket(`${common_config.websocket_url}${requestId}`);

        websocket.onopen = function () {
            console.log('WebSocket connection opened');
            websocket.send(JSON.stringify(jsonData));
        };

        websocket.onmessage = function (event) {
            console.log('Message received from server:', event.data);
            const data = JSON.parse(event.data);
            resultElement.textContent += '\n' + JSON.stringify(data, null, 2);
        };

        websocket.onerror = function (error) {
            console.error('WebSocket error:', error);
            resultElement.textContent = 'Error receiving data. Please try again.';
        };

        websocket.onclose = function () {
            console.log('WebSocket connection closed');
        };
    } catch (error) {
        console.error('Error parsing JSON:', error);
        resultElement.textContent = 'Invalid JSON input.';
    }
});
