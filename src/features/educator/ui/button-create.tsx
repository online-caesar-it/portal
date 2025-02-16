import { Button } from "@mantine/core";

const ButtonCreate = ({ toggle }: { toggle: () => void }) => {
  return (
    <Button onClick={toggle} variant="filled" color="blue">
      Добавить преподавателя
    </Button>
  );
};

export default ButtonCreate;
