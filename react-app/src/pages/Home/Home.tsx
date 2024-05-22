// MapComponent.js
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import CatalogueCard from "../../components/CatalogueCard/CatalogueCard";
import styles from "./Home.module.css";
import Modal from "../../components/Modal/Modal";

const HomeComponent = () => {
  useEffect(() => {
    // mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    // const map = new mapboxgl.Map({
    //   container: 'map-container',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-74.5, 40],
    //   zoom: 9,
    // });
    // return () => map.remove(); // Cleanup
  }, []);
  const handleMoreInfo = () => {
    alert("More information clicked!");
  };

  const [showModal, setShowModal] = useState(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={styles.content}>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      ></div>
      <Modal show={showModal} onClose={closeModal}>
        <h2>Add Data to Map</h2>
        <div className={styles.catalogueWrapper}>
          <CatalogueCard
            ribbonText="Free"
            imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
            title="Sample Data for Madina Masged Nabawy area"
            rows={1641}
            description="Focusing on all places of interests around Madina Masged Nabawy"
            onMoreInfo={handleMoreInfo}
          />
          <CatalogueCard
            ribbonText="Free"
            imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
            title="Sample Data for Madina Masged Nabawy area"
            rows={1641}
            description="Focusing on all places of interests around Madina Masged Nabawy"
            onMoreInfo={handleMoreInfo}
          />
          <CatalogueCard
            ribbonText="Free"
            imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
            title="Sample Data for Madina Masged Nabawy area"
            rows={1641}
            description="Focusing on all places of interests around Madina Masged Nabawy"
            onMoreInfo={handleMoreInfo}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomeComponent;
