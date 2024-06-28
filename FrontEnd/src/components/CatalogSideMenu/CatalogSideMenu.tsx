import React, { useState } from "react";
import styles from "./CatalogSideMenu.module.css";
import { MdLayers, MdArrowBackIos } from "react-icons/md";
import Modal from "../Modal/Modal";
import { CatalogSideMenuProps } from "../../types/allTypesAndInterfaces";
import { useCatalogContext } from "../../context/CatalogContext";
import Loader from "../Loader/Loader";
import DataContainer from "../DataContainer/DataContainer";

function CatalogSideMenu(props: CatalogSideMenuProps) {
  const { goBack, setSidebarMode } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"catalog" | "layer">(
    "layer"
  );


  const { resetFormStage, isLoading } = useCatalogContext();

  function openModal(contentType: "catalog" | "layer") {
    setModalContent(contentType);
    setIsModalOpen(true);
  }

  function closeModal() {
    resetFormStage('catalogue');
    setIsModalOpen(false);
  }

  // Modal content based on the state
  const modalContentElement = isLoading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : modalContent === "catalog" ? (
    <DataContainer
      closeModal={closeModal}
      setSidebarMode={setSidebarMode}
      containerType="Catalogue"
    />
  ) : (
    <DataContainer
      closeModal={closeModal}
      setSidebarMode={setSidebarMode}
      containerType="Layer"
    />
  );

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
          onClick={function () {
            openModal("catalog");
          }}
        >
          + Add Catalog
        </button>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Layers</p>
        <button
          className={`${styles.addButton} ${styles.addLayerButton}`}
          onClick={function () {
            openModal("layer");
          }}
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
        <Modal show={isModalOpen} onClose={closeModal} >
          {modalContentElement}
        </Modal>
      )}
    </>
  );
}

export default CatalogSideMenu;
