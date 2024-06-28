// src/context/CatalogContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CatalogContextType } from "../types/allTypesAndInterfaces";

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [formStage, setFormStage] = useState("catalogue");
  const [saveMethod, setSaveMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [legendList, setLegendList] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  function handleAddClick(id: string, name: string) {
    // Fetch the chosen catalog or layer to pre-populate the description and price

    console.log(`Adding catalogue with ID: ${id} and Name: ${name}`);
    setIsLoading(true);

    const data = {
      legendList: `Legend List for ${name}`,
      subscriptionPrice: "99.99",
    };

    setSelectedCatalog({ id, name });
    setLegendList(data.legendList);
    setSubscriptionPrice(data.subscriptionPrice);

    setIsLoading(false);
    console.log(
      `Catalogue with ID: ${id} and Name: ${name} added successfully.`
    );
    setFormStage("catalogue details");
  }

  function handleSaveClick() {
    setFormStage("save options");
  }

  function handleSave() {
    const saveData = {
      catalogId: selectedCatalog?.id,
      description,
      name,
      saveMethod,
    };

    console.log("Saving data:", saveData);

    setIsLoading(true);
    setTimeout(function () {
      console.log("API call to save the data:", saveData);
      setIsLoading(false);
      if (true) {
        setIsSaved(true);
      } else {
        setIsError(true);
      }
    }, 2000);
  }

  function handleSaveMethodChange(method: string) {
    setSaveMethod(method);
  }

  function resetFormStage() {
    setFormStage("catalogue");
  }

  return (
    <CatalogContext.Provider
      value={{
        formStage,
        saveMethod,
        isLoading,
        isSaved,
        isError,
        selectedCatalog,
        legendList,
        subscriptionPrice,
        description,
        name,
        setFormStage,
        setSaveMethod,
        setIsLoading,
        setIsSaved,
        setIsError,
        setSelectedCatalog,
        setLegendList,
        setSubscriptionPrice,
        setDescription,
        setName,
        handleAddClick,
        handleSaveClick,
        handleSave,
        handleSaveMethodChange,
        resetFormStage,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalogContext must be used within a CatalogProvider");
  }
  return context;
}
