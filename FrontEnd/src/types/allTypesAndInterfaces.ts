import React, { ChangeEvent } from "react";

export interface CatalogueContainerProps {
  closeModal: () => void;
  isFromAddCatalogue?: boolean;
  isFromAddLayer?: boolean;
  handleAddClick?: (id: string, name: string) => void;
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

// export interface BusinessResponse {
//     geometry: {
//       location: {
//         lng: number;
//         lat: number;
//       };
//     };
//   }

export interface SaveOptionsProps {
  handleSave: () => void;
  handleSaveMethodChange: (method: string) => void;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClass?: string;
  homePageModal?: boolean;
}

export interface LayerDetailsFormProps {
  countries: string[];
  cities: string[];
  categories: string[];
  selectedCountry: string;
  selectedCity: string;
  selectedCategory: string;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleNextStep: () => void;
  handleFirstFormApiCall: (action: string) => void;
  loading: boolean; 
}

export interface ExpandableMenuProps {
  isExpanded: boolean;
  toggleMenu: () => void;
  children?: React.ReactNode;
}

export interface CustomizeLayerProps {
  pointColor: string;
  legend: string;
  description: string;
  name: string; // Add name prop
  handleColorChange: (color: string) => void;
  handleLegendChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  handleNextStep: () => void;
  closeModal: () => void;
}


export interface ColorSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface CatalogueCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  records_number: number;
  can_access: boolean;
  onMoreInfo: () => void;
  isFromAddCatalogue?: boolean;
  isFromAddLayer?: boolean;
  handleAddClick: (id: string, name: string) => void;
}

export interface CatalogDetailsProps {
  handleSaveClick: () => void;
  selectedCatalog: { id: string; name: string };
  legendList: string;
  subscriptionPrice: string;
  description: string;
  name: string;
  handleDescriptionChange: (desc: string) => void;
  handleNameChange: (name: string) => void;
}

export interface CatalogSideMenuProps {
  goBack: () => void;
  onAddClick: (id: string, name: string) => void;
}
// Types for Layer Context
// -----------------------

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
  firstFormData: {
    selectedCountry: string;
    selectedCity: string;
    selectedCategory: string;
  };
  secondFormData: {
    pointColor: string;
    legend: string;
    description: string;
    name: string;
  };
  formStage: string;
  isSaved: boolean;
  isError: boolean;
  firstFormResponse: string | FirstFormResponse;
  saveMethod: string;
  countries: string[];
  cities: City[];
  citiesData: { [country: string]: City[] };
  categories: string[];
  message: string;
  id: string;
  requests: RequestType[];
  loading: boolean;
  error: Error | null;
  setFirstFormData: React.Dispatch<React.SetStateAction<any>>;
  setSecondFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormStage: React.Dispatch<React.SetStateAction<string>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstFormResponse: React.Dispatch<
    React.SetStateAction<string | FirstFormResponse>
  >;
  setSaveMethod: React.Dispatch<React.SetStateAction<string>>;
  setCountries: React.Dispatch<React.SetStateAction<string[]>>;
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  setCitiesData: React.Dispatch<
    React.SetStateAction<{ [country: string]: City[] }>
  >;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSecondFormChange: (
    event: ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => void;
  handleColorChange: (color: string) => void;
  handleNextStep: () => void;
  handleFirstFormApiCall: (action: string) => void;
  handleSaveMethodChange: (method: string) => void;
  handleSave: () => void;
  addRequest: (id: string, requestMessage: string, error: Error | null) => void;
  resetFormStage: () => void; 
}

// -----------------------------

// Catalogue related interfaces
export interface CatalogueContainerProps {
  closeModal: () => void;
  isFromAddCatalogue?: boolean;
  isFromAddLayer?: boolean;
  handleAddClick?: (id: string, name: string) => void;
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

// Create Catalog related interfaces

export interface CreateCatalogProps {
  closeModal: () => void;
  isFromAddCatalogue: boolean;
  isFromAddLayer: boolean;
  setModalClass: (className: string) => void;
}

export interface CatalogDetailsProps {
  handleSaveClick: () => void;
  selectedCatalog: { id: string; name: string };
  legendList: string;
  subscriptionPrice: string;
  description: string;
  name: string;
  handleDescriptionChange: (desc: string) => void;
  handleNameChange: (name: string) => void;
  goBackToDefaultMenu: () => void;
}

export interface SaveOptionsProps {
  handleSave: () => void;
  handleSaveMethodChange: (method: string) => void;
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
  handleAddClick: (id: string, name: string) => void;
  handleSaveClick: () => void;
  handleSave: () => void;
  handleSaveMethodChange: (method: string) => void;
  handleDescriptionChange: (desc: string) => void;
  handleNameChange: (name: string) => void;
  resetFormStage: () => void;
}
// -----------------------------
