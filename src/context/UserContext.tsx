import { useContext, createContext, useState, useCallback } from "react";

const UserContext = createContext({});

const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: any) => {
  const [domains, setDomains] = useState([]);

  const retrieveDomains = useCallback(async () => {}, [setDomains]);
};
