from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
import uuid
from all_types.config_dtypes import ApiCommonConfig
from mapbox_connector import get_boxmap_catlog_data
from config_factory import ConfigFactory
from data_fetcher import fetch_data, fetch_catlog_collection
from all_types.myapi_dtypes import (
    LocationRequest,
    CatlogId,
    restype_all_catlogs,
    restype_fetch_acknowlg_id,
)
from all_types.boxmap_dtype import CatlogData
from typing import Type, Callable, Awaitable, Any, Optional


urls = ConfigFactory.load_config("common_settings.json", ApiCommonConfig)
try:
    secrets_config = ConfigFactory.load_config("secret_settings.json", ApiCommonConfig)
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


async def ws_handling(
    websocket: WebSocket,
    request_id: str,
    input_type: Type[BaseModel],
    output_type: Type[BaseModel],
    custom_function: Callable[[Any], Awaitable[Any]],
):
    await manager.connect(websocket, request_id)
    try:
        while True:
            req = await websocket.receive_text()
            parsed_req = input_type.model_validate_json(req)
            response = await custom_function(parsed_req)
            try:
                validated_output = output_type.model_validate(response)
                await manager.send_json(
                    {"data": validated_output.model_dump()}, request_id
                )
            except ValidationError as e:
                error_message = f"Output data validation failed: {str(e)}"
                await manager.send_json({"error": error_message}, request_id)
    except WebSocketDisconnect:
        manager.disconnect(request_id)
        print(f"WebSocket disconnected: {request_id}")


async def http_handling(
    req: Optional[BaseModel],
    input_type: BaseModel,
    output_type: BaseModel,
    custom_function: Callable[[BaseModel], Any],
):
    output = ""

    if req is not None:
        try:
            input_type.model_validate(req)
        except ValidationError as e:
            raise HTTPException(
                status_code=400, detail=f"Invalid request body with error: {e}"
            ) from e

    if custom_function is not None:
        output = await custom_function(req=req)

    request_id = "req-" + str(uuid.uuid4())

    res_body = output_type(
        message="Request received",
        request_id=request_id,
        data=output,
    )

    return res_body


@app.websocket(urls.dataset_ws)
async def ws_1(websocket: WebSocket, request_id: str):
    await ws_handling(
        websocket,
        request_id,
        CatlogId,
        CatlogData,
        get_boxmap_catlog_data,
    )


@app.websocket(urls.point_ws)
async def ws_2(websocket: WebSocket, request_id: str):
    await ws_handling(websocket, request_id, LocationRequest, CatlogId, fetch_data)


@app.get(urls.fetch_acknowlg_id, response_model=restype_fetch_acknowlg_id)
async def http_2():
    response = await http_handling(
        None,
        None,
        restype_fetch_acknowlg_id,
        None,
    )
    return response


# replace below with just fetch_acknowlg_id again
# @app.post(urls.fetch_data, response_model=AcknowledgementResponse)


@app.get(urls.catlog_collection, response_model=restype_all_catlogs)
async def http_1():
    response = await http_handling(
        None,
        None,
        restype_all_catlogs,
        fetch_catlog_collection,
    )
    return response
