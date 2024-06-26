// src/pages/Home/Home.tsx
import React, { useState } from 'react';
import styles from "./Home.module.css";
import MapContainer from "../../components/MapContainer/MapContainer";
import Modal from '../../components/Modal/Modal';
import DataContainer from '../../components/DataContainer/DataContainer';

const HomeComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.content}>
      <MapContainer />
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal} homePageModal={true}>
          <DataContainer closeModal={closeModal} containerType="Catalogue" />
        </Modal>
      )}
    </div>
  );
};

export default HomeComponent;
