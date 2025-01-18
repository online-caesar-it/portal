import { api } from "~/shared/api/api";
import { TModule } from "~/shared/types/module-type";

const create = async (body: Omit<TModule, "id">) => {
  const { data } = await api.post("/module/create", body);
  return data;
};

export const moduleApi = {
  create,
};
