import React, { useEffect, useState, ChangeEvent } from "react";
import { HttpReq } from "../../services/apiService";
import {
  City,
  FirstFormResponse,
  FormData,
} from "../../types/allTypesAndInterfaces";
import styles from "./LayerDetailsForm.module.css";
import Loader from "../Loader/Loader";
import { useLayerContext } from "../../context/LayerContext";
import urls from "../../urls.json";

function LayerDetailsForm() {
  const { handleNextStep, setFirstFormResponse, loading } = useLayerContext();

  const [firstFormData, setFirstFormData] = useState<FormData>({
    selectedCountry: "",
    selectedCity: "",
    selectedCategory: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [citiesData, setCitiesData] = useState<{ [country: string]: City[] }>(
    {}
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // City request response information
  const [cityResMessage, setCityResMessage] = useState<string>("");
  const [cityResId, setCityResId] = useState<string>("");

  // Categories request response information
  const [categoriesResMessage, setCategoriesResMessage] = useState<string>("");
  const [categoriesResId, setCategoriesResId] = useState<string>("");

  // Nearby_cities post response information
  const [postResMessage, setPostResMessage] = useState<string>("");
  const [postResId, setPostResId] = useState<string>("");

  function processCountries(data: any): string[] {
    if (typeof data === "object" && data !== null) {
      const countryNames = Object.keys(data);
      setCitiesData(data);
      return countryNames;
    }
    return [];
  }

  function fetchData() {
    HttpReq<string[]>(
      urls.country_city,
      function (data) {
        setCountries(processCountries(data));
      },
      setCityResMessage,
      setCityResId,
      setLocalLoading,
      setError
    );

    HttpReq<string[]>(
      urls.old_nearby_categories,
      function (data) {
        setCategories(data as string[]);
      },
      setCategoriesResMessage,
      setCategoriesResId,
      setLocalLoading,
      setError
    );
  }

  useEffect(function () {
    fetchData();
  }, []);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFirstFormData(function (prevData: FormData) {
      return {
        ...prevData,
        [name]: value,
      };
    });

    if (name === "selectedCountry") {
      const selectedCountryCities = citiesData[value] || [];
      setCities(selectedCountryCities);
      setFirstFormData(function (prevData: FormData) {
        return {
          ...prevData,
          selectedCity: "", // Reset selected city when country changes
        };
      });
    }
  }

  function validateForm() {
    if (
      !firstFormData.selectedCountry ||
      !firstFormData.selectedCity ||
      !firstFormData.selectedCategory
    ) {
      setError(new Error("All fields are required."));
      return false;
    }
    setError(null);
    return true;
  }

  function handleButtonClick(action: string) {
    if (validateForm()) {
      handleFirstFormApiCall(action);
    }
  }

  function handleFirstFormApiCall(action: string) {
    const postData = {
      lat: 37.7937,
      lng: -122.3965,
      radius: 1000,
      type: "convenience_store",
    };

    HttpReq<FirstFormResponse>(
      urls.http_single_nearby,
      setFirstFormResponse,
      setPostResMessage,
      setPostResId,
      setLocalLoading,
      setError,
      "post",
      postData
    );

    handleNextStep();
  }

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="country">
          Country:
        </label>
        <select
          id="country"
          name="selectedCountry"
          className={styles.select}
          value={firstFormData.selectedCountry}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map(function (country) {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="city">
          City:
        </label>
        <select
          id="city"
          name="selectedCity"
          className={styles.select}
          value={firstFormData.selectedCity}
          onChange={handleChange}
          disabled={!firstFormData.selectedCountry}
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map(function (city) {
            return (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          name="selectedCategory"
          className={styles.select}
          value={firstFormData.selectedCategory}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map(function (category) {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className={styles.error}>{error.message}</p>}
      <div className={styles.buttonContainer}>
        {localLoading || loading ? (
          <Loader />
        ) : (
          <>
            <button
              className={styles.button}
              onClick={function () {
                handleButtonClick("Get Sample");
              }}
            >
              Get Sample
            </button>
            <button
              className={styles.button}
              onClick={function () {
                handleButtonClick("Get Data");
              }}
            >
              Get Data
            </button>
          </>
        )}
      </div>
      {localLoading && <Loader />}
    </div>
  );
}

export default LayerDetailsForm;
