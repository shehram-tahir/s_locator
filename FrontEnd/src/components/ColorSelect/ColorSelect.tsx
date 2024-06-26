import React, { useState } from "react";
import styles from "./ColorSelect.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ColorSelectProps } from "../../types/allTypesAndInterfaces";

function ColorSelect(props: ColorSelectProps) {
  const { options, value, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  function handleOptionClick(option: string) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.customSelectContainer}>
      <div
        className={styles.customSelectValue}
        onClick={() => setIsOpen(!isOpen)}
      >
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
        <div className={styles.customSelectOptions}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.customSelectOption}
              onClick={() => handleOptionClick(option)}
            >
              <span className={styles.optionText}>{option}</span>
              <span
                className={styles.colorCircle}
                style={{ backgroundColor: option.toLowerCase() }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorSelect;
