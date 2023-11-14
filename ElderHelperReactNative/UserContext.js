import React from "react";
import { createContext, useState } from "react";

const CurrentUser = createContext();

const UserContext = ({ children }) => {

  const [userId, setUserId] = useState({
      user_id: 5,
      first_name: "Chloe",
      surname: "White",
      phoneNumber: "00009012345",
      postcode: "M9 9II",
      is_elder: 'false',
      avatar_url: "https://images.unsplash.com/photo-1682687981674-0927add86f2b",
      profile_msg: "Offering my services for house-sitting.",
  });

  //import { CurrentUser } from "../UserContext";
  //const { userId } = useContext(CurrentUser);
  //to use the properties of the current user

  return (
    <CurrentUser.Provider value={{ userId, setUserId }}>
      {children}
    </CurrentUser.Provider>
  );
};

export { CurrentUser, UserContext };
