from all_types.google_dtypes import GglResponse
from all_types.myapi_dtypes import LocationReq, CatlogId
from all_types.myapi_dtypes import CountryCityData
from google_api_connector import fetch_from_google_maps_api
from mapbox_connector import MapBoxConnector
from storage import get_data_from_storage, store_data, get_dataset_from_storage
import asyncio


async def fetch_nearby(location_req: LocationReq):
    # Try to get data from storage
    data = await get_data_from_storage(location_req)
    if not data:
        await asyncio.sleep(2)
        # If data is not in storage, fetch from Google Maps API
        data = await fetch_from_google_maps_api(location_req)
        # Store the fetched data in storage
        await store_data(location_req, data)
    return data


async def get_catalogue_dataset(catalogue_dataset_id: str):
    data = await get_dataset_from_storage(catalogue_dataset_id)
    if not data:
        data = {}
    return data


async def fetch_catlog_collection(**kwargs):
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
        metadata.append(
            {
                "id": str(i),
                "name": f"Saudi Arabia - Sample Data {i}",
                "description": f"Sample description for dataset {i}",
                "thumbnail_url": "https://catalog-assets.s3.ap-northeast-1.amazonaws.com/sample_image.png",
                "catalog_link": "https://example.com/sample_image.jpg",
                "records_number": i * 100,
                "can_access": i % 2 == 0,
            }
        )

    return metadata


async def get_boxmap_catlog_data(req: CatlogId):
    response_data: GglResponse = await get_catalogue_dataset(
        req.catalogue_dataset_id
    )
    trans_data = await MapBoxConnector.ggl_to_boxmap(response_data)
    return trans_data


async def nearby_boxmap(req):
    response_data = await fetch_nearby(req)
    trans_data = await MapBoxConnector.new_ggl_to_boxmap(response_data)
    return trans_data


async def fetch_country_city_data(**kwargs):
    data = {
        "country1": [
            {"name": "city1", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
            {"name": "city2", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
            {"name": "city3", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
        ],
        "country2": [
            {"name": "cityA", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
            {"name": "cityB", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
            {"name": "cityC", "lat": 37.7937, "lng": -122.3965, "radius": 1000},
        ],
    }

    return data


async def fetch_nearby_categories(**kwargs):
    data = ["convenience_store", "Cat2", "Cat3"]

    return data
