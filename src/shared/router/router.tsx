import { ReactNode } from "react";
import AuthLayout from "~/app/layouts/auth-layout";
import MainLayout from "~/app/layouts/main-layout";
import ProtectedLayout from "~/app/layouts/protected-layout";
import AuthPage from "~/pages/auth.page";
import ChatsPage from "~/pages/chats.page";
import MainPage from "~/pages/main.page";

export type TRoute = {
  Element: JSX.Element;
  childrens?: TRoute[];
  path?: string;
  sidebar?: boolean;
  title?: string;
  icon?: ReactNode;
};

export const routes: TRoute[] = [
  {
    Element: <ProtectedLayout />,
    childrens: [
      {
        Element: <MainLayout />,
        childrens: [
          {
            Element: <MainPage />,
            path: "/",
            sidebar: true,
            title: "Главная",
          },
          {
            Element: <ChatsPage />,
            path: "/chats",
            sidebar: true,
            title: "Общение",
          },
        ],
      },
    ],
  },
  {
    Element: <AuthLayout />,
    path: "auth",
    childrens: [
      {
        Element: <AuthPage />,
        path: "sign-in",
      },
    ],
  },
];
