import { Button, Group } from "@mantine/core";

const ScheduleButtonsActions = ({
  onClose,
  text,
}: {
  onClose: () => void;
  text: string;
}) => {
  return (
    <Group mt="md">
      <Button variant="default" onClick={onClose}>
        Отмена
      </Button>
      <Button type="submit">{text}</Button>
    </Group>
  );
};

export default ScheduleButtonsActions;
