import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { authApi } from "~/shared/api/auth.api";
import { localStorageToken } from "~/shared/local-storage/token";
import queryString from "query-string";
export const useConfirm = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useNavigate();
  const params = useLocation();
  const { token, method, type } = queryString.parse(params.search);
  useEffect(() => {
    if (token && method === "by-email") {
      verifyTokenSignIn();
    }
  }, [token, method, type]);
  const verifyTokenSignIn = async () => {
    try {
      const response = await authApi.verifySignIn(token as string | null);
      if (response.data) {
        setMessage("Вход завершен! Перенаправляем...");
        localStorageToken.setAccessToken(response.data.accessToken);
        localStorageToken.setRefreshToken(
          response.data.user.config.refresh_token
        );
      }
      router("/");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setMessage("Ошибка подтверждения. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, message };
};
