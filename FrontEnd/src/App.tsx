import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/VertiSideBar';
import { AppDataProvider } from './context/AppDataContext';

const App: React.FC = () => {
  return (
      <Router>
        <Layout />
      </Router>
  );
};

export default App;
