import { useEffect, useMemo, useState } from "react";
import { useFormChat } from "~/entities/chat/hooks/useFormChat";
import { useQueryMyChats } from "~/entities/chat/hooks/useQueryMyChats";
import { ChatType } from "~/shared/enums/chat-enum";
import { useSession } from "~/shared/hooks/useSession";
import { TUser } from "~/shared/types/user-type";

export const useChatByEducator = (
  onSuccess: () => void,
  students?: TUser[]
) => {
  const { chats } = useQueryMyChats();
  const { form, submit } = useFormChat(onSuccess);
  const { session } = useSession();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const filteredStudents = useMemo(() => students || [], [students]);
  const studentsWithChats = useMemo(() => {
    if (!chats?.data || !filteredStudents) return [];
    return chats.data
      .filter((chat) => chat.type === ChatType.INDIVIDUAL)
      .flatMap((chat) => chat.interlocutors.map((it) => it.id));
  }, [chats?.data, filteredStudents]);

  const availableStudents = useMemo(() => {
    return filteredStudents?.filter(
      (student) => !studentsWithChats.includes(student.id)
    );
  }, [filteredStudents, studentsWithChats]);

  const isCreateDisabled = availableStudents?.length === 0;

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    form.setFieldValue("userIds", [session?.data.id as never, id as never]);
  };

  useEffect(() => {
    form.setFieldValue("type", ChatType.INDIVIDUAL);
  }, []);
  return {
    selectedStudentId,
    submit,
    isCreateDisabled,
    handleSelectStudent,
    studentsWithChats,
    filteredStudents,
  };
};
