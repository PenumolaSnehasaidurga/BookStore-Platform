import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");

  let parsedUser = undefined;

  // Try-catch block ensures that even if local storage has bad data, the app won't crash
  try {
    // if initialAuthUser exists AND is not the literal string "undefined"
    if (initialAuthUser && initialAuthUser !== "undefined") {
      parsedUser = JSON.parse(initialAuthUser);
    }
  } catch (error) {
    console.log("Failed to parse user from local storage:", error);
  }

  const [authUser, setAuthUser] = useState(parsedUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
