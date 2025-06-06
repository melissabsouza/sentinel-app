import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("O useAuth deve estar dentro de um AuthProvider");
  }

  return context;
};