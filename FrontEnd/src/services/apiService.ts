import axios, { AxiosInstance } from 'axios';
import urls from '../urls.json';

export interface CreateBusinessData {
    name: string;
    address: string;
    phone: string;
}


export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface Period {
    close: { day: number; time: string };
    open: { day: number; time: string };
}

export interface OpeningHours {
    open_now: boolean;
    periods?: Period[] | any[] | null;
    weekday_text: string[];
}

export interface Business {
    business_status: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: {
        location: { lat: number; lng: number };
        viewport: {
            northeast: { lat: number; lng: number };
            southwest: { lat: number; lng: number };
        };
    };
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    rating: number;
    user_ratings_total: number;
    website: string;
}

export interface Catalog {
    id: string;
    name: string;
    description: string;
    thumbnail_url: string;
    records_number: number;
    catalog_link: string;
    can_access: boolean;
}

let baseUrl = urls.REACT_APP_API_URL
let webSocketURL = urls.REACT_APP_WEBSOCKET_URL

const apiClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Use once authentication added in project
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Adjust the token retrieval as necessary
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const fetchBusinesses = async (jsonData: {
    catalogue_dataset_id: string;
} | undefined): Promise<Business[]> => {
    try {

        const response = await apiClient.post(urls.REACT_APP_LOAD_DATASET, jsonData);

        const requestId = response.data.request_id;

        const websocket = new WebSocket(`${baseUrl}${webSocketURL}${requestId}`);

        return new Promise<Business[]>((resolve, reject) => {
            websocket.onopen = function () {
                websocket.send(JSON.stringify(jsonData));
            };

            websocket.onmessage = function (event) {
                const res = JSON.parse(event.data);
                // websocket.close();
                resolve(res.data);  // Resolve the promise with the received data
            };

            websocket.onerror = function (error) {
                websocket.close();
                console.error('WebSocket error:', error);
                reject(error);  // Reject the promise on error
            };

            websocket.onclose = function () {
                console.log('WebSocket connection closed');
            };
        });

    } catch (error) {
        console.error('Error catalog full dataset:', error);
        throw error;
    }
};

export const getCatalog = async (): Promise<Catalog[]> => {
    try {
        const response = await apiClient.get(urls.ALL_CATALOGS_METADATA);
        return response.data;

    } catch (error) {
        console.error('Error fetching all Catalogs metadata:', error);
        throw error;
    }
};