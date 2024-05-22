import React, { ReactNode, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import styles from './Layout.module.css';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import { FaHome, FaInfoCircle, FaPhone } from 'react-icons/fa';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <div className={styles.layout}>
       <ExpandableMenu isExpanded={isMenuExpanded} toggleMenu={toggleMenu}>
        <ul className={styles.menuList}>
          <li>
            <Link to="/">
              <FaHome className={styles.icon} />
              {isMenuExpanded && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle className={styles.icon} />
              {isMenuExpanded && <span>About</span>}
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FaPhone className={styles.icon} />
              {isMenuExpanded && <span>Contact</span>}
            </Link>
          </li>
        </ul>
      </ExpandableMenu>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {children}
      </div>
    </div>
  );
};

export default Layout;
