import React, { useCallback, useEffect, useState } from "react";
import { useTypeSelector } from "../utils/hooks/useTypeSelector";
import GroupService from "../utils/service/GroupService";
import SideNavbar from "../components/Navigation/SideNavbar";
import PageContainer from "../components/PageContainer/PageContainer";
import { Button, Header, Loader } from "../components";
import Input from "../components/Input/Input";
import { ButtonVariant } from "../components/Button/Button";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { StyledDropdown } from "../components/Dropdown/dropdown.styles";
import CourseService from "../utils/service/CourseService";
import { useAuth } from "../utils/hooks/useAuth";
import { IGroup } from "../utils/types/types";
import { toast } from "react-toastify";
import { TEACHER_ROLE } from "../utils/app.slug";

const CreateCoursePage = () => {
  const [groups, setGroups] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(
    useTypeSelector((state) => state.loader.loading)
  );
  const [allGroups, setAllGroups] = useState<Array<IGroup>>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useTypeSelector((state) => state.user);
  const { userId, token } = useAuth();
  const [courseName, setCourseName] = useState<string>();
  const [courseDescription, setCourseDescription] = useState<string>();
  const [selected, setSelected] = useState<string>("");

  const fetchGroups = useCallback(async () => {
    dispatch(showLoader());
    const response = await GroupService.fetchGroups();
    const array: Array<string> = [];
    response.data?.groups.map((item) => {
      array.push(item.group_name);
    });
    setAllGroups(response.data?.groups);
    setGroups(array);
    dispatch(hideLoader());
  }, []);

  const createCourse = async () => {
    const response = await CourseService.createCourse(
      {
        courseName: courseName,
        courseDescription: courseDescription,
        authorId: userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
      .then(async (resp) => {
        toast.success("Курс успешно создан!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const current = allGroups?.filter(
          (gr) => gr.group_name === selected
        )[0];
        if (current !== undefined && current !== null)
          await CourseService.addGroupToCourse(
            resp.data.createCourse.id,
            current?.id
          ).catch((err) => {
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

  useEffect(() => {
    if (user["role"] !== TEACHER_ROLE) {
      navigate("/courses");
    }
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      {loading ? (
        <Loader isLoading={true} />
      ) : (
        <PageContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Header>Создать курс</Header>
          </div>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              marginTop: "2rem",
            }}
          >
            <Input
              error={false}
              disabled={false}
              placeholder={"Название курса"}
              style={{ margin: "0.8em 0", width: "20rem" }}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <Input
              error={false}
              disabled={false}
              placeholder={"Описание курса"}
              style={{ margin: "0.8em 0", width: "20rem" }}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <StyledDropdown
              options={groups}
              placeholder={"Выбрать группу..."}
              onChange={(e) => setSelected(e.value)}
            />
            <Button
              variant={ButtonVariant.primary}
              onClick={() => createCourse()}
            >
              {" "}
              Создать{" "}
            </Button>
          </div>
        </PageContainer>
      )}
    </div>
  );
};

export default CreateCoursePage;
