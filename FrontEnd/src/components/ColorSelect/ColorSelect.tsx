import React, { useState } from "react";
import styles from "./ColorSelect.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ColorSelectProps } from "../../types/allTypesAndInterfaces";

function ColorSelect(props: ColorSelectProps) {
  const { options, value, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Handle option click and pass the selected value to the parent component
  function handleOptionClick(option: string) {
    onChange(option);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  // Render the select options
  function renderOptions() {
    return options.map(function (option) {
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
        <span className={value ? styles.selectedText : styles.placeholder}>
          {value || "Select a color"}
        </span>
        <span
          className={styles.colorCircle}
          style={{ backgroundColor: value.toLowerCase() }}
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
}

export default ColorSelect;
