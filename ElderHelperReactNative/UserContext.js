import React from "react";
import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("jone");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };