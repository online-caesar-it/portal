import { useQuery } from "@tanstack/react-query";
import { lessonApi } from "../api/lesson.api";

const useGetMyLessons = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-my-lesson"],
    queryFn: lessonApi.getMyLessons,
  });
  return {
    data,
    isLoading,
  };
};

export const queryLesson = {
  useGetMyLessons,
};
