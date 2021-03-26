import { useEffect, useState } from "react";

export const getUserData = () => JSON.parse(localStorage.getItem("user"));

export const useAuthenActions = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    const userData = getUserData();

    if (userData) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, []);
  return [isSignIn, setIsSignIn];
};
