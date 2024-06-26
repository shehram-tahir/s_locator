import React, { useState, useEffect } from "react";
import CatalogueCard from "../CatalogueCard/CatalogueCard";
import styles from "./DataContainer.module.css";
import { CatalogueContainerProps } from "../../types/allTypesAndInterfaces";
import { HttpReq } from "../../services/apiService";
import urls from "../../urls.json";
import { Catalog } from "../../types/allTypesAndInterfaces";
import { useNavigate } from "react-router-dom";

interface DataContainerProps extends CatalogueContainerProps {
  containerType: "Catalogue" | "Layer";
}

const DataContainer: React.FC<DataContainerProps> = ({
  closeModal,
  isFromAddCatalogue = false,
  isFromAddLayer = false,
  handleAddClick,
  containerType,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"
  );

  const [resData, setResData] = useState<Catalog[] | string>("");
  const [resMessage, setResMessage] = useState<string>("");
  const [resId, setResId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
  }, [containerType]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (typeof resData === "string") {
    return <div>{resData}</div>;
  }

  const handleCatalogCardClick = (selectedCatalog: Catalog) => {
    const queryParams =
      containerType === "Catalogue"
        ? `?catalogue_dataset_id=${selectedCatalog.id}`
        : `?layer_dataset_id=${selectedCatalog.id}`;
    navigate(`${queryParams}`, { replace: true });
    closeModal();
  };

  const make_card = (item: Catalog) => (
    <CatalogueCard
      key={item.id}
      id={item.id}
      thumbnail_url={item.thumbnail_url}
      name={item.name}
      records_number={item.records_number}
      description={item.description}
      onMoreInfo={() => handleCatalogCardClick(item)}
      can_access={item.can_access}
      isFromAddCatalogue={isFromAddCatalogue}
      isFromAddLayer={isFromAddLayer}
      handleAddClick={handleAddClick ? handleAddClick : () => {}}
    />
  );

  return (
    <div className={styles.dataContainer}>
      <h2 className={styles.dataHeading}>
        {containerType === "Catalogue"
          ? "Add Data to Map"
          : "Add Layers to Map"}
      </h2>
      {(isFromAddCatalogue || isFromAddLayer) && (
        <div className={styles.tabMenu}>
          <button
            className={
              activeTab === "Data Catalogue" || activeTab === "Data Layer"
                ? styles.activeTab
                : styles.tabButton
            }
            onClick={() =>
              setActiveTab(
                containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"
              )
            }
          >
            {containerType === "Catalogue" ? "Data Catalogue" : "Data Layer"}
          </button>
          <button
            className={
              activeTab === "Load Files" ? styles.activeTab : styles.tabButton
            }
            onClick={() => setActiveTab("Load Files")}
          >
            Load Files
          </button>
          <button
            className={
              activeTab === "Connect Your Data"
                ? styles.activeTab
                : styles.tabButton
            }
            onClick={() => setActiveTab("Connect Your Data")}
          >
            Connect Your Data
          </button>
        </div>
      )}
      {activeTab === "Data Catalogue" || activeTab === "Data Layer" ? (
        <div className={styles.dataGrid}>{resData.map(make_card)}</div>
      ) : activeTab === "Load Files" ? (
        <div className={styles.placeholderContent}>Load Files Content</div>
      ) : (
        <div className={styles.placeholderContent}>
          Connect Your Data Content
        </div>
      )}
    </div>
  );
};

export default DataContainer;
