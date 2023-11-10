import React from "react";
import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState({
    first_name: "Chloe",
    phoneNumber: "00009012345",
    user_id: 4,
    postcode: 'M9 9II'
  });
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };