import { api } from "./api";

export type SignUpByEmail = {
  email?: string;
  firstName?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
};
export type UserPromiseType = {
  accessToken: string;
  message: string;
  user: UserType;
};
export type UserType = {
  avatar: string;
  role: string;
  firstName: string;
  id: string;
  surname: string;
  patronymic: string;
  config: UserConfigType;
};
export type UserConfigType = {
  email: string;
  id: string;
  phone_number: string;
  refresh_token: string;
  userId: string;
};
const registerByEmail = async (data: SignUpByEmail) => {
  return await api.post("/auth/sign-up/by-email", data);
};
const registerByYandex = async () => {
  return await api.post("/auth/sign-up/by-yandex");
};
const registerByVk = async () => {
  return await api.post("/auth/sign-up/by-vk");
};
const verifySignUp = async (
  token: string | null
): Promise<{ data: UserPromiseType }> => {
  return await api.post("/auth/sign-up/verify", {
    token,
  });
};
const loginByEmail = async ({ email }: { email?: string }) => {
  return await api.post("/auth/sign-in/by-email", {
    email,
  });
};
const verifySignIn = async (
  token: string | null
): Promise<{ data: UserPromiseType }> => {
  return await api.post("/auth/sign-in/verify", {
    token,
  });
};
const refreshToken = async (
  refreshToken: string
): Promise<{
  data: {
    message: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}> => {
  return await api.post("/auth/refresh", {
    refreshToken,
  });
};
export const authApi = {
  registerByEmail,
  registerByYandex,
  registerByVk,
  verifySignUp,
  loginByEmail,
  verifySignIn,
  refreshToken,
};
