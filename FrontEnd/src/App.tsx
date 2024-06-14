import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { AppDataProvider } from './context/AppDataContext';

const App: React.FC = () => {
  return (
    <AppDataProvider>
      <Router>
        <Layout />
      </Router>
    </AppDataProvider>
  );
};

export default App;
