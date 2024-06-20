from typing import Tuple
from pydantic import BaseModel, Field


class LocationRequest(BaseModel):
    lat: float
    lng: float
    radius: int
    type: str


class CatlogId(BaseModel):
    catalogue_dataset_id: str


class res_default(BaseModel):
    message: str
    request_id: str


class restype_fetch_acknowlg_id(res_default):
    data: str


class catlog_metadata(BaseModel):
    id: str
    name: str
    description: str
    thumbnail_url: str
    catalog_link: str
    records_number: int
    can_access: int


class restype_all_catlogs(res_default):
    message: str
    request_id: str
    data: list[catlog_metadata]
