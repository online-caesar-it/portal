import { api } from "~/shared/api/api";
import { TMyLessonType } from "~/shared/types/lesson-type";

const getMyLessons = async (): Promise<TMyLessonType[]> => {
  const { data } = await api.get("/lesson/get-my-lessons");
  return data;
};

export const lessonApi = {
  getMyLessons,
};
