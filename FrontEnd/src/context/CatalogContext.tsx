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
  const [selectedContainerType, setSelectedContainerType] = useState<
    "Catalogue" | "Layer" | "Home"
  >("Home");

  // Function to handle adding a catalog, simulating an API call and setting state
  function handleAddClick(id: string, name: string) {
    console.log(`Adding catalogue with ID: ${id} and Name: ${name}`);
    setIsLoading(true);

    // Simulated data fetching
    const data = {
      legendList: `Legend List for ${name}`,
      subscriptionPrice: "99.99",
    };

    // Set selected catalog and related details
    setSelectedCatalog({ id, name });
    setLegendList(data.legendList);
    setSubscriptionPrice(data.subscriptionPrice);

    setIsLoading(false);
    console.log(
      `Catalogue with ID: ${id} and Name: ${name} added successfully.`
    );
    setFormStage("catalogue details");
  }

  // Function to handle save button click, transitioning to save options
  function handleSaveClick() {
    setFormStage("save options");
  }

  // Function to handle actual save operation, simulating an API call
  function handleSave() {
    const saveData = {
      catalogId: selectedCatalog?.id,
      description,
      name,
      saveMethod,
    };

    console.log("Saving data:", saveData);

    setIsLoading(true);

    // Simulated API call with a timeout
    setTimeout(function () {
      console.log("API call to save the data:", saveData);
      setIsLoading(false);
      if (true) {
        setIsSaved(true);
        setLegendList("");
        setSubscriptionPrice("");
        setDescription("");
        setName("");
      } else {
        setIsError(true);
      }
    }, 2000);
  }

  // Function to reset the form stage and related state
  function resetFormStage(resetTo: string) {
    setDescription("");
    setName("");
    setIsSaved(false);
    setIsError(false);
    setFormStage(resetTo);
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
        resetFormStage,
        selectedContainerType,
        setSelectedContainerType,
        setSaveOption: setSaveMethod, // Added to handle save option setting
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

// Hook to use the CatalogContext
export function useCatalogContext() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalogContext must be used within a CatalogProvider");
  }
  return context;
}
