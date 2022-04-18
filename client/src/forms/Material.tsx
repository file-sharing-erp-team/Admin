import React from "react";
import { ICourse, IGroup, IMaterial } from "../utils/types/types";
import styled from "@emotion/styled";
import { Button, Header, Input } from "../components";
import { ButtonVariant } from "../components/Button/Button";
import { Link } from "react-router-dom";

export type MaterialProps = {
  material: IMaterial;
  group: IGroup;
  course: ICourse;
};

const StyledMaterial = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Material: React.FC<MaterialProps> = ({
  material,
  course,
  group,
  children,
}) => {
  const { id, material_description, material_name, CourseId } = material;
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
            <Header>{material_name}</Header>
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
            <span style={{ fontSize: "1rem" }}>{material_description}</span>
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

export default Material;
