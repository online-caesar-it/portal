const setAccessToken = (token: string) =>
  localStorage.setItem("access-token", token);

const getAccessToken = () => localStorage.getItem("access-token");

const deleteAccessToken = () => localStorage.removeItem("access-token");

const setRefreshToken = (token: string) =>
  localStorage.setItem("refresh-token", token);

const getRefreshToken = () => localStorage.getItem("refresh-token");

const deleteRefreshToken = () => localStorage.removeItem("refresh-token");

export const localStorageToken = {
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
  setRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
};
