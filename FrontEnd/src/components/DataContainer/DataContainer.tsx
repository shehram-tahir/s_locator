import React, { useState, useEffect } from "react";
import CatalogueCard from "../CatalogueCard/CatalogueCard";
import styles from "./DataContainer.module.css";
import { DataContainerProps } from "../../types/allTypesAndInterfaces";
import { HttpReq } from "../../services/apiService";
import urls from "../../urls.json";
import { Catalog } from "../../types/allTypesAndInterfaces";
import { useNavigate } from "react-router-dom";



function DataContainer(props: DataContainerProps) {
  const { closeModal, handleAddClick, containerType } = props;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"
  );

  const [resData, setResData] = useState<Catalog[] | string>("");
  const [resMessage, setResMessage] = useState<string>("");
  const [resId, setResId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  function fetchData() {
    const endpoint =
      containerType === "Catalogue"
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
  }

  useEffect(fetchData, [containerType]);

  function handleCatalogCardClick(selectedCatalog: Catalog) {
    const queryParams =
      containerType === "Catalogue"
        ? `?catalogue_dataset_id=${selectedCatalog.id}`
        : `?layer_dataset_id=${selectedCatalog.id}`;
    navigate(`${queryParams}`, { replace: true });
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
        handleAddClick={handleAddClick ? handleAddClick : function () {}}
        containerType={containerType}
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
        {containerType === "Catalogue"
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
              containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"
            );
          }}
        >
          {containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"}
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
        <div className={styles.dataGrid}>{resData.map(makeCard)}</div>
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
