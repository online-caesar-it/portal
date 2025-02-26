import { Flex, Text } from "@mantine/core";
import { TLessonType } from "~/shared/types/lesson-type";

const LessonItem = ({ lesson }: { lesson?: TLessonType }) => {
  return (
    <Flex direction={"column"} gap={"sm"}>
      <Text size="lg">Урок:</Text>
      <Text size="md" color="blue">
        {lesson?.name}
      </Text>
      <Text size="sm">{lesson?.description}</Text>
    </Flex>
  );
};

export default LessonItem;
