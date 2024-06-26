import React, { useState } from "react";
import styles from "./SaveOptions.module.css";
import { SaveOptionsProps } from "../../types/allTypesAndInterfaces";

function SaveOptions(props: SaveOptionsProps & { formStage: string }) {
  const { handleSave, handleSaveMethodChange, formStage } = props;
  const [selectedOption, setSelectedOption] = useState("");

  function handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSelectedOption(value);
    handleSaveMethodChange(value);
  }

  return (
    <div className={styles.container}>
      {formStage !== "loading" &&
        formStage !== "saved" &&
        formStage !== "error" && (
          <>
            <h2 className={styles.title}>
              Select Your Preferred Saving Option
            </h2>
            <div className={styles.formGroup}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  value="Save sample on s-loc"
                  checked={selectedOption === "Save sample on s-loc"}
                  onChange={handleOptionChange}
                  className={styles.radioButton}
                />
                <span className={styles.optionText}>Save sample on s-loc</span>
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  value="Save full on s-loc. We create storage account for you, you still own the data"
                  checked={
                    selectedOption ===
                    "Save full on s-loc. We create storage account for you, you still own the data"
                  }
                  onChange={handleOptionChange}
                  className={styles.radioButton}
                />
                <span className={styles.optionText}>
                  Save full on s-loc. We create storage account for you, you
                  still own the data
                </span>
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  value="Save sample on your DB"
                  checked={selectedOption === "Save sample on your DB"}
                  onChange={handleOptionChange}
                  className={styles.radioButton}
                />
                <span className={styles.optionText}>
                  Save sample on your DB
                </span>
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  value="Save full on your DB"
                  checked={selectedOption === "Save full on your DB"}
                  onChange={handleOptionChange}
                  className={styles.radioButton}
                />
                <span className={styles.optionText}>Save full on your DB</span>
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={handleSave}
                disabled={!selectedOption}
              >
                Save
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default SaveOptions;
