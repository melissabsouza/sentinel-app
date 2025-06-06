import { createContext } from "react";

type AuthContextType = {
  isSignedIn: boolean;
  userId: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);