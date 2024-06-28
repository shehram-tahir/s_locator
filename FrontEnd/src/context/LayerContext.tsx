import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
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

  function handleNextStep() {
    if (formStage === "initial") {
      setFormStage("secondStep");
    } else if (formStage === "secondStep") {
      setFormStage("thirdStep");
    }
  }

  function handleSaveMethodChange(method: string) {
    setSaveMethod(method);
  }

  function handleSave() {
    const saveData = {
      firstFormResponse,
      secondFormData,
      saveMethod,
    };

    console.log("Starting save process with the following data:", saveData);

    setLoading(true);
    resetFormStage();

    // Simulate an API call
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
        handleSaveMethodChange,
        handleSave,
        resetFormStage,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export function useLayerContext() {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error("useLayerContext must be used within a LayerProvider");
  }
  return context;
}
