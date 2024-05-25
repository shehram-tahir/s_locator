import React, { useEffect,  useState } from "react";
import mapboxgl from "mapbox-gl";
import CatalogueCard from "../../components/CatalogueCard/CatalogueCard";
import styles from "./Home.module.css";
import Modal from "../../components/Modal/Modal";
import {
  getCatalog,
  Catalog,
  fetchBusinesses,
} from "../../services/apiService";
import {createSearchParams, useLocation, useNavigate } from 'react-router-dom';


mapboxgl.accessToken = process.env?.REACT_APP_MAPBOX_KEY ?? "";

const HomeComponent = () => {
  
  const [businesses, setBusinesses] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [cardData, setCardData] = useState<Catalog[]| undefined>(undefined);
  const [showModal, setShowModal] = useState(true);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();

  const handleMoreInfo = (catalogLink: string) => {
    window.open(catalogLink, "_blank");
  };

  useEffect(() => {
    const fetchCatalogData = async () => {
      if (!cardData) {
        try {
          const data = await getCatalog();
          setCardData(data);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchBusinessData = async () => {
      try {
        if (!businesses) {
          const data1 = await fetchBusinesses({
            lat: 22.4925,
            lng: 39.17757,
            radius: 5000,
            type: "grocery_or_supermarket",
          });
          let formatedData: any = {
            type: "FeatureCollection",
            features: [],
          };
          data1?.forEach((x) => {
            formatedData.features.push({
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [
                  x.geometry?.location?.lat,
                  x.geometry?.location?.lng,
                ],
              },
            });
          });
          setBusinesses(formatedData);
        }
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogData();
    fetchBusinessData();
  }, []);

  useEffect(() => {
    if (businesses) {
      const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: businesses?.features[0]?.geometry?.coordinates,
        minZoom: 7,
        maxZoom: 16,
        attributionControl: true,
        zoom: 13,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.on('load', () => {
      
        if (!!businesses?.features && businesses?.features?.length) {
          map.addSource('circle', {
            type: 'geojson',
            data: businesses,
          });

          map.addLayer({
            id: 'circle-layer',
            type: 'circle',
            source: 'circle',
            minzoom: 7,
            maxzoom: 16,
            paint: {
              'circle-radius': 13,
              'circle-color': '#12939A',
              'circle-opacity': 0.8,
              'circle-stroke-width': 0.4,
              'circle-stroke-color': '#898989',
            },
          });
        }
      });
      return () => map.remove();
    }
  }, [businesses]);

  return (
    <div className={styles.content}>
      <div id="map-container" style={{ width: "96%", height: "100vh", zIndex: 99 }} />;
      <Modal show={showModal} onClose={closeModal}>
        <h2 className={styles.catalogueHeading}>Add Data to Map</h2>
        <div className={styles.catalogueWrapper}>
          {cardData?.map((item) => (
            <CatalogueCard
              key={item.id}
              id={item.id}
              thumbnail_url={item.thumbnail_url}
              name={item.name}
              records_number={item.records_number}
              description={item.description}
              onMoreInfo={() => handleMoreInfo(item.catalog_link)}
              can_access={item.can_access}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HomeComponent;
