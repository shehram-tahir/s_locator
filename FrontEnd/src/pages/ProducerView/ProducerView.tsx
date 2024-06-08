// ProducerView.tsx
import React from 'react';
import Home from '../../pages/Home/Home';
import ProducerSearch from '../../components/ProducerSearch/ProducerSearch';
import styles from './ProducerView.module.css';

const ProducerView: React.FC = () => {
  return (
    <div className={styles.producerView}>
      <Home />
      <ProducerSearch />

    </div>
  );
};

export default ProducerView;
