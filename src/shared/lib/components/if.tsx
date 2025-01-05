import { ReactNode } from "react";

const If = ({
  children,
  elseComponent,
  when,
}: {
  children: ReactNode;
  elseComponent?: ReactNode;
  when?: unknown;
}) => {
  return when ? children : elseComponent;
};

export default If;
