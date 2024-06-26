// src/components/Layout/Layout.tsx
import React, { useState, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./VertiSideBar.module.css";
import ExpandableMenu from "../ExpandableMenu/ExpandableMenu";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import CreateLayer from "../CreateLayer/CreateLayer";
import Dataview from "../../pages/Dataview/Dataview";
import Modal from "../Modal/Modal";
import { useLayerContext } from "../../context/LayerContext";
import { useCatalogContext } from "../../context/CatalogContext";
import CatalogSideMenu from "../CatalogSideMenu/CatalogSideMenu";
import CatalogDetailsForm from "../CatalogDetailsForm/CatalogDetailsForm";
import DefaultMenu from "../DefaultMenu/DefaultMenu";

function Layout() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [sidebarMode, setSidebarMode] = useState("default");
  const { resetFormStage } = useLayerContext();
  const {
    handleAddClick,
    setFormStage,
    selectedCatalog,
    legendList,
    subscriptionPrice,
    description,
    name,
    handleDescriptionChange,
    handleNameChange,
    handleSaveClick,
  } = useCatalogContext();

  function toggleMenu() {
    setIsMenuExpanded(!isMenuExpanded);
  }

  function handleViewClick() {
    setIsViewClicked(!isViewClicked);
  }

  function openLayerModal() {
    setModalContent(<CreateLayer closeModal={closeModal} />);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    resetFormStage();
    setModalContent(null);
  }

  function goBackToDefaultMenu() {
    setSidebarMode("default");
  }

  function handleAddCatalogClick(id: string, name: string) {
    handleAddClick(id, name);
    setFormStage("catalog details");
    setSidebarMode("catalogDetails");
  }

  return (
    <div className={styles.layout}>
      {sidebarMode === "default" ? (
        <ExpandableMenu isExpanded={isMenuExpanded} toggleMenu={toggleMenu}>
          <DefaultMenu
            isMenuExpanded={isMenuExpanded}
            isViewClicked={isViewClicked}
            handleViewClick={handleViewClick}
            openLayerModal={openLayerModal}
            setSidebarMode={setSidebarMode}
          />
        </ExpandableMenu>
      ) : (
        <div className={styles.CreateCatalogMenu}>
          {sidebarMode === "catalog" ? (
            <CatalogSideMenu
              goBack={goBackToDefaultMenu}
              onAddClick={handleAddCatalogClick}
            />
          ) : (
            sidebarMode === "catalogDetails" &&
            selectedCatalog && (
              <CatalogDetailsForm
                handleSaveClick={handleSaveClick}
                selectedCatalog={selectedCatalog}
                legendList={legendList}
                subscriptionPrice={subscriptionPrice}
                description={description}
                name={name}
                handleDescriptionChange={handleDescriptionChange}
                handleNameChange={handleNameChange}
                goBackToDefaultMenu={goBackToDefaultMenu}
              />
            )
          )}
        </div>
      )}
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tabularView" element={<Dataview />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        modalClass={"smallerContainer"}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default Layout;
