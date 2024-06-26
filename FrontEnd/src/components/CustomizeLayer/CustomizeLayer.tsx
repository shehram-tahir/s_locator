import React, { useState } from "react";
import styles from "./CustomizeLayer.module.css";
import ColorSelect from "../ColorSelect/ColorSelect"; // Make sure the path is correct
import { CustomizeLayerProps } from "../../types/allTypesAndInterfaces";

function CustomizeLayer(props: CustomizeLayerProps) {
  const {
    pointColor,
    legend,
    description,
    name,
    handleColorChange,
    handleLegendChange,
    handleDescriptionChange,
    handleNameChange,
    handleNextStep,
    closeModal,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black"];

  const validateForm = () => {
    if (!name || !pointColor || !legend || !description) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      handleNextStep();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="pointColor">
          Point Color:
        </label>
        <ColorSelect
          options={colorOptions}
          value={pointColor}
          onChange={handleColorChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="legend">
          Enter Legend:
        </label>
        <textarea
          id="legend"
          name="legend"
          className={styles.textarea}
          rows={3}
          value={legend}
          onChange={handleLegendChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          className={`${styles.textarea} ${styles.description}`}
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={closeModal}>
          Discard
        </button>
        <button className={styles.button} onClick={handleButtonClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomizeLayer;
