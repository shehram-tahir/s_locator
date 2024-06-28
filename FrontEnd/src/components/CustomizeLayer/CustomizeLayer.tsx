import React, { useState, ChangeEvent } from "react";
import styles from "./CustomizeLayer.module.css";
import ColorSelect from "../ColorSelect/ColorSelect";
import { useLayerContext } from "../../context/LayerContext";

interface CustomizeLayerProps {
  closeModal: Function;
}

function CustomizeLayer(props: CustomizeLayerProps) {
  const { closeModal } = props;
  const { setSecondFormData, handleNextStep } = useLayerContext();

  const [pointColor, setPointColor] = useState<string>("");
  const [legend, setLegend] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black"];

  function handleColorChange(color: string): void {
    setPointColor(color);
  }

  function handleSecondFormChange(
    event: ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ): void {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "legend":
        setLegend(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  }

  function validateForm(): boolean {
    if (!name || !pointColor || !legend || !description) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleButtonClick(): void {
    if (validateForm()) {
      setSecondFormData({ pointColor, legend, description, name });
      handleNextStep();
    }
  }

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
          onChange={handleSecondFormChange}
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
          onChange={handleSecondFormChange}
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
          onChange={handleSecondFormChange}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={closeModal as any}>
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
