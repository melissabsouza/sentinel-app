import {
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUserId(user.uid);
      } else {
        setIsSignedIn(false);
        setUserId(null);
      }
    });

    // Sempre bom limpar!
    return () => unsubscribe();
  }, []);

  const value = {
    isSignedIn,
    userId,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
