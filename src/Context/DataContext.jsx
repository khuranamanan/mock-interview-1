/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { categories, videos } from "../Data/data";
import { appReducer, initialState } from "../Reducer/appReducer";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch, categories, videos }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
