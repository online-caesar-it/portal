import { Button } from "@mantine/core";
import React from "react";

const ButtonCreate = ({ toggle }: { toggle: () => void }) => {
  return (
    <Button onClick={toggle} variant="filled" color="blue">
      Добавить преподавателя
    </Button>
  );
};

export default ButtonCreate;
