import { debounce } from "lodash";
import { useRef, useState, useCallback, useEffect } from "react";
import { TMessageType } from "~/shared/types/chat-type";

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
  const initialMessagesLoaded = useRef(false);

  const debouncedHandleOnEnd = useCallback(
    debounce(async () => {
      if (isFetching || !ref.current) return;
      setIsFetching(true);

      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      const userAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      prevScrollHeight.current = scrollHeight;

      await handleOnEnd();
      setIsFetching(false);

      setTimeout(() => {
        if (!ref.current) return;
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const newScrollHeight = ref.current.scrollHeight;
          const heightDiff = newScrollHeight - prevScrollHeight.current;
          ref.current.scrollTop += heightDiff;

          if (userAtBottom) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        });
      }, 10);
    }, 300),
    [handleOnEnd, isFetching]
  );

  useEffect(() => {
    if (!ref.current) return;

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const { scrollHeight, clientHeight, scrollTop } = ref.current;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceFromBottom < 100) {
          ref.current.scrollTo({
            top: scrollHeight,
            behavior: "smooth",
          });
        }
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && !initialMessagesLoaded.current && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      initialMessagesLoaded.current = true;
    }
  }, [messages]);

  const handleUserScroll = () => {
    if (!ref.current) return;
    const { scrollHeight, clientHeight, scrollTop } = ref.current;
    isScrollingToEnd.current = scrollTop + clientHeight >= scrollHeight - 10;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", handleUserScroll);
    return () => el.removeEventListener("scroll", handleUserScroll);
  }, []);

  const handleScrollToTop = () => {
    requestAnimationFrame(() => {
      if (!isFetching) debouncedHandleOnEnd();
    });
  };

  const handleScrollToBottom = () => {
    requestAnimationFrame(() => {
      isScrollingToEnd.current = true;
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
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

  const handleCloseDialog = () => setOpened(false);

  useEffect(() => {
    return () => {
      if (isFetching) {
        debouncedHandleOnEnd.cancel();
      }
    };
  }, [isFetching, debouncedHandleOnEnd]);

  return {
    handleCloseDialog,
    handleScrollToTop,
    handleScrollToBottom,
    opened,
    ref,
  };
};
