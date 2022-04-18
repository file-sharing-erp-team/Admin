export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  isActivated: string;
  role: string;
  phone: string;
}
export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserData {
  tokens: IToken;
  user: IUser;
}

export interface IUserConfig {
  token: string;
  userId: number;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IParticipants {
  first_name: string;
  id: number;
}

export interface ICourse {
  course_author: number;
  course_name: string;
  id: number;
  course_description: string;
  author_name: string;
}

export interface IGroup {
  id: number;
  group_name: string;
  group_type: number;
}

export interface IMaterial {
  id: number;
  material_name: string;
  material_description: string;
  CourseId: number;
  GroupId: number;
}

export interface ITask {
  id: number;
  task_name: string;
  task_description: string;
  CourseId: number;
  GroupId: number;
}

export interface CourseUserTasks {
  id: number;
  task_name: string;
  task_description: string;
  CourseId: number;
  GroupId: number;
  task: {
    task: ITask;
  };
}

export interface GroupResponse {
  groups: Array<IGroup>;
}

export interface CourseResponse {
  courses: Array<ICourse>;
}

export interface CourseById {
  course: ICourse;
}

export interface TaskResponse {
  task: ITask;
}

export interface CourseMaterialsResponse {
  courseMaterials: Array<IMaterial>;
}

export interface CourseUserMaterials {
  CourseId: number;
  GroupId: number;
  MaterialId: number;
  ModuleId: null | undefined;
  UserId: number;
  id: number;
  material: {
    material: IMaterial;
  };
}

export interface CourseGroupMaterialsResponse {
  materials: Array<CourseUserMaterials>;
}

export interface CourseGroupTasksResponse {
  tasks: Array<ITask>;
}

export interface CourseUserTasksResponse {
  tasks: Array<CourseUserTasks>;
}

export interface CourseTasksResponse {
  courseTasks: Array<ITask>;
}

export interface CreateCourseResponse {
  createCourse: ICourse;
}

export interface CourseGroupResponse {
  courseGroups: Array<CourseGroup>;
}

export interface CourseGroup {
  CourseId: number;
  GroupId: number;
  id: number;
}

export interface MaterialResponse {
  material: IMaterial;
}

export interface GetGroupResponse {
  group: IGroup;
}
