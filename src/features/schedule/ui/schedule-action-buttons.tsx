import { Button, Group } from "@mantine/core";

const ScheduleButtonsActions = ({ onClose }: { onClose: () => void }) => {
  return (
    <Group mt="md">
      <Button variant="default" onClick={onClose}>
        Отмена
      </Button>
      <Button type="submit">Запросить перенос</Button>
    </Group>
  );
};

export default ScheduleButtonsActions;
