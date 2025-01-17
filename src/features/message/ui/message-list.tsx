import { Loader, ScrollArea, Dialog, Text } from "@mantine/core";
import If from "~/shared/lib/components/if";
import MessageItem from "~/features/message/ui/message-item";
import ScrollToEnd from "~/shared/lib/components/scroll-to-end";
import List from "~/shared/lib/components/list";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";
import { useMessageList } from "~/entities/chat/hooks/useMessageList";

const MessageList = ({
  messages,
  handleOnEnd,
  user,
  isLoading,
  newMessageReceived,
}: {
  messages: TMessageType[];
  handleOnEnd: () => Promise<void>;
  user?: TUser;
  isLoading: boolean;
  newMessageReceived: boolean;
}) => {
  const {
    ref,
    handleCloseDialog,
    handleScrollToBottom,
    handleScrollToTop,
    opened,
  } = useMessageList({
    handleOnEnd,
    messages,
    newMessageReceived,
  });

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
      <Dialog opened={opened} onClose={handleCloseDialog} withCloseButton>
        <Text>Новое сообщение</Text>
      </Dialog>
    </ScrollArea>
  );
};

export default MessageList;
