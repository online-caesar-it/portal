import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { localStorageToken } from "~/shared/local-storage/token";

const SignOut = () => {
  const router = useNavigate();
  const signOut = () => {
    localStorageToken.deleteAccessToken();
    localStorageToken.deleteRefreshToken();
    router("/auth/sign-in");
  };
  return <Button onClick={signOut}>Выйти из системы</Button>;
};

export default SignOut;
