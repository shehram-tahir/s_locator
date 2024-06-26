// src/components/CatalogSideMenu/CatalogSideMenu.tsx
import React, { useState } from "react";
import styles from "./CatalogSideMenu.module.css";
import { MdLayers, MdArrowBackIos } from "react-icons/md";
import Modal from "../Modal/Modal";
import { CatalogSideMenuProps } from "../../types/allTypesAndInterfaces";
import { useCatalogContext } from "../../context/CatalogContext";
import Loader from "../Loader/Loader";

import DataContainer from "../DataContainer/DataContainer";

function CatalogSideMenu(props: CatalogSideMenuProps) {
  const { goBack, onAddClick } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"catalog" | "layer">(
    "layer"
  );
  const [modalClass, setModalClass] = useState("");

  const { resetFormStage, isLoading } = useCatalogContext();

  function openModal(contentType: "catalog" | "layer") {
    setModalContent(contentType);
    setIsModalOpen(true);
  }

  function closeModal() {
    resetFormStage();
    setIsModalOpen(false);
  }

  return (
    <>
      <nav className={styles.nav}>
        <MdArrowBackIos className={styles.backIcon} onClick={goBack} />
        <MdLayers className={styles.icon} />
      </nav>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Datasets</p>
        <button
          className={`${styles.addButton} ${styles.addDataButton}`}
          onClick={() => openModal("catalog")}
        >
          + Add Catalog
        </button>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Layers</p>
        <button
          className={`${styles.addButton} ${styles.addLayerButton}`}
          onClick={() => openModal("layer")}
        >
          + Add Layer
        </button>
      </div>
      <div className={styles.controls}>
        <label className={styles.label}>Layer Blending</label>
        <select className={styles.select}>
          <option value="normal">Normal</option>
        </select>
        <label className={styles.label}>Map Overlay Blending</label>
        <select className={styles.select}>
          <option value="normal">Normal</option>
        </select>
      </div>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal} modalClass={modalClass}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : modalContent === "catalog" ? (
            <DataContainer
              closeModal={closeModal}
              isFromAddCatalogue={true}
              handleAddClick={onAddClick}
              containerType="Catalogue"
            />
          ) : (
            <DataContainer
              closeModal={closeModal}
              isFromAddLayer={true}
              handleAddClick={onAddClick}
              containerType="Layer"
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default CatalogSideMenu;
