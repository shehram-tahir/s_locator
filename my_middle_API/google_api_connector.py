import requests

from data_types import LocationRequest


async def fetch_from_google_maps_api(location_req: LocationRequest, app_config):
    lat, lng, radius, place_type = location_req.lat, location_req.lng, location_req.radius, location_req.type
    params = {
        'key': app_config.api_key,
        'location': f"{lat},{lng}",
        'radius': radius,
        'type': place_type
    }

    response = requests.get(app_config.base_urls.nearby_search, params=params)
    results = response.json()

    output_data = []
    if 'results' in results:
        for place in results['results']:
            details_params = {
                'key': app_config.api_key,
                'place_id': place['place_id'],
                'fields': app_config.google_fields
            }
            details_response = requests.get(app_config.base_urls.place_details, params=details_params)
            place_details = details_response.json().get('result', {})
            output_data.append(place_details)

    return output_data
