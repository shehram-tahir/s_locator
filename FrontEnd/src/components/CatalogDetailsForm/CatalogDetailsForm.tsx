import React, { useState } from "react";
import styles from "./CatalogDetailsForm.module.css";
import Modal from "../Modal/Modal";
import SaveOptions from "../SaveOptions/SaveOptions";
import Loader from "../Loader/Loader";
import { useCatalogContext } from "../../context/CatalogContext";
import { CatalogDetailsProps } from "../../types/allTypesAndInterfaces";
import SavedIconFeedback from "../SavedIconFeedback/SavedIconFeedback";
import ErrorIconFeedback from "../ErrorIconFeedback/ErrorIconFeedback";

function CatalogDetailsForm(props: CatalogDetailsProps) {
  const { goBackToDefaultMenu } = props;

  const {
    legendList,
    subscriptionPrice,
    description,
    name,
    setDescription,
    setName,
    handleSave,
    isLoading,
    isSaved,
    isError,
    handleSaveMethodChange,
    resetFormStage
  } = useCatalogContext();

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function validateForm() {
    if (!name || !description) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleButtonClick() {
    if (validateForm()) {
      setIsModalOpen(true);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    resetFormStage('default')
    goBackToDefaultMenu();
  }

  function renderModalContent() {
    if (isLoading) {
      return <Loader />;
    }

    if (isSaved) {
      return <SavedIconFeedback />;
    }

    if (isError) {
      return <ErrorIconFeedback />;
    }

    return (
      <SaveOptions
        handleSave={handleSave}
        handleSaveMethodChange={handleSaveMethodChange}
      />
    );
  }

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
            onChange={function (e) {
              setName(e.target.value);
            }}
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
            onChange={function (e) {
              setDescription(e.target.value);
            }}
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
          isSmaller={true}
          darkBackground={true}
        >
          <div className={styles.containerModal}>{renderModalContent()}</div>
        </Modal>
      )}
    </>
  );
}

export default CatalogDetailsForm;
