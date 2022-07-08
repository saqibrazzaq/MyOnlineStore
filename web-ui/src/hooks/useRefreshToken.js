import React from "react";
import Api from "../Api/AuthApi";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log("in useRefresh()");
    console.log(auth);
    const response = await Api.post("User/refresh-token", {
      accessToken: auth.accessToken,
    });
    console.log("got response from useRefresh() " + response);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      console.log("Refresh token.");
      return {
        ...prev,
        accessToken: response.data.accessToken,
        // refreshToken: response.data.refreshToken,
        // roles: [response?.data?.role],
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
