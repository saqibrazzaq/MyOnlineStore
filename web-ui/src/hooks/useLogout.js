import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosAuth from "./useAxiosAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axios = useAxiosAuth();

  const logout = async () => {
    
    setAuth({});

    axios.post("/User/logout")
      .then((res) => {
        console.log("logout successful");
      })
      .catch((err) => console.log("Cannot logout successfully"));
  };

  return logout;
};

export default useLogout;
