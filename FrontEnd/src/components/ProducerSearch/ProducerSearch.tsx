// ProducerSearch.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProducerSearch.module.css';

const ProducerSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/fastapi', { query });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProducerSearch;
