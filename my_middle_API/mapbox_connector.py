from all_types.google_dtypes import GglResponse
from all_types.myapi_dtypes import MapData

class MapBoxConnector:
    @classmethod
    async def ggl_to_boxmap(self, businesses_response: GglResponse) -> MapData:
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

        business_data = MapData(
            type='FeatureCollection',
            features=features
        )

        return business_data.model_dump()

    @classmethod
    async def new_ggl_to_boxmap(self, businesses_response: GglResponse) -> MapData:
        features = []

        for business in businesses_response:
            lng = business.get('location', {}).get('longitude', 0)
            lat = business.get('location', {}).get('latitude', 0)

            feature = {
                'type': 'Feature',
                'properties': {
                    'name': business.get('displayName', '').get("text",""),
                    'rating': business.get('rating', ''),
                    'address': business.get('formattedAddress', ''),
                    'phone': business.get('internationalPhoneNumber', business.get('nationalPhoneNumber', '')),
                    'website': business.get('websiteUri', ''),
                    'business_status': business.get('businessStatus', ''),
                    'user_ratings_total': business.get('userRatingCount', '')
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }

            features.append(feature)

        business_data = MapData(
            type='FeatureCollection',
            features=features
        )

        return business_data.model_dump()









