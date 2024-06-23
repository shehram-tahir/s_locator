# import requests

# from all_types.myapi_dtypes import LocationRequest
# from config_factory import ApiConfig

# async def fetch_from_google_maps_api(location_req: LocationRequest, conf:ApiConfig):
#     lat, lng, radius, place_type = location_req.lat, location_req.lng, location_req.radius, location_req.type
#     params = {
#         'key': conf.api_key,
#         'location': f"{lat},{lng}",
#         'radius': radius,
#         'type': place_type
#     }

#     response = requests.get(conf.nearby_search, params=params)
#     results = response.json()

#     output_data = []
#     if 'results' in results:
#         for place in results['results']:
#             details_params = {
#                 'key': conf.api_key,
#                 'place_id': place['place_id'],
#                 'fields': conf.google_fields
#             }
#             details_response = requests.get(conf.place_details, params=details_params)
#             place_details = details_response.json().get('result', {})
#             output_data.append(place_details)

#     return output_data



import requests

async def fetch_from_google_maps_api(req: LocationRequest, conf:ApiConfig):
    lat, lng, radius, place_type = req.lat, req.lng, req.radius, req.type

    url = "https://places.googleapis.com/v1/places:searchNearby"

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": conf.api_key,
        "X-Goog-FieldMask": "*"
    }

    data = {
        "includedTypes": [place_type],
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": lat,
                    "longitude": lng
                },
                "radius": radius
            }
        }
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        results = response.json()
        # Process the results here
        print(results)
    else:
        print("Error:", response.status_code)