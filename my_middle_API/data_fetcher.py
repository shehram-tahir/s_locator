from data_types import LocationRequest
from google_api_connector import fetch_from_google_maps_api
from storage import get_data_from_storage, store_data
import asyncio

async def fetch_data(location_req: LocationRequest, app_config):
    # Try to get data from storage
    data = await get_data_from_storage(location_req, app_config)
    if not data:
        await asyncio.sleep(20)
        # If data is not in storage, fetch from Google Maps API
        data = await fetch_from_google_maps_api(location_req, app_config)
        # Store the fetched data in storage
        await store_data(location_req, data, app_config)
    return data
