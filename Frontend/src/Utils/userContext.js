import { createContext, useContext } from "react";
export const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};