import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/VertiSideBar";
import { AppDataProvider } from "./context/AppDataContext";
import { CatalogProvider } from "./context/CatalogContext";
import { LayerProvider } from "./context/LayerContext";

const App: React.FC = () => {
  return (
    <Router>
      <CatalogProvider>
        <LayerProvider>
          <Layout />
        </LayerProvider>
      </CatalogProvider>
    </Router>
  );
};

export default App;
