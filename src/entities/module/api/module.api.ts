import { api } from "~/shared/api/api";
import { TModule, TModuleResponse } from "~/shared/types/module-type";

const create = async (body: Omit<TModule, "id">) => {
  const { data } = await api.post("/module/create", body);
  return data;
};
const getModules = async (id: string): Promise<TModuleResponse> => {
  const { data } = await api.get(`/module/get-module?id=${id}`);
  return data;
};
export const moduleApi = {
  create,
  getModules,
};
