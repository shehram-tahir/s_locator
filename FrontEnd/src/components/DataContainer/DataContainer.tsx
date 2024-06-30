import React, { useState, useEffect } from "react";
import CatalogueCard from "../CatalogueCard/CatalogueCard";
import styles from "./DataContainer.module.css";
import { HttpReq } from "../../services/apiService";
import urls from "../../urls.json";
import { Catalog } from "../../types/allTypesAndInterfaces";
import { useNavigate } from "react-router-dom";
import { useCatalogContext } from "../../context/CatalogContext";
import { useUIContext } from "../../context/UIContext";

function DataContainer() {
  const navigate = useNavigate();
  const { selectedContainerType, handleAddClick } = useCatalogContext();
  const { closeModal, setSidebarMode } = useUIContext();
  const [activeTab, setActiveTab] = useState("Data Catalogue");
  const [resData, setResData] = useState<Catalog[] | string>("");
  const [resMessage, setResMessage] = useState<string>("");
  const [resId, setResId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(
    function () {
      const endpoint =
        selectedContainerType === "Catalogue" || "Home"
          ? urls.catlog_collection
          : urls.layer_collection;

      HttpReq<Catalog[]>(
        endpoint,
        setResData,
        setResMessage,
        setResId,
        setLoading,
        setError
      );
    },
    [selectedContainerType]
  );

  function handleCatalogCardClick(selectedCatalog: Catalog) {
    const queryParams = `?catalogue_dataset_id=${selectedCatalog.id}`;
    navigate(`${queryParams}`, { replace: true });

    handleAddClick(selectedCatalog.id, selectedCatalog.name);
    setSidebarMode("catalogDetails");
    closeModal();
  }

  function makeCard(item: Catalog) {
    return (
      <CatalogueCard
        key={item.id}
        id={item.id}
        thumbnail_url={item.thumbnail_url}
        name={item.name}
        records_number={item.records_number}
        description={item.description}
        onMoreInfo={function () {
          handleCatalogCardClick(item);
        }}
        can_access={item.can_access}
      />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (typeof resData === "string") {
    return <div>{resData}</div>;
  }

  return (
    <div className={styles.dataContainer}>
      <h2 className={styles.dataHeading}>
        {selectedContainerType === "Catalogue" || "Home"
          ? "Add Data to Map"
          : "Add Layers to Map"}
      </h2>
      <div className={styles.tabMenu}>
        <button
          className={
            activeTab === "Data Catalogue" || activeTab === "Data Layer"
              ? styles.activeTab
              : styles.tabButton
          }
          onClick={function () {
            setActiveTab(
              selectedContainerType === "Catalogue"
                ? "Data Catalogue"
                : "Data Layer"
            );
          }}
        >
          {selectedContainerType === "Catalogue" || "Home"
            ? "Data Catalogue"
            : "Data Layer"}
        </button>
        <button
          className={
            activeTab === "Load Files" ? styles.activeTab : styles.tabButton
          }
          onClick={function () {
            setActiveTab("Load Files");
          }}
        >
          Load Files
        </button>
        <button
          className={
            activeTab === "Connect Your Data"
              ? styles.activeTab
              : styles.tabButton
          }
          onClick={function () {
            setActiveTab("Connect Your Data");
          }}
        >
          Connect Your Data
        </button>
      </div>
      {activeTab === "Data Catalogue" || activeTab === "Data Layer" ? (
        <div className={styles.dataGrid}>
          {Array.isArray(resData) &&
            resData.map(function (item: Catalog) {
              return makeCard(item);
            })}
        </div>
      ) : activeTab === "Load Files" ? (
        <div className={styles.placeholderContent}>Load Files Content</div>
      ) : (
        <div className={styles.placeholderContent}>
          Connect Your Data Content
        </div>
      )}
    </div>
  );
}

export default DataContainer;
