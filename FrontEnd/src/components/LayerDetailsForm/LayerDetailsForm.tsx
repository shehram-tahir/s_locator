import React, { useState } from "react";
import styles from "./LayerDetailsForm.module.css";
import Loader from "../Loader/Loader";
import { LayerDetailsFormProps } from "../../types/allTypesAndInterfaces";

function LayerDetailsForm(props: LayerDetailsFormProps) {
  const {
    countries,
    cities,
    categories,
    selectedCountry,
    selectedCity,
    selectedCategory,
    handleCountryChange,
    handleCityChange,
    handleCategoryChange,
    handleFirstFormApiCall,
    loading,
  } = props;

  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!selectedCountry || !selectedCity || !selectedCategory) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleButtonClick = (action: string) => {
    if (validateForm()) {
      handleFirstFormApiCall(action);
    }
  };

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
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
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
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
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
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              className={styles.button}
              onClick={() => handleButtonClick("Get Sample")}
            >
              Get Sample
            </button>
            <button
              className={styles.button}
              onClick={() => handleButtonClick("Get Data")}
            >
              Get Data
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LayerDetailsForm;
