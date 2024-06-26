import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { ModalProps } from "../../types/allTypesAndInterfaces";

function Modal(props: ModalProps) {
  const {
    show,
    onClose,
    children,
    modalClass = "",
    homePageModal = false,
  } = props;

  if (!show) {
    return null;
  }

  let combinedClassNames = `${styles.modalContent}`;

  if (modalClass === "smallerContainer") {
    combinedClassNames += ` ${styles.smallerContainer}`;
  } else if (modalClass === "smallerContainerv2") {
    combinedClassNames += ` ${styles.smallerContainerv2}`;
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.modalOverlay} ${
        homePageModal ? styles.modalOverlayFirstLoad : ""
      }`}
    >
      <div className={combinedClassNames}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
