from all_types.google_dtypes import CatlogResponseData
from all_types.boxmap_dtype import CatlogData
from all_types.myapi_dtypes import CatlogId
from data_fetcher import get_catalogue_dataset

class MapBoxConnector:
    @classmethod
    async def ggl_to_boxmap(self, businesses_response: CatlogResponseData) -> CatlogData:
        features = []

        for business in businesses_response:
            lng = business["geometry"].get('location', {}).get('lng', 0)
            lat = business["geometry"].get('location', {}).get('lat', 0)

            feature = {
                'type': 'Feature',
                'properties': {
                    'name': business.get('name', ''),
                    'rating': business.get('rating', 0),
                    'address': business.get('formatted_address', ''),
                    'phone': business.get('formatted_phone_number', ''),
                    'website': business.get('website', ''),
                    'business_status': business.get('business_status', ''),
                    'user_ratings_total': business.get('user_ratings_total', 0)
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }

            features.append(feature)

        business_data = CatlogData(
            type='FeatureCollection',
            features=features
        )

        return business_data.model_dump()


async def get_boxmap_catlog_data(catalogue_dataset_id: CatlogId):
    response_data:CatlogResponseData = await get_catalogue_dataset(
        catalogue_dataset_id.catalogue_dataset_id
    )
    trans_data = await MapBoxConnector.ggl_to_boxmap(response_data)
    return trans_data





