import { TDirection } from "./direction-type";

export type TModule = {
  id: string;
  name: string;
  description: string;
};

export type TModuleResponse = {
  direction: TDirection;
  modules: TModule[];
};
