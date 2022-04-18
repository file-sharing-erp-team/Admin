import http from "./http-common";
import {
  CourseById,
  CourseGroupMaterialsResponse,
  CourseGroupResponse,
  CourseMaterialsResponse,
  CourseResponse,
  CourseTasksResponse,
  CreateCourseResponse,
} from "../types/types";

const fetchCourses = () => {
  return http.get<CourseResponse>("/course/getAllCourses");
};

const fetchUserCourses = (userId: number) => {
  return http.get<CourseResponse>(`/course/getUserCourse/${userId}`);
};

const getCourse = (id: any | undefined) => {
  return http.get<CourseById>(`/course/getCourseById/${id}`);
};

const createCourse = (data: any, headers: any) => {
  return http.post<CreateCourseResponse>("/course/createCourse", data, {
    headers: headers,
  });
};

const getCourseMaterials = (id: any, headers: any) => {
  return http.get<CourseMaterialsResponse>(`/course/getCourseMaterials/${id}`, {
    headers: headers,
  });
};

const getCourseTasks = (id: any, headers: any) => {
  return http.get<CourseTasksResponse>(`/course/getCourseTasks/${id}`, {
    headers: headers,
  });
};

const getCourseGroups = (id: any) => {
  return http.get<CourseGroupResponse>(`/course/getCourseGroups/${id}`);
};

const addGroupToCourse = (id: any, groupId: any) => {
  return http.post("/course/addGroupToCourse", {
    courseId: id,
    groupId: groupId,
  });
};

const addMaterialToCourse = (
  groupId: any,
  courseId: any,
  materialName: string,
  materialDescription: string
) => {
  return http.post("/course/addMaterialToCourse", {
    courseId,
    materialName,
    materialDescription,
    groupId,
  });
};

const addTaskToCourse = (
  groupId: any,
  courseId: any,
  taskName: string,
  taskDescription: string
) => {
  return http.post("/course/addTaskToCourse", {
    courseId,
    taskName,
    taskDescription,
    groupId,
  });
};

const getCourseUserMaterials = (courseId: any, userId: any) => {
  return http.get<CourseGroupMaterialsResponse>(
    `/material/getAllMaterialsFromUsers?courseId=${courseId}&userId=${userId}`
  );
};

const CourseService = {
  fetchCourses,
  getCourse,
  createCourse,
  getCourseMaterials,
  getCourseTasks,
  addGroupToCourse,
  addMaterialToCourse,
  addTaskToCourse,
  getCourseGroups,
  fetchUserCourses,
  getCourseUserMaterials,
};

export default CourseService;
