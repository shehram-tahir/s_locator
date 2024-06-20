


export interface CatalogueContainerProps { }

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface Period {
    close: { day: number; time: string; };
    open: { day: number; time: string; };
}

export interface OpeningHours {
    open_now: boolean;
    periods?: Period[] | any[] | null;
    weekday_text: string[];
}


export interface CreateBusinessData {
    name: string;
    address: string;
    phone: string;
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


export interface TabularData {
    formatted_address: string;
    name: string;
    rating: number;
    user_ratings_total: number;
    website: string;
}


export interface GeoPoint {
    location: { lat: number; lng: number; };
}

export type ArrayGeoPoint = Array<GeoPoint>;

export interface BoxmapProperties {
    name: string 
    rating: number
    address: string 
    phone: string
    website: string
    business_status: string
    user_ratings_total: number
}


export interface Feature {
    type: 'Feature';
    properties: BoxmapProperties;
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
}

export interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
}

// export interface BusinessResponse {
//     geometry: {
//       location: {
//         lng: number;
//         lat: number;
//       };
//     };
//   }
