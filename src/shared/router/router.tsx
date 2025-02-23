import { ReactNode } from "react";
import AuthLayout from "~/app/layouts/auth-layout";
import MainLayout from "~/app/layouts/main-layout";
import ProtectedLayout from "~/app/layouts/protected-layout";
import AuthPage from "~/pages/auth.page";
import ChatsPage from "~/pages/chats.page";
import ConfirmPage from "~/pages/confirm.page";
import DirectionPage from "~/pages/directrion.page";
import MainPage from "~/pages/main.page";
import { TUserRoleType } from "../types/user-type";
import { RoleEnum } from "../enums/role-enum";
import ModulePage from "~/pages/module.page";
import LessonPage from "~/pages/lesson.page";
import EducatorPage from "~/pages/educator.page";
import CalendarPage from "~/pages/calendar.page";
import ProfilePage from "~/pages/profile.page";
import StudentsPage from "~/pages/students.page";

export type TRoute = {
  Element: JSX.Element;
  childrens?: TRoute[];
  path?: string;
  sidebar?: boolean;
  title?: string;
  icon?: ReactNode;
  visibleForRole?: TUserRoleType[];
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
          {
            Element: <CalendarPage />,
            path: "/calendar",
            sidebar: true,
            title: "Календарь",
          },
          {
            Element: <ProfilePage />,
            path: "/profile",
            sidebar: true,
            title: "Профиль",
          },
        ],
      },
    ],
  },
  {
    Element: <MainLayout />,
    sidebar: true,
    title: "Админ",
    path: "/admin",
    visibleForRole: [RoleEnum.ADMIN],
    childrens: [
      {
        Element: <DirectionPage />,
        path: "/admin/direction",
        title: "Направления",
        sidebar: true,
      },
      {
        Element: <ModulePage />,
        path: "/admin/module/:id",
        title: "Модули",
        sidebar: false,
      },
      {
        Element: <LessonPage />,
        path: "/admin/lesson/:id",
        title: "уроки",
        sidebar: false,
      },
      {
        Element: <EducatorPage />,
        path: "/admin/educators",
        title: "Преподаватели",
        sidebar: true,
      },
      {
        Element: <StudentsPage />,
        path: "/admin/students",
        title: "Студенты",
        sidebar: true,
      },
    ],
  },
  {
    Element: <AuthLayout />,
    path: "/auth",
    childrens: [
      {
        Element: <AuthPage />,
        path: "sign-in",
      },
      {
        Element: <ConfirmPage />,
        path: "confirm",
      },
    ],
  },
];
