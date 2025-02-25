import { TDirection } from "~/shared/types/direction-type";
type TAdapterDirection = {
  label: string;
  value: string;
};
const adapterDirection = (direction: TDirection[]): TAdapterDirection[] => {
  return direction.map((it) => ({
    label: it.name,
    value: it.id,
  }));
};

export const directionAdapter = {
  adapterDirection,
};
