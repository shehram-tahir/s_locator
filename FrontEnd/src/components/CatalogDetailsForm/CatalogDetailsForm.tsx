// src/components/CatalogDetailsForm/CatalogDetailsForm.tsx
import React, { useState, useEffect } from "react";
import styles from "./CatalogDetailsForm.module.css";
import { CatalogDetailsProps } from "../../types/allTypesAndInterfaces";
import Modal from "../Modal/Modal";
import SaveOptions from "../SaveOptions/SaveOptions";
import Loader from "../Loader/Loader";
import { MdCheckCircleOutline, MdOutlineErrorOutline } from "react-icons/md";

function CatalogDetailsForm(props: CatalogDetailsProps) {
  const {
    handleSaveClick,
    legendList,
    subscriptionPrice,
    description,
    name,
    handleDescriptionChange,
    handleNameChange,
    goBackToDefaultMenu,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStage, setFormStage] = useState<string>("initial");

  useEffect(() => {
    handleDescriptionChange(description);
  }, [description, handleDescriptionChange]);

  useEffect(() => {
    handleNameChange(name);
  }, [name, handleNameChange]);

  const validateForm = () => {
    if (!name || !description) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      setIsModalOpen(true); // Open the modal
      setFormStage("saveOptions");
    }
  };

  const handleSave = () => {
    setFormStage("loading");
    setTimeout(() => {
      // Simulate an API call
      const isSuccess = true; // Change this to false to simulate an error
      if (isSuccess) {
        setFormStage("saved");
      } else {
        setFormStage("error");
      }
    }, 2000);
  };

  const handleSaveMethodChange = (method: string) => {
    console.log("Selected save method:", method);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    goBackToDefaultMenu();
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Create Catalog</h1>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="legendlist">
            Legend List
          </label>
          <textarea
            id="legendlist"
            className={`${styles.select} ${styles.textArea}`}
            value={legendList}
            readOnly
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subprice">
            Subscription Price
          </label>
          <input
            type="text"
            id="subprice"
            className={styles.select}
            value={subscriptionPrice}
            readOnly
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.select}
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={`${styles.select} ${styles.textArea}`}
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          ></textarea>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.discardButton}`}
            onClick={goBackToDefaultMenu}
          >
            Discard
          </button>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={handleButtonClick}
          >
            Save Catalog
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          modalClass={"smallerContainerv2"}
          homePageModal={true}
        >
          <div className={styles.containerModal}>
            {formStage === "saveOptions" && (
              <SaveOptions
                formStage={formStage}
                handleSave={handleSave}
                handleSaveMethodChange={handleSaveMethodChange}
              />
            )}
            {formStage === "loading" && (
              <div className={styles.loaderContainer}>
                <Loader />
              </div>
            )}
            {formStage === "saved" && (
              <div className={styles.successMessage}>
                <MdCheckCircleOutline className={styles.successIcon} />
                <p>Saved successfully!</p>
              </div>
            )}
            {formStage === "error" && (
              <div className={styles.errorMessage}>
                <MdOutlineErrorOutline className={styles.errorIcon} />
                <p>Failed to save. Please try again later.</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default CatalogDetailsForm;
