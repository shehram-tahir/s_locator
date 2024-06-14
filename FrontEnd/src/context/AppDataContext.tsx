import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppDataContextType {
  appData: Record<string, any>;
  setData: (key: string, data: any) => void;
}

const AppDataContext = createContext<AppDataContextType>({
  appData: {},
  setData: () => { },
});

interface AppDataProviderProps {
  children: ReactNode;
}
export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<Record<string, any>>({});

  const setData = (key: string, data: any) => {
    setAppData((prevData) => ({ ...prevData, [key]: data }));
  };

  return (
    <AppDataContext.Provider value={{ appData, setData }}>
      {children}
    </AppDataContext.Provider>
  );
};


// Custom hook to use the context data
export const useAppDataContext = () => useContext(AppDataContext);

// Custom hook to get specific data by key
export const useData = (key: string) => {
  const { appData } = useAppDataContext();
  return appData[key];
};

// Custom hook to set specific data by key
export const useSetData = (key: string) => {
  const { setData } = useAppDataContext();
  return (data: any) => setData(key, data);
};
