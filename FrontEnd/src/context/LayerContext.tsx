import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  FirstFormResponse,
  LayerContextType,
} from "../types/allTypesAndInterfaces";

const LayerContext = createContext<LayerContextType | undefined>(undefined);

export function LayerProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [secondFormData, setSecondFormData] = useState({
    pointColor: "",
    legend: "",
    description: "",
    name: "",
  });

  const [formStage, setFormStage] = useState("initial");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstFormResponse, setFirstFormResponse] = useState<
    string | FirstFormResponse
  >("");
  const [saveMethod, setSaveMethod] = useState("");

  // Define color options and selected color state
  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black"];
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Function to handle progressing to the next step in the form
  function handleNextStep() {
    if (formStage === "initial") {
      setFormStage("secondStep");
    } else if (formStage === "secondStep") {
      setFormStage("thirdStep");
    }
  }

  // Function to handle the save operation, simulating an API call
  function handleSave() {
    const saveData = {
      firstFormResponse,
      secondFormData,
      saveMethod,
    };

    console.log("Starting save process with the following data:", saveData);

    setLoading(true);

    // Simulate an API call with a timeout
    setTimeout(function () {
      setLoading(false);
      const isSuccess = true;
      if (isSuccess) {
        setIsSaved(true);
        console.log("Save successful!");
      } else {
        setIsError(true);
        console.error("Save failed!");
      }
    }, 1000);
  }

  // Function to reset the form stage and related state
  function resetFormStage() {
    setIsSaved(false);
    setIsError(false);
    setFormStage("initial");
  }

  return (
    <LayerContext.Provider
      value={{
        secondFormData,
        setSecondFormData,
        formStage,
        isSaved,
        isError,
        firstFormResponse,
        saveMethod,
        loading,
        setFormStage,
        setIsSaved,
        setIsError,
        setFirstFormResponse,
        setSaveMethod,
        setLoading,
        handleNextStep,
        handleSave,
        resetFormStage,
        colorOptions,
        selectedColor,
        setSelectedColor,
        setSaveOption: setSaveMethod, // Ensure setSaveOption is available
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

// Hook to use the LayerContext
export function useLayerContext() {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error("useLayerContext must be used within a LayerProvider");
  }
  return context;
}
