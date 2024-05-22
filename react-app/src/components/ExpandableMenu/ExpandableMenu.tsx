import React from 'react';
import styles from './ExpandableMenu.module.css';

interface ExpandableMenuProps {
  isExpanded: boolean;
  toggleMenu: () => void;
  children?: React.ReactNode;
}

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({ isExpanded, toggleMenu, children }) => {
  return (
    <div className={`${styles.menu} ${isExpanded ? styles.expanded : ''}`}>
      <button onClick={toggleMenu} className={styles.toggleButton}>
        {isExpanded ? '<<' : '>>'}
      </button>
      
        <div className={styles.menuItems}>
          {children}
        </div>
      
    </div>
  );
};

export default ExpandableMenu;

