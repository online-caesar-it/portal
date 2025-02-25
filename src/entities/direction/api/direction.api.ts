import { api } from "~/shared/api/api";
import {
  TDirection,
  TDirectionAttachedUser,
} from "~/shared/types/direction-type";

const createDirection = async (body: Omit<TDirection, "id">) => {
  const { data } = await api.post("/direction/create", body);
  return data;
};
const getAllDirection = async (): Promise<TDirection[]> => {
  const { data } = await api.get("/direction/get-all");
  return data;
};
const getMyDirection = async (): Promise<TDirection[]> => {
  const { data } = await api.get("/direction/users/get-all");
  return data;
};
const attachUserToDirection = async (body: TDirectionAttachedUser) => {
  const { data } = await api.post("/direction/users/attach", body);
  return data;
};
export const directionApi = {
  createDirection,
  getAllDirection,
  getMyDirection,
  attachUserToDirection,
};
