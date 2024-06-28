import React, { ChangeEvent } from "react";

// General Interfaces
export interface ModalProps {
  show: boolean;
  onClose(): void;
  children: React.ReactNode;
  darkBackground?: boolean;
  isSmaller?:boolean;
}

export interface ExpandableMenuProps {
  isExpanded: boolean;
  toggleMenu(): void;
  children?: React.ReactNode;
}

export interface ColorSelectProps {
  options: string[];
  value: string;
  onChange(value: string): void;
}

export interface FormData {
  selectedCountry: string;
  selectedCity: string;
  selectedCategory: string;
}

// Catalogue Interfaces
export interface DataContainerProps {
  closeModal(): void;
  isFromAddCatalogue?: boolean;
  isFromAddLayer?: boolean;
  containerType?: string | undefined;
  setSidebarMode?: React.Dispatch<React.SetStateAction<string>>;
}

export interface DefaultMenuProps {
  isMenuExpanded: boolean;
  isViewClicked: boolean;
  handleViewClick(): void;
  openLayerModal():  void;
  setSidebarMode(mode: string): void;
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
  containerType: string;
}

export interface CatalogSideMenuProps {
  goBack(): void;
  setSidebarMode:React.Dispatch<React.SetStateAction<string>>;
}

// Create Catalog Interfaces
export interface CreateCatalogProps {
  closeModal(): void;
  isFromAddCatalogue: boolean;
  isFromAddLayer: boolean;
  setModalClass(className: string): void;
}

export interface CatalogDetailsProps {
  goBackToDefaultMenu(): void;
}

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
  handleAddClick(id: string, name: string): void;
  handleSaveClick(): void;
  handleSave(): void;
  handleSaveMethodChange(method: string): void;
  resetFormStage(resetTo: string): void; 
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
  handleSaveMethodChange(method: string): void;
  handleSave(): void;
  resetFormStage(): void;
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

// Save Options Interface
export interface SaveOptionsProps {
  handleSave(): void;
  handleSaveMethodChange(method: string): void;
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
