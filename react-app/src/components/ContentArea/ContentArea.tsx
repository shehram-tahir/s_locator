import React from "react";
import styles from "./ContentArea.module.css";
import CatalogueCard from "../CatalogueCard/CatalogueCard";

const ContentArea: React.FC = () => {
  const handleMoreInfo = () => {
    alert("More information clicked!");
  };
  return (
    <div className={styles.content}>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CatalogueCard
          ribbonText="Free"
          imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
          title="Sample Data for Madina Masged Nabawy area"
          rows={1641}
          description="Focusing on all places of interests around Madina Masged Nabawy"
          onMoreInfo={handleMoreInfo}
        />
        <CatalogueCard
          ribbonText="Free"
          imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
          title="Sample Data for Madina Masged Nabawy area"
          rows={1641}
          description="Focusing on all places of interests around Madina Masged Nabawy"
          onMoreInfo={handleMoreInfo}
        />
        <CatalogueCard
          ribbonText="Free"
          imageSrc="https://catalog-assets.s3.ap-northeast-1.amazonaws.com/madina.jpg"
          title="Sample Data for Madina Masged Nabawy area"
          rows={1641}
          description="Focusing on all places of interests around Madina Masged Nabawy"
          onMoreInfo={handleMoreInfo}
        />
      </div>
    </div>
  );
};

export default ContentArea;
