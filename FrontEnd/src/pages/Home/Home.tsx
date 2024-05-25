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

mapboxgl.accessToken =
  "pk.eyJ1IjoidWhhaWRlcjE0IiwiYSI6ImNsdHg5Y3F1MjAwa28ybG02a3AyajZoNnEifQ.Gz8HFmZK8UwXW3dTsSQ1Uw";

const HomeComponent = () => {
  
  const [businesses, setBusinesses] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [cardData, setCardData] = useState<Catalog[]>([]);
  const [showModal, setShowModal] = useState(true);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleMoreInfo = (catalogLink: string) => {
    window.open(catalogLink, "_blank");
  };

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        const data = await getCatalog();
        setCardData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
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
        zoom: 12,
      });

      map.addControl(new mapboxgl.FullscreenControl());

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
            paint: {
              'circle-radius': 15,
              'circle-color': '#12939A',
              'circle-opacity': 0.8,
              'circle-stroke-width': 0.4,
              'circle-stroke-color': '#898989',
            },
          });
        }
      });
    }
  }, [businesses]);

  return (
    <div className={styles.content}>
      <div id="map-container" style={{ width: "100%", height: "100vh" }} />;
      <Modal show={showModal} onClose={closeModal}>
        <h2 className={styles.catalogueHeading}>Add Data to Map</h2>
        <div className={styles.catalogueWrapper}>
          {cardData.map((item) => (
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
