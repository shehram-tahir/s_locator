from dataclasses import dataclass
from pydantic import BaseModel

class LocationRequest(BaseModel):
    lat: float
    lng: float
    radius: int
    type: str


class CatalogueDataset(BaseModel):
    catalogue_dataset_id: str
    
@dataclass
class ApiCommonConfig:
    api_key: str
    base_urls: dict[str]


@dataclass
class ApiRequestConfig:
    nearby_search: dict[str]
    place_details: dict[str]


@dataclass
class DbConfig:
    db_connection_string: str
    db_name: str


class AcknowledgementResponse(BaseModel):
    message: str
    request_id: str

class DataResponse(BaseModel):
    data: dict

class FetchLocationDataResponse(BaseModel):
    business_status: str
    formatted_address: str
    formatted_phone_number: str
    geometry: dict
    name: str
    opening_hours: dict
    photos: list
    rating: float
    user_ratings_total: int