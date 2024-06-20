// src/pages/Home/Home.tsx
import styles from "./Home.module.css";
import MapContainer from "../../components/MapContainer/MapContainer";
import CatalogueContainer from "../../components/CatalogueContainer/CatalogueContainer";


const HomeComponent: React.FC = () => {


  return (
    <div className={styles.content}>
      <MapContainer/>
      <CatalogueContainer />
    </div>
  );
};

export default HomeComponent;