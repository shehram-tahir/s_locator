import json
from dataclasses import dataclass, fields, is_dataclass


@dataclass
class ConfigDict:
    def __init__(self, dictionary):
        for key, value in dictionary.items():
            if isinstance(value, dict):
                setattr(self, key, ConfigDict(value))
            else:
                setattr(self, key, value)


class ConfigFactory:
    @staticmethod
    def load_config(file_path: str, config_class):
        # Load configuration from a JSON file
        with open(file_path, 'r') as config_file:
            config_data = json.load(config_file)

        # Recursively convert dictionaries to instances of the config class
        return ConfigFactory._dict_to_object(config_data, config_class)

    @staticmethod
    def _dict_to_object(data, config_class):
        if not is_dataclass(config_class):
            raise TypeError(f"{config_class} is not a dataclass type")

        # Create an instance of the config class
        obj = config_class(**{f.name: None for f in fields(config_class)})

        for key, value in data.items():
            if isinstance(value, dict):
                # Set nested dictionaries as ConfigDict objects for attribute access
                setattr(obj, key, ConfigDict(value))
            else:
                setattr(obj, key, value)

        return obj


# Example usage
# Assuming the JSON configuration file looks something like this:
# {
#     "api_key": "your_api_key",
#     "base_urls": {
#         "google": "https://maps.googleapis.com/maps/api",
#         "bing": "https://dev.virtualearth.net/REST/v1"
#     }
# }
# # Loading configuration
# config = ConfigFactory.load_config(
#     'G:\\My Drive\\Personal\\Work\\offline\\Jupyter\\Git\\s_locator\\common_settings.json', ApiCommonConfig)
# print(config.api_key)  # Output: your_api_key
# print(config.base_urls.google)  # Output: https://maps.googleapis.com/maps/api
