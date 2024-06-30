import React, { useState, MouseEvent } from "react";
import styles from "./ColorSelect.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLayerContext } from "../../context/LayerContext";

const ColorSelect: React.FC = function ColorSelect() {
  const { colorOptions, selectedColor, setSelectedColor } = useLayerContext();
  const [isOpen, setIsOpen] = useState(false);

  function handleOptionClick(option: string) {
    setSelectedColor(option);
    setIsOpen(false);
  }

  function toggleDropdown(event: MouseEvent) {
    setIsOpen(!isOpen);
  }

  function renderOptions() {
    return colorOptions.map(function (option) {
      return (
        <div
          key={option}
          className={styles.customSelectOption}
          onClick={function () {
            handleOptionClick(option);
          }}
        >
          <span className={styles.optionText}>{option}</span>
          <span
            className={styles.colorCircle}
            style={{ backgroundColor: option.toLowerCase() }}
          />
        </div>
      );
    });
  }

  return (
    <div className={styles.customSelectContainer}>
      <div className={styles.customSelectValue} onClick={toggleDropdown}>
        <span
          className={selectedColor ? styles.selectedText : styles.placeholder}
        >
          {selectedColor || "Select a color"}
        </span>
        <span
          className={styles.colorCircle}
          style={{ backgroundColor: selectedColor.toLowerCase() }}
        />
        <MdKeyboardArrowDown
          className={`${styles.arrowIcon} ${isOpen ? styles.open : ""}`}
        />
      </div>
      {isOpen && (
        <div className={styles.customSelectOptions}>{renderOptions()}</div>
      )}
    </div>
  );
};

export default ColorSelect;
