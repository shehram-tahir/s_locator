from typing import Dict, List, Literal, Tuple
from pydantic import BaseModel, Field


class LocationReq(BaseModel):
    lat: float
    lng: float
    radius: int
    type: str


class CatlogId(BaseModel):
    catalogue_dataset_id: str


class ResDefault(BaseModel):
    message: str
    request_id: str


class restype_fetch_acknowlg_id(ResDefault):
    data: str







class catlog_metadata(BaseModel):
    id: str
    name: str
    description: str
    thumbnail_url: str
    catalog_link: str
    records_number: int
    can_access: int


class restype_all_catlogs(ResDefault):
    message: str
    request_id: str
    data: list[catlog_metadata]



class Geometry(BaseModel):
    type: Literal['Point']
    coordinates: List[float]


class boxmapProperties(BaseModel):
    name: str
    rating: float
    address: str
    phone: str
    website: str
    business_status: str
    user_ratings_total: int


class Feature(BaseModel):
    type: Literal['Feature']
    properties: dict
    geometry: Geometry

class MapData(BaseModel):
    type: Literal['FeatureCollection']
    features: List[Feature]


class ResTypeMapData(ResDefault):
    data: MapData


class CountryCityData(ResDefault):
    data: Dict[str, List[str]]

class NearbyCategories(ResDefault):
    data: List[str]
