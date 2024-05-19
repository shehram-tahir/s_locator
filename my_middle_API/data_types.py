from dataclasses import dataclass
from pydantic import BaseModel

class LocationRequest(BaseModel):
    lat: float
    lng: float
    radius: int
    type: str

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
