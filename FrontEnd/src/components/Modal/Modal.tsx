import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { ModalProps } from "../../types/allTypesAndInterfaces";

function Modal(props: ModalProps) {
  const {
    show,
    onClose,
    children,
    darkBackground = false,
    isSmaller = false,
  } = props;

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.modalOverlay} ${
        darkBackground ? styles.darkBackground : ""
      }`}
    >
      <div
        className={`${styles.modalContent} ${
          isSmaller ? styles.smallerContainer : ""
        }`}
      >
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
