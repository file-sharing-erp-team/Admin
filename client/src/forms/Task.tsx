import React from "react";
import { ICourse, IGroup, IMaterial, ITask } from "../utils/types/types";
import styled from "@emotion/styled";
import { Button, Header, Input } from "../components";
import { ButtonVariant } from "../components/Button/Button";
import { Link } from "react-router-dom";

export type MaterialProps = {
  task: ITask;
  group: IGroup;
  course: ICourse;
};

const StyledMaterial = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Task: React.FC<MaterialProps> = ({ task, course, group, children }) => {
  const { id, task_description, task_name, CourseId } = task;
  const { course_name, author_name } = course;
  const { group_name } = group;

  return (
    <StyledMaterial>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ marginLeft: "-.7rem" }}>
            <Header>{task_name}</Header>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
              Добавил: {author_name}
            </span>
            <span style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
              Связано с:{" "}
              <Link style={{ color: "blue" }} to={`/course/${CourseId}`}>
                {course_name}
              </Link>
              , {group_name}
            </span>
            <span style={{ fontSize: "1rem" }}>{task_description}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <br />
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "4rem",
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <Input
          placeholder={"Введите комментарий"}
          style={{ width: "40%", margin: "0" }}
          disabled={true}
        />
        <Button variant={ButtonVariant.primary} style={{ marginLeft: "1rem" }}>
          Отправить
        </Button>
      </div>
    </StyledMaterial>
  );
};

export default Task;
