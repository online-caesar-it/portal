import { TMessageType } from "~/shared/types/chat-type";
import { debounce } from "lodash";
import { useRef, useState, useCallback, useEffect } from "react";

export const useMessageList = ({
  handleOnEnd,
  messages,
  newMessageReceived,
}: {
  handleOnEnd: () => Promise<void>;
  messages: TMessageType[];
  newMessageReceived: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isScrollingToEnd = useRef(true);
  const [isFetching, setIsFetching] = useState(false);
  const [opened, setOpened] = useState(false);
  const firstRender = useRef(true);
  const prevScrollHeight = useRef(0);

  const debouncedHandleOnEnd = useCallback(
    debounce(async () => {
      if (isFetching || !ref.current) return;
      setIsFetching(true);

      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      prevScrollHeight.current = scrollHeight; // Запоминаем высоту до загрузки

      await handleOnEnd();
      setIsFetching(false);

      if (ref.current) {
        const newScrollHeight = ref.current.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight.current;

        // Если пользователь был вверху перед загрузкой
        if (scrollTop === 0) {
          ref.current.scrollTo({
            top: heightDiff, // Смещаем вниз ровно на количество загруженных пикселей
            behavior: "auto",
          });
        }
        // Если пользователь был внизу перед загрузкой
        else if (distanceFromBottom < 50) {
          ref.current.scrollTo({
            top: newScrollHeight - clientHeight,
            behavior: "auto",
          });
        }
      }
    }, 300),
    [handleOnEnd, isFetching]
  );

  useEffect(() => {
    if (isScrollingToEnd.current && ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      ref.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight, scrollTop } = ref.current;
      isScrollingToEnd.current = scrollTop + clientHeight >= scrollHeight;
    }
  }, [messages]);

  const handleScrollToTop = () => {
    if (!isFetching) debouncedHandleOnEnd();
  };

  const handleScrollToBottom = () => {
    isScrollingToEnd.current = true;
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (newMessageReceived) {
      setOpened(true);
    }
  }, [newMessageReceived]);

  const handleCloseDialog = () => {
    setOpened(false);
  };

  useEffect(() => {
    return () => {
      debouncedHandleOnEnd.cancel();
    };
  }, [debouncedHandleOnEnd]);

  return {
    handleCloseDialog,
    handleScrollToTop,
    handleScrollToBottom,
    opened,
    ref,
  };
};
