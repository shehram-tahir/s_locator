import { useLayerContext } from "../../context/LayerContext";
import styles from "./CreateLayer.module.css";
import LayerDetailsForm from "../LayerDetailsForm/LayerDetailsForm";
import CustomizeLayer from "../CustomizeLayer/CustomizeLayer";
import SaveOptions from "../SaveOptions/SaveOptions";
import Loader from "../Loader/Loader";
import { MdCheckCircleOutline, MdOutlineErrorOutline } from "react-icons/md";

function CreateLayer(props: { closeModal: () => void }) {
  const { closeModal } = props;

  const {
    firstFormData,
    secondFormData,
    formStage,
    loading,
    isSaved,
    isError,
    countries,
    cities,
    categories,
    handleChange,
    handleSecondFormChange,
    handleColorChange,
    handleNextStep,
    handleFirstFormApiCall,
    handleSaveMethodChange,
    handleSave,
  } = useLayerContext();

  return (
    <div className={styles.container}>
      {(formStage === "initial" || formStage === "secondStep") && (
        <>
          <h2 className={styles.title}>Create Layer</h2>
          <p>Provide some details to create a new layer.</p>
        </>
      )}

      {formStage === "initial" && (
        <LayerDetailsForm
          countries={countries}
          cities={cities.map((city) => city.name)}
          categories={categories}
          selectedCountry={firstFormData.selectedCountry}
          selectedCity={firstFormData.selectedCity}
          selectedCategory={firstFormData.selectedCategory}
          handleCountryChange={handleChange}
          handleCityChange={handleChange}
          handleCategoryChange={handleChange}
          handleNextStep={handleNextStep}
          handleFirstFormApiCall={handleFirstFormApiCall}
          loading={loading}
        />
      )}
      {formStage === "secondStep" && (
        <CustomizeLayer
          pointColor={secondFormData.pointColor}
          legend={secondFormData.legend}
          description={secondFormData.description}
          name={secondFormData.name}
          handleColorChange={handleColorChange}
          handleLegendChange={handleSecondFormChange}
          handleDescriptionChange={handleSecondFormChange}
          handleNameChange={handleSecondFormChange}
          handleNextStep={handleNextStep}
          closeModal={closeModal}
        />
      )}
      {formStage === "thirdStep" && (
        <SaveOptions
          formStage={formStage}
          handleSave={handleSave}
          handleSaveMethodChange={handleSaveMethodChange}
        />
      )}
      {formStage === "loading" && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      {formStage === "saved" && (
        <div className={styles.successMessage}>
          <MdCheckCircleOutline className={styles.successIcon} />
          <p>Saved successfully!</p>
        </div>
      )}
      {formStage === "error" && (
        <div className={styles.errorMessage}>
          <MdOutlineErrorOutline className={styles.errorIcon} />
          <p>Failed to save. Please try again later.</p>
        </div>
      )}
    </div>
  );
}

export default CreateLayer;
