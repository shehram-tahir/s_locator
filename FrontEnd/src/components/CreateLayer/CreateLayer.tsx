import React from "react";
import { useLayerContext } from "../../context/LayerContext";
import styles from "./CreateLayer.module.css";
import LayerDetailsForm from "../LayerDetailsForm/LayerDetailsForm";
import CustomizeLayer from "../CustomizeLayer/CustomizeLayer";
import SaveOptions from "../SaveOptions/SaveOptions";
import Loader from "../Loader/Loader";
import ErrorIconFeedback from "../ErrorIconFeedback/ErrorIconFeedback";
import SavedIconFeedback from "../SavedIconFeedback/SavedIconFeedback";

interface CreateLayerProps {
  closeModal: Function;
}

function CreateLayer(props: CreateLayerProps) {
  const { closeModal } = props;

  const {
    formStage,
    handleSaveMethodChange,
    handleSave,
    loading,
    isSaved,
    isError,
  } = useLayerContext();

  function renderContent() {
    if (loading) {
      return <Loader />;
    }

    if (isSaved) {
      return <SavedIconFeedback />;
    }

    if (isError) {
      return <ErrorIconFeedback />;
    }

    return renderFormContent();
  }

  function renderFormContent() {
    if (formStage === "initial" || formStage === "secondStep") {
      return (
        <>
          <h2 className={styles.title}>Create Layer</h2>
          <p>Provide some details to create a new layer.</p>
          {formStage === "initial" && <LayerDetailsForm />}
          {formStage === "secondStep" && (
            <CustomizeLayer closeModal={closeModal} />
          )}
        </>
      );
    }

    if (formStage === "thirdStep") {
      return (
        <SaveOptions
          handleSave={handleSave}
          handleSaveMethodChange={handleSaveMethodChange}
        />
      );
    }

    return null;
  }

  return <div className={styles.container}>{renderContent()}</div>;
}

export default CreateLayer;
