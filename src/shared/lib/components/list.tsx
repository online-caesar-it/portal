import { Fragment, ReactNode } from "react";

type TListRenderProps<T> = {
  list: T[];
  children: (item: T, index: number) => ReactNode;
};

const List = <T,>({ list, children }: TListRenderProps<T>) => {
  return (
    <>
      {list.map((item, i) => (
        <Fragment key={i}>{children(item, i)}</Fragment>
      ))}
    </>
  );
};

export default List;
