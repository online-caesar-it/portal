import { TMessageType } from "./../../../shared/types/chat-type";
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

  const debouncedHandleOnEnd = useCallback(
    debounce(async () => {
      if (isFetching) return;
      setIsFetching(true);
      await handleOnEnd();
      setIsFetching(false);

      if (ref.current) {
        ref.current.scrollTop += 50;
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
      if (scrollTop + clientHeight >= scrollHeight) {
        isScrollingToEnd.current = true;
      } else {
        isScrollingToEnd.current = false;
      }
    }
  }, [messages]);

  const handleScrollToTop = () => {
    debouncedHandleOnEnd();
  };

  const handleScrollToBottom = () => {
    isScrollingToEnd.current = true;
  };

  useEffect(() => {
    setOpened(true);
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
