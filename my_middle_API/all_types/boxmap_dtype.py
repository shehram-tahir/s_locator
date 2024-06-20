from pydantic import BaseModel


from typing import List, Literal


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


class CatlogData(BaseModel):
    type: Literal['FeatureCollection']
    features: List[Feature]