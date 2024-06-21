// src/components/CatalogueContainer/CatalogueContainer.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import CatalogueCard from '../CatalogueCard/CatalogueCard';
import Modal from '../Modal/Modal';
import styles from './CatalogueContainer.module.css';
import { CatalogueContainerProps } from '../../types/allTypesAndInterfaces';
import {HttpReq} from '../../services/apiService';
import urls from '../../urls.json';
import { Catalog } from '../../types/allTypesAndInterfaces';
import { useNavigate } from 'react-router-dom';
import { createQueryString } from '../../utils/urlUtils';

const CatalogueContainer: React.FC<CatalogueContainerProps> = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [resData, setResData] = useState<Catalog[] | string>('');
  const [resMessage, setResMessage] = useState<string>('');
  const [resId, setResId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(function() {
    HttpReq<Catalog[]>(
      urls.catlog_collection,
      setResData,
      setResMessage,
      setResId,
      setLoading,
      setError
    );
  }, []);

  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div></div>;
  }

  if (typeof resData === 'string') {
    return <div>{resData}</div>;
  }

  function handleCatalogCardClick(selectedCatalog: Catalog) {
    const queryParams = `?catalogue_dataset_id=${selectedCatalog.id}`;
    navigate(`${queryParams}`, { replace: true });
    closeModal();
  }

  function make_card(item: Catalog) {
    return (
      <CatalogueCard
        key={item.id}
        id={item.id}
        thumbnail_url={item.thumbnail_url}
        name={item.name}
        records_number={item.records_number}
        description={item.description}
        onMoreInfo={() => handleCatalogCardClick(item)}
        can_access={item.can_access}
      />
    );
  }

  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className={styles.catalogueContainer}>
        <h2 className={styles.catalogueHeading}>Add Data to Map</h2>
        <div className={styles.catalogueGrid}>
          {resData.map(make_card)}
        </div>
      </div>
    </Modal>
  );
};

export default CatalogueContainer;
