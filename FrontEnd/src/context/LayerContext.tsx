import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  ReactNode,
} from "react";
import { HttpReq } from "../services/apiService";
import {
  City,
  FirstFormResponse,
  LayerContextType,
  RequestType,
} from "../types/allTypesAndInterfaces";

const LayerContext = createContext<LayerContextType | undefined>(undefined);

export function LayerProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [firstFormData, setFirstFormData] = useState({
    selectedCountry: "",
    selectedCity: "",
    selectedCategory: "",
  });

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
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [citiesData, setCitiesData] = useState<{ [country: string]: City[] }>(
    {}
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const [requests, setRequests] = useState<RequestType[]>([]);

  function processCountries(data: any): string[] {
    if (typeof data === "object" && data !== null) {
      const countryNames = Object.keys(data);
      setCitiesData(data); // Store cities data
      return countryNames;
    }
    return [];
  }

  useEffect(() => {
    const requestId = "country_city";
    HttpReq<string[]>(
      requestId,
      function (data) {
        setCountries(processCountries(data));
      },
      (msg) => {
        setMessage(msg);
        addRequest(requestId, msg, error);
      },
      (reqId) => {
        setId(reqId);
        addRequest(requestId, message, error);
      },
      (isLoading) => setLoading(isLoading),
      (err) => {
        setError(err);
        addRequest(requestId, message, err);
      }
    );

    const categoriesRequestId = "nearby_categories";
    HttpReq<string[]>(
      categoriesRequestId,
      function (data) {
        setCategories(data as string[]);
      },
      (msg) => {
        setMessage(msg);
        addRequest(categoriesRequestId, msg, error);
      },
      (reqId) => {
        setId(reqId);
        addRequest(categoriesRequestId, message, error);
      },
      (isLoading) => setLoading(isLoading),
      (err) => {
        setError(err);
        addRequest(categoriesRequestId, message, err);
      }
    );
  }, []);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFirstFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "selectedCountry") {
      const selectedCountryCities = citiesData[value] || [];
      setCities(selectedCountryCities);
      setFirstFormData((prevData) => ({
        ...prevData,
        selectedCity: "", // Reset selected city when country changes
      }));
    }
  }

  function handleSecondFormChange(
    event: ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) {
    const { name, value } = event.target;
    setSecondFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleColorChange(color: string) {
    setSecondFormData((prevData) => ({
      ...prevData,
      pointColor: color,
    }));
  }

  function handleNextStep() {
    if (formStage === "initial") {
      setFormStage("secondStep");
    } else if (formStage === "secondStep") {
      setFormStage("thirdStep");
    }
  }

  async function handleFirstFormApiCall(action: string) {
    const postData = {
      lat: 37.7937,
      lng: -122.3965,
      radius: 1000,
      type: "convenience_store",
    };
    const requestId = "http_single_nearby";
    HttpReq<FirstFormResponse>(
      requestId,
      (response) => {
        setFirstFormResponse(response);
      },
      (msg) => {
        setMessage(msg);
        addRequest(requestId, msg, error);
      },
      (reqId) => {
        setId(reqId);
        addRequest(requestId, message, error);
      },
      (isLoading) => setLoading(isLoading),
      (err) => {
        setError(err);
        addRequest(requestId, message, err);
      },
      "post",
      postData
    );

    handleNextStep();
  }

  function handleSaveMethodChange(method: string) {
    setSaveMethod(method);
  }




const handleSave = () => {
  const saveData = {
    firstFormResponse,
    secondFormData,
    saveMethod,
  };

  setFormStage("loading");
  setLoading(true);

  const isSuccess = true; 
  setLoading(false);
  if (isSuccess) {
    setIsSaved(true);
    setFormStage("saved");
  } else {
    setIsError(true);
    setFormStage("error");
  }
};


  function resetFormStage() {
    setFormStage("initial");
  }

  function addRequest(id: string, requestMessage: string, error: Error | null) {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests, { id, requestMessage, error }];
      return updatedRequests;
    });
  }

  return (
    <LayerContext.Provider
      value={{
        firstFormData,
        secondFormData,
        formStage,
        isSaved,
        isError,
        firstFormResponse,
        saveMethod,
        countries,
        cities,
        citiesData,
        categories,
        message,
        id,
        loading,
        error,
        requests,
        setFirstFormData,
        setSecondFormData,
        setFormStage,
        setIsSaved,
        setIsError,
        setFirstFormResponse,
        setSaveMethod,
        setCountries,
        setCities,
        setCitiesData,
        setCategories,
        setMessage,
        setId,
        setLoading,
        setError,
        addRequest,
        handleChange,
        handleSecondFormChange,
        handleColorChange,
        handleNextStep,
        handleFirstFormApiCall,
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
