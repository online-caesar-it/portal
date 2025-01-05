import { createTheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const Mantine = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default Mantine;
