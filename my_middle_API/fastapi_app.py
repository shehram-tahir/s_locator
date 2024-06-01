from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import uuid
from config_factory import ConfigFactory
from data_fetcher import fetch_data, get_catalogue_dataset
from data_types import ApiCommonConfig, LocationRequest, AcknowledgementResponse, DataResponse, CatalogueDataset, FetchLocationDataResponse


urls = ConfigFactory.load_config('common_settings.json', ApiCommonConfig)
try:
    secrets_config = ConfigFactory.load_config('secret_settings.json', ApiCommonConfig)
    urls.api_key = secrets_config.api_key
except:
    urls.api_key = ""


app = FastAPI()

# Enable CORS
origins = [urls.enable_CORS_url]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, request_id: str):
        await websocket.accept()
        self.active_connections[request_id] = websocket

    def disconnect(self, request_id: str):
        if request_id in self.active_connections:
            del self.active_connections[request_id]

    async def send_personal_message(self, message: str, request_id: str):
        if request_id in self.active_connections:
            await self.active_connections[request_id].send_text(message)

    async def send_json(self, data: dict, request_id: str):
        if request_id in self.active_connections:
            await self.active_connections[request_id].send_json(data)

manager = ConnectionManager()


@app.get(urls.catalog_metadata)
async def get_metadata():
    metadata = [
        {
            "id": "1",
            "name": "Saudi Arabia - gas stations poi data",
            "description": "Database of all Saudi Arabia gas stations Points of Interests",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
            "catalog_link": "https://example.com/catalog2.jpg",
            "records_number": 10,
            "can_access": True,
        },
        {
            "id": "2",
            "name": "Saudi Arabia - Real Estate Transactions",
            "description": "Database of real-estate transactions in Saudi Arabia",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
            "catalog_link": "https://example.com/catalog2.jpg",
            "records_number": 20,
            "can_access": False,
        },
        {
            "id": "5218f0ef-c4db-4441-81e2-83ce413a9645",
            "name": "Saudi Arabia - gas stations poi data",
            "description": "Database of all Saudi Arabia gas stations Points of Interests",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/SAUgasStations.PNG",
            "catalog_link": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/SAUgasStations.PNG",
            "records_number": 8517,
            "can_access": False,
        },
        {
            "id": "3e5ee589-25e6-4cae-8aec-3ed3cdecef94",
            "name": "Saudi Arabia - Restaurants, Cafes and Bakeries",
            "description": "Focusing on the restaurants, cafes and bakeries in KSA",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sau_bak_res.PNG",
            "catalog_link": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sau_bak_res.PNG",
            "records_number": 132383,
            "can_access": True,
        },
        {
            "id": "c4eb5d56-4fcf-4095-8037-4c84894fd014",
            "name": "Saudi Arabia - Real Estate Transactions",
            "description": "Database of real-estate transactions in Saudi Arabia",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
            "catalog_link": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/real_estate_ksa.png",
            "records_number": 179141,
            "can_access": False,
        },
    ]
    
    # Add 20 more dummy entries
    for i in range(3, 23):
        metadata.append({
            "id": str(i),
            "name": f"Saudi Arabia - Sample Data {i}",
            "description": f"Sample description for dataset {i}",
            "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sample_image.png",
            "catalog_link": "https://example.com/sample_image.jpg",
            "records_number": i * 100,
            "can_access": i % 2 == 0,
        })
    
    return metadata

@app.post(urls.reqst_dataset)
async def request_ctalogue_dataset_load(catalogue_dataset_id: CatalogueDataset = Body(...)):
    try:
        # Validate the incoming JSON request body
        catalogue_dataset_id = CatalogueDataset(**catalogue_dataset_id.dict())
    except ValidationError as e:
        raise HTTPException(status_code=400, detail="Invalid request body")

    request_id = "req-" + str(uuid.uuid4())
    # Acknowledge the request
    return AcknowledgementResponse(message="Data load request received and is being processed", request_id=request_id)


@app.websocket(urls.dataset_ws)
async def websocket_endpoint(websocket: WebSocket, request_id: str):
    await manager.connect(websocket, request_id)
    try:
        while True:
            data = await websocket.receive_text()
            catalogue_dataset_id = CatalogueDataset.parse_raw(data)

            response_data = await get_catalogue_dataset(catalogue_dataset_id.catalogue_dataset_id)

            await manager.send_json({"data": response_data}, request_id)
    except WebSocketDisconnect:
        manager.disconnect(request_id)
        print(f"WebSocket disconnected: {request_id}")


@app.post(urls.request_acknowledge)
async def fetch_location_data(location_req: LocationRequest = Body(..., description="""
Send something like: 
{
  "lat": 40.712776,
  "lng": -74.005974,
  "radius": 5000,
  "type": "grocery_or_supermarket"
}
""")):
    try:
        # Validate the incoming JSON request body
        location_req = LocationRequest(**location_req.dict())
    except ValidationError as e:
        raise HTTPException(status_code=400, detail="Invalid request body")

    request_id = "req-" + str(uuid.uuid4())
    # Acknowledge the request
    return AcknowledgementResponse(message="Request received and is being processed", request_id=request_id)

@app.websocket(urls.point_ws)
async def websocket_endpoint(websocket: WebSocket, request_id: str):
    await manager.connect(websocket, request_id)
    try:
        while True:
            data = await websocket.receive_text()
            location_req = LocationRequest.parse_raw(data)

            response_data = await fetch_data(location_req, urls)

            await manager.send_json({"data": response_data}, request_id)
    except WebSocketDisconnect:
        manager.disconnect(request_id)
        print(f"WebSocket disconnected: {request_id}")
