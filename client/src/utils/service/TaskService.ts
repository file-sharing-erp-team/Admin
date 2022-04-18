import http from "./http-common";
import {
  CourseGroupTasksResponse,
  CourseUserTasksResponse,
  ITask,
  TaskResponse,
} from "../types/types";

const getTasks = (courseId: any, userId: any) => {
  return http.get<CourseUserTasksResponse>(
    `/task/getAllTasksFromUsers?courseId=${courseId}&userId=${userId}`
  );
};

const fetchTask = (id: any) => {
  return http.get<TaskResponse>(`/task/getTaskById/${id}`);
};

const TaskService = { getTasks, fetchTask };

export default TaskService;
