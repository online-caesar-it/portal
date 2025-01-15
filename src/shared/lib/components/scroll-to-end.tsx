import React, { type PropsWithChildren, useEffect, useRef } from "react";

type Props = PropsWithChildren<{
  onEnd?: () => void;
  onTop?: () => void;
}>;

const ScrollToEnd: React.FC<Props> = (props) => {
  const { onEnd, onTop, children } = props;

  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === endRef.current && entry.isIntersecting) {
          if (onEnd) onEnd();
        } else if (entry.target === topRef.current && entry.isIntersecting) {
          if (onTop) onTop();
        }
      });
    });

    if (endRef.current) observer.observe(endRef.current);
    if (topRef.current) observer.observe(topRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onEnd, onTop]);

  return (
    <>
      <div ref={topRef} />
      {children}
      <div ref={endRef} />
    </>
  );
};

export default ScrollToEnd;
