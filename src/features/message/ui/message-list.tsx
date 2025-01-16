import { useEffect, useRef } from "react";
import { Loader, ScrollArea } from "@mantine/core";
import If from "~/shared/lib/components/if";
import MessageItem from "~/features/message/ui/message-item";
import ScrollToEnd from "~/shared/lib/components/scroll-to-end";
import List from "~/shared/lib/components/list";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";

const MessageList = ({
  messages,
  handleOnEnd,
  user,
  isLoading,
}: {
  messages: TMessageType[];
  handleOnEnd: () => void;
  user?: TUser;
  isLoading: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isScrollingToEnd = useRef(true);
  useEffect(() => {
    if (isScrollingToEnd.current && ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      ref.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      ref.current.scrollTop = scrollHeight - clientHeight;
    }
  }, []);

  const handleScrollToTop = () => {
    isScrollingToEnd.current = false;
    handleOnEnd();
  };

  const handleScrollToBottom = () => {
    isScrollingToEnd.current = true;
  };

  return (
    <ScrollArea
      viewportRef={ref}
      style={{
        flexGrow: 1,
        overflowY: "auto",
        maxHeight: "100%",
      }}
    >
      <ScrollToEnd onTop={handleScrollToTop} onEnd={handleScrollToBottom}>
        <If when={!isLoading} elseComponent={<Loader />}>
          <If when={messages.length > 0} elseComponent={"нет сообщений"}>
            <List list={messages}>
              {(it) => <MessageItem user={user} item={it} key={it.id} />}
            </List>
          </If>
        </If>
      </ScrollToEnd>
    </ScrollArea>
  );
};

export default MessageList;
