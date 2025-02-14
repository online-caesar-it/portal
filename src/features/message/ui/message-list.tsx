import { Loader, ScrollArea, Dialog, Text, Divider } from "@mantine/core";
// import If from "~/shared/lib/components/if";
import MessageItem from "~/features/message/ui/message-item";
import ScrollToEnd from "~/shared/lib/components/scroll-to-end";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";
import { useMessageList } from "~/entities/chat/hooks/useMessageList";
import moment from "moment";
import If from "~/shared/lib/components/if";

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
  const renderMessages = () => {
    let lastDate = "";

    return messages.map((it) => {
      const messageDate = moment(it.createdAt).format("D MMMM YYYY");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={it.id}>
          {showDate && (
            <Divider my="sm" label={messageDate} labelPosition="center" />
          )}
          <MessageItem user={user} item={it} />
        </div>
      );
    });
  };

  return (
    <ScrollArea viewportRef={ref}>
      <ScrollToEnd onTop={handleScrollToTop} onEnd={handleScrollToBottom}>
        <If when={!isLoading} elseComponent={<Loader />}>
          <If when={messages.length > 0} elseComponent={"Нет сообщений"}>
            {renderMessages()}
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
