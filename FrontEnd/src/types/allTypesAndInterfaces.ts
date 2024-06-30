import React, { ReactNode } from "react";

// General Interfaces
export interface ModalProps {
  children: React.ReactNode;
  darkBackground?: boolean;
  isSmaller?: boolean;
}


export interface FormData {
  selectedCountry: string;
  selectedCity: string;
  selectedCategory: string;
}

// Catalogue Interfaces

export interface ExpandableMenuProps {
  children: ReactNode;
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

export interface CatalogueCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  records_number: number;
  can_access: boolean;
  onMoreInfo(): void;
}

// Create Catalog Interfaces

// Catalog Context Type
export interface CatalogContextType {
  formStage: string;
  saveMethod: string;
  isLoading: boolean;
  isSaved: boolean;
  isError: boolean;
  selectedCatalog: { id: string; name: string } | null;
  legendList: string;
  subscriptionPrice: string;
  description: string;
  name: string;
  selectedContainerType: "Catalogue" | "Layer" | "Home";
  setFormStage: React.Dispatch<React.SetStateAction<string>>;
  setSaveMethod: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCatalog: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | null>
  >;
  setLegendList: React.Dispatch<React.SetStateAction<string>>;
  setSubscriptionPrice: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedContainerType: React.Dispatch<
    React.SetStateAction<"Catalogue" | "Layer" | "Home">
  >;
  handleAddClick(id: string, name: string): void;
  handleSaveClick(): void;
  handleSave(): void;
  resetFormStage(resetTo: string): void;
  setSaveOption: React.Dispatch<React.SetStateAction<string>>;
}

// Layer Context Types
export interface City {
  name: string;
  lat: number;
  lng: number;
  radius: number;
  type: string | null;
}

export interface RequestType {
  id: string;
  requestMessage: string;
  error: Error | null;
}

export interface FirstFormResponse {
  message: string;
  request_id: string;
  data: FeatureCollection;
}

export interface LayerContextType {
  secondFormData: {
    pointColor: string;
    legend: string;
    description: string;
    name: string;
  };
  setSecondFormData: React.Dispatch<
    React.SetStateAction<{
      pointColor: string;
      legend: string;
      description: string;
      name: string;
    }>
  >;
  formStage: string;
  isSaved: boolean;
  isError: boolean;
  firstFormResponse: string | FirstFormResponse;
  saveMethod: string;
  loading: boolean;
  setFormStage: React.Dispatch<React.SetStateAction<string>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstFormResponse: React.Dispatch<
    React.SetStateAction<string | FirstFormResponse>
  >;
  setSaveMethod: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep(): void;
  handleSave(): void;
  resetFormStage(): void;
  colorOptions: string[];
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setSaveOption: React.Dispatch<React.SetStateAction<string>>; 
}

export interface ModalOptions {
  darkBackground?: boolean;
  isSmaller?: boolean;
}

export interface UIContextProps {
  isModalOpen: boolean;
  modalContent: ReactNode;
  modalOptions: ModalOptions;
  sidebarMode: string;
  isMenuExpanded: boolean;
  isViewClicked: boolean;
  openModal(content: ReactNode, options?: ModalOptions): void;
  closeModal(): void;
  toggleMenu(): void;
  handleViewClick(): void;
  setSidebarMode(mode: string): void;
}


// Map and GeoPoint Interfaces
export interface GeoPoint {
  location: { lat: number; lng: number };
}

export type ArrayGeoPoint = Array<GeoPoint>;

export interface BoxmapProperties {
  name: string;
  rating: number | string;
  address: string;
  phone: string;
  website: string;
  business_status: string;
  user_ratings_total: number | string;
}

export interface Feature {
  type: "Feature";
  properties: BoxmapProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

// Commented out to avoid duplication
// export interface BusinessResponse {
//     geometry: {
//       location: {
//         lng: number;
//         lat: number;
//       };
//     };
//   }

// Ensure that the TabularData interface is included if it's used in your project
export interface TabularData {
  formatted_address: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  website: string;
}
