import React, { useEffect, useState } from "react";
import {
  CourseGroup,
  ICourse,
  IGroup,
  IMaterial,
  ITask,
} from "../utils/types/types";
import styled from "@emotion/styled";
import { Button, Header, Input } from "../components";
import { ButtonSize, ButtonVariant } from "../components/Button/Button";
import Tabs from "../components/Tabs/Tabs";
import ActivityCard from "../components/ActiviryCard/ActivityCard";
import { ModalWindow } from "../components/ModalWindow/ModalWindow";
import { StyledDropdown } from "../components/Dropdown/dropdown.styles";
import CourseService from "../utils/service/CourseService";
import { toast } from "react-toastify";
import { STUDENT_ROLE, TEACHER_ROLE } from "../utils/app.slug";

export type CourseProps = {
  course?: ICourse;
  home?: Content;
  materials?: Content;
  role?: number;
  owner?: number | null;
  groups?: Array<IGroup>;
  courseGroups?: Array<CourseGroup>;
};

export type Content = {
  key: string;
  cardsMaterial?: Array<IMaterial>;
  cardsTasks?: Array<ITask>;
};

const StyledCourse = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Course: React.FC<CourseProps> = ({
  course,
  home,
  materials,
  role,
  owner,
  groups,
  courseGroups,
  children,
}) => {
  const [current, setCurrent] = useState(0);
  const [tabName, setTabName] = useState("Задания");
  const [content, setContent] = useState<Array<Content>>([]);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [groupNames, setGroupNames] = useState<Array<string>>([]);
  const [courseGroupNames, setCourseGroupNames] = useState<Array<string>>([""]);
  const [currentInformation, setCurrentInformation] = useState<Content>();
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [files, setFiles] = useState<Array<File>>();

  const addGroup = async () => {
    const id = groups?.filter((gr) => gr.group_name === group)[0];
    if (id !== undefined)
      await CourseService.addGroupToCourse(course?.id, id.id)
        .then((res) => {
          toast.success("Группа успешно добавлена", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
  };

  const addTaskOrMaterial = async () => {
    const id = groups?.filter((gr) => gr.group_name === group)[0];
    switch (type) {
      case "Задание":
        await CourseService.addTaskToCourse(
          id?.id,
          course?.id,
          name,
          description
        )
          .then((res) => {
            toast.success("Задание успешно добавленно", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        setAddModal(false);
        break;
      case "Материал":
        await CourseService.addMaterialToCourse(
          id?.id,
          course?.id,
          name,
          description
        )
          .then((res) => {
            toast.success("Материал успешно добавлен", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        setAddModal(false);
        break;
      default:
        break;
    }
  };

  const fileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const fileArray = (e.target as HTMLInputElement).files || [];
    setFiles(Array.from(fileArray));
  };

  useEffect(() => {
    const array = [];
    if (home) array.push(home);
    if (materials) array.push(materials);
    setContent(array);
  }, [home, materials]);

  useEffect(() => {
    const array: Array<string> = [];
    const courseG: Array<string> = [];
    if (groups)
      groups.map((item) => {
        array.push(item.group_name);
      });
    if (courseGroups && groups) {
      for (let i = 0; i < courseGroups.length; i++) {
        for (let j = 0; j < groups?.length; j++) {
          if (groups[j].id === courseGroups[i].GroupId)
            courseG.push(groups[j].group_name);
        }
      }
    }
    setGroupNames(array);
    setCourseGroupNames(courseG);
  }, [groups, courseGroups]);

  useEffect(() => {
    setCurrentInformation(content.filter((item) => item.key === tabName)[0]);
  }, [tabName]);

  return (
    <StyledCourse>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div>
            <Header>{course?.course_name}</Header>
          </div>
          <div>
            <span style={{ fontSize: "1.5rem" }}>
              Преподаватель: {course?.author_name}
            </span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "1rem" }}>
              {course?.course_description}
            </span>
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
            {role !== TEACHER_ROLE ? null : (
              <Button
                variant={ButtonVariant.text}
                size={ButtonSize.large}
                onClick={() => setShowModal(true)}
              >
                Добавить группу
              </Button>
            )}
            <br />
            <Button variant={ButtonVariant.primary} size={ButtonSize.large}>
              Подключиться
            </Button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginRight: "1rem",
          }}
        >
          {role !== TEACHER_ROLE ? null : (
            <Button
              variant={ButtonVariant.primary}
              size={ButtonSize.large}
              style={{ width: "14rem" }}
              onClick={() => setAddModal(true)}
            >
              Добавить
            </Button>
          )}
        </div>
        <Tabs
          current={current}
          onClick={setCurrent}
          setValue={setTabName}
          options={[
            { title: "Задания", value: "home" },
            { title: "Учебные материалы", value: "materials" },
          ]}
        />
      </div>
      <div
        style={{
          marginTop: "1.5rem",
          backgroundColor: "#BFCFFF",
          width: "50%",
          height: "55vh",
          display: "flex",
          overflow: "auto",
          padding: "1rem 1.5rem",
          flexDirection: "column",
        }}
      >
        {currentInformation &&
          currentInformation.cardsMaterial &&
          currentInformation.cardsMaterial.length > 0 &&
          currentInformation.cardsMaterial.map((item, index) => {
            return (
              <ActivityCard
                flag={"material"}
                key={index}
                id={item.id}
                title={item.material_name}
                description={item.material_description}
              />
            );
          })}
        {currentInformation &&
          currentInformation.cardsTasks &&
          currentInformation.cardsTasks.length > 0 &&
          currentInformation.cardsTasks.map((item, index) => {
            return (
              <ActivityCard
                key={index}
                flag={"task"}
                id={item.id}
                title={item.task_name}
                description={item.task_description}
              />
            );
          })}
      </div>
      <ModalWindow
        isShown={showModal}
        hide={() => setShowModal(!showModal)}
        modalContent={
          <div
            style={{
              width: "20rem",
              height: "15rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1rem 1rem",
            }}
          >
            <StyledDropdown
              options={groupNames}
              placeholder={"Найти группу"}
              onChange={(e) => setGroup(e.value)}
            />
            <Button variant={ButtonVariant.primary} onClick={addGroup}>
              Добавить
            </Button>
          </div>
        }
        headerText={"Добавить группу"}
      />

      <ModalWindow
        isShown={addModal}
        hide={() => setAddModal(!addModal)}
        modalContent={
          <div
            style={{
              width: "25rem",
              height: "35rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "1rem 1rem",
            }}
          >
            <StyledDropdown
              options={["Задание", "Материал"]}
              placeholder={"Что хотите добавить?"}
              onChange={(e) => setType(e.value)}
            />
            <StyledDropdown
              options={courseGroupNames}
              placeholder={"Найти группу"}
              onChange={(e) => setGroup(e.value)}
            />
            <Input
              placeholder={"Имя"}
              style={{ width: "20rem" }}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={"Описание"}
              style={{ width: "20rem" }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type={"file"}
              multiple={true}
              style={{ width: "20rem" }}
              onChange={(e) => fileUpload(e)}
            />
            {files && files?.length > 0
              ? files.map((file, index) => {
                  return <span key={index}>{file.name}</span>;
                })
              : null}
            <Button
              variant={ButtonVariant.primary}
              style={{ marginTop: "1rem" }}
              onClick={addTaskOrMaterial}
            >
              Добавить
            </Button>
          </div>
        }
        headerText={"Добавить задание или материал"}
      />
    </StyledCourse>
  );
};
