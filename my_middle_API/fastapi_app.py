from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import uuid
from config_factory import ConfigFactory
from data_fetcher import fetch_data
from data_types import ApiCommonConfig, LocationRequest, AcknowledgementResponse, DataResponse


app_config = ConfigFactory.load_config('common_settings.json', ApiCommonConfig)
try:
    secrets_config = ConfigFactory.load_config('secret_settings.json', ApiCommonConfig)
    app_config.api_key = secrets_config.api_key
except:
    app_config.api_key = ""


app = FastAPI()

# Enable CORS
origins = [app_config.enable_CORS_url]

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

@app.post(app_config.request_acknowledge)
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

@app.websocket("/ws/{request_id}")
async def websocket_endpoint(websocket: WebSocket, request_id: str):
    await manager.connect(websocket, request_id)
    try:
        while True:
            data = await websocket.receive_text()
            location_req = LocationRequest.parse_raw(data)

            response_data = await fetch_data(location_req, app_config)

            await manager.send_json({"data": response_data}, request_id)
    except WebSocketDisconnect:
        manager.disconnect(request_id)
        print(f"WebSocket disconnected: {request_id}")
