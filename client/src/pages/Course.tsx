import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumbs, Loader } from "../components";
import PageContainer from "../components/PageContainer/PageContainer";
import CourseService from "../utils/service/CourseService";
import {
  CourseGroup,
  ICourse,
  IGroup,
  IMaterial,
  ITask,
} from "../utils/types/types";
import { Course as CourseForm } from "../forms/Course";
import { Content } from "../forms/Course";
import { useTypeSelector } from "../utils/hooks/useTypeSelector";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/Navigation/SideNavbar";
import { useAuth } from "../utils/hooks/useAuth";
import GroupService from "../utils/service/GroupService";
import { STUDENT_ROLE, TEACHER_ROLE } from "../utils/app.slug";
import TaskService from "../utils/service/TaskService";

const Course = () => {
  const [course, setCourse] = useState<ICourse>();
  const [materials, setMaterials] = useState<Array<IMaterial>>();
  const [tasks, setTasks] = useState<Array<ITask>>();
  const [homeTasks, setHomeTasks] = useState<Content>();
  const [courseMaterials, setCourseMaterials] = useState<Content>();
  const [groups, setGroups] = useState<Array<IGroup>>();
  const [courseGroup, setCourseGroups] = useState<Array<CourseGroup>>();
  const role = useTypeSelector((state) => state.user["role"]);
  const [reload, setReload] = useState("");
  const { id } = useParams();
  const { token } = useAuth();
  const userId = useTypeSelector((state) => state.user["id"]);

  const fetchData = useCallback(async () => {
    try {
      const response = await CourseService.getCourse(id);
      const groupResponse = await GroupService.fetchGroups();
      const materialResponse = await CourseService.getCourseMaterials(id, {
        Authorization: `Bearer ${token}`,
      });
      const tasksResponse = await CourseService.getCourseTasks(id, {
        Authorization: `Bearer ${token}`,
      });
      const courseGroupResponse = await CourseService.getCourseGroups(id);
      setCourseGroups(courseGroupResponse.data.courseGroups);
      setCourse(response.data.course);
      setTasks(tasksResponse.data.courseTasks);
      setMaterials(materialResponse.data.courseMaterials);
      setGroups(groupResponse.data.groups);
      if (tasks !== undefined) setHomeTasks({ key: "home", cardsTasks: tasks });
      else setReload("1");
      if (materials !== undefined)
        setCourseMaterials({ key: "materials", cardsMaterial: materials });
      else setReload("1");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [token, CourseService, reload]);

  const fetchStudentData = useCallback(async () => {
    try {
      const response = await CourseService.getCourse(id);
      const materialResponse = await CourseService.getCourseUserMaterials(
        id,
        userId
      );
      const tasksResponse = await TaskService.getTasks(id, userId);
      const array = [];
      const materialResponseArray: Array<IMaterial> = [];
      const tasksResponseArray: Array<ITask> = [];
      materialResponse.data.materials.map((material) => {
        materialResponseArray.push(material.material.material);
      });
      tasksResponse.data.tasks.map((task) => {
        tasksResponseArray.push(task.task.task);
      });
      setCourse(response.data.course);
      if (materialResponse.data.materials)
        setCourseMaterials({
          key: "materials",
          cardsMaterial: materialResponseArray,
        });

      if (tasksResponse.data.tasks)
        setHomeTasks({
          key: "home",
          cardsTasks: tasksResponseArray,
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [TaskService, userId, CourseService]);

  useEffect(() => {
    if (role !== undefined && role === TEACHER_ROLE) fetchData();
    if (role !== undefined && role === STUDENT_ROLE) fetchStudentData();
  }, [fetchData, fetchStudentData]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      {role === TEACHER_ROLE ? (
        <>
          {course !== undefined &&
          groups &&
          courseGroup &&
          homeTasks !== undefined &&
          courseMaterials !== undefined ? (
            <PageContainer>
              <Breadcrumbs
                values={[
                  { label: "Курсы", link: "/courses" },
                  { label: course.course_name, link: `/course/${course.id}` },
                ]}
              />
              <CourseForm
                owner={userId}
                course={course}
                home={homeTasks}
                groups={groups}
                courseGroups={courseGroup}
                materials={courseMaterials}
                role={role}
              />
            </PageContainer>
          ) : (
            <Loader isLoading={true} />
          )}
        </>
      ) : (
        <>
          {course !== undefined &&
          courseMaterials !== undefined &&
          homeTasks !== undefined ? (
            <PageContainer>
              <Breadcrumbs
                values={[
                  { label: "Курсы", link: "/courses" },
                  { label: course.course_name, link: `/course/${course.id}` },
                ]}
              />
              <CourseForm
                course={course}
                materials={courseMaterials}
                home={homeTasks}
                role={role}
              />
            </PageContainer>
          ) : (
            <Loader isLoading={true} />
          )}
        </>
      )}
    </div>
  );
};

export default Course;
