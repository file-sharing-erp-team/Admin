import React, { useCallback, useEffect, useState } from "react";
import { ICourse, IGroup, IMaterial, ITask } from "../utils/types/types";
import { useParams } from "react-router-dom";
import MaterialService from "../utils/service/MaterialService";
import PageContainer from "../components/PageContainer/PageContainer";
import { Loader } from "../components";
import Material from "../forms/Material";
import SideNavbar from "../components/Navigation/SideNavbar";
import CourseService from "../utils/service/CourseService";
import GroupService from "../utils/service/GroupService";
import TaskService from "../utils/service/TaskService";
import Task from "../forms/Task";

const TaskPage = () => {
  const [task, setTask] = useState<ITask>();
  const [course, setCourse] = useState<ICourse>();
  const [group, setGroup] = useState<IGroup>();
  const { id } = useParams();

  const fetchMaterial = useCallback(async () => {
    try {
      await TaskService.fetchTask(id).then(async (res) => {
        const courseResponse = await CourseService.getCourse(
          res.data.task.CourseId
        );

        const groupResponse = await GroupService.getGroup(
          res.data.task.GroupId
        );

        setCourse(courseResponse.data.course);
        setGroup(groupResponse.data.group);
        setTask(res.data.task);
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      {task && group && course ? (
        <PageContainer>
          <Task group={group} course={course} task={task} />
        </PageContainer>
      ) : (
        <Loader isLoading={true} />
      )}
    </div>
  );
};

export default TaskPage;
