import axios, { AxiosInstance } from 'axios';

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
    lat: number;
    lng: number;
    radius: number;
    type: string;
}

let baseUrl = process.env?.REACT_APP_API_URL ?? "";
let webSocketURL = process.env?.REACT_APP_WEBSOCKET_URL ?? "";

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

export const getBusinessDetails = async (id: string): Promise<Business> => {
    try {
        const response = await apiClient.get(`/business/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching business details:', error);
        throw error;
    }
};

export const fetchBusinesses = async (jsonData: {
        lat: number; lng: number; radius: number; type: string;
    } | undefined): Promise<Business[]> => {
    try {

        const response = await apiClient.post('/fetch-data', jsonData);
        
        console.log('HTTP response received:', response.data);

        const requestId = response.data.request_id;
        console.log('returned request ID= ', requestId)

        const websocket = new WebSocket(`${webSocketURL}${requestId}`);

        return new Promise<Business[]>((resolve, reject) => {
            websocket.onopen = function () {
                console.log('WebSocket connection opened');
                websocket.send(JSON.stringify(jsonData));
            };

            websocket.onmessage = function (event) {
                console.log('Message received from server:', event.data);
                const res = JSON.parse(event.data);
                websocket.close();
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
        console.error('Error fetching businesses:', error);
        throw error;
    }
};

/**
 * TODO: implement backend API, should return data in Catalog format 
 * @returns 
 */
export const getCatalog = async (): Promise<Catalog[]> => {
    try {
        // uncomment once developed
        // const response = await apiClient.get('/fetch-catalog');
        // return response.data;

        // Remove it when above endpoint added.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        name: "Saudi Arabia - gas stations poi data",
                        description: "Database of all Saudi Arabia gas stations Points of Interrests",
                        thumbnail_url:"https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
                        catalog_link:'https://example.com/catalog2.jpg',
                        records_number: 10,
                        can_access: true,
                        lat: 22.4925,
                          lng: 39.17757,
                          radius: 5000,
                          type: "grocery_or_supermarket",
                    },
                    {
                        id: '2',
                        name: "Saudi Arabia - Real Estate Transactions",
                        description: "Database of real-estate transactions in Saudi Arabia",
                        thumbnail_url: "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
                        catalog_link:'https://example.com/catalog2.jpg',
                        records_number: 20,
                        can_access: false,
                        lat: 22.4925,
                          lng: 39.17757,
                          radius: 5000,
                          type: "grocery_or_supermarket",
                    },
                    {
                        id: "5218f0ef-c4db-4441-81e2-83ce413a9645",
                        name: "Saudi Arabia - gas stations poi data",
                        description:
                            "Database of all Saudi Arabia gas stations Points of Interrests",
                        thumbnail_url:
                            "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/SAUgasStations.PNG",
                        catalog_link:'https://catalog-assets.s3.ap-northeast-1.amazonaws.com/SAUgasStations.PNG',
                        records_number: 8517,
                        can_access: false,
                        lat: 22.4925,
                          lng: 39.17757,
                          radius: 5000,
                          type: "grocery_or_supermarket",
                    },
                    {
                        id: "3e5ee589-25e6-4cae-8aec-3ed3cdecef94",
                        name: "Saudi Arabia  - Restaurants, Cafes and Bakeries",
                        description: "Focusing on the restaurants, cafes and bakeries in KSA",
                        thumbnail_url:
                          "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sau_bak_res.PNG",
                          catalog_link:
                          "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sau_bak_res.PNG",
                        records_number: 132383,
                        can_access: true,
                        lat: 22.4925,
                          lng: 39.17757,
                          radius: 5000,
                          type: "grocery_or_supermarket",
                      },
                      {
                        id: "c4eb5d56-4fcf-4095-8037-4c84894fd014",
                        name: "Saudi Arabia - Real Estate Transactions",
                        description: "Database of real-estate transactions in Saudi Arabia",
                        thumbnail_url:
                          "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
                          catalog_link: "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
                        records_number: 179141,
                        can_access: false,
                          lat: 22.4925,
                          lng: 39.17757,
                          radius: 5000,
                          type: "grocery_or_supermarket",
                      },
                ]);
            }, 2000);
        });
        
    } catch (error) {
        console.error('Error fetching Catalog:', error);
        throw error;
    }
};