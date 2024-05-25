import React from "react";
import styles from "./ExpandableMenu.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface ExpandableMenuProps {
  isExpanded: boolean;
  toggleMenu: () => void;
  children?: React.ReactNode;
}

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({
  isExpanded,
  toggleMenu,
  children,
}) => {
  return (
    <div className={`${styles.menu} ${isExpanded ? styles.expanded : ""}`}>
      <button onClick={toggleMenu} className={styles.toggleButton}>
        {isExpanded ? (
          <MdExpandLess className={styles.icon} />
        ) : (
          <MdExpandMore className={styles.icon} />
        )}
      </button>

      <div className={styles.menuItems}>{children}</div>
    </div>
  );
};

export default ExpandableMenu;
