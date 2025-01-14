import { useNavigate } from "react-router";
import { localStorageToken } from "./../local-storage/token";
import { useEffect } from "react";

export const useCheckedAuth = () => {
  const accessToken = localStorageToken.getAccessToken();
  const refreshToken = localStorageToken.getRefreshToken();
  const router = useNavigate();
  useEffect(() => {
    if (!accessToken || !refreshToken) router("/auth/sign-in");
  }, []);
};
