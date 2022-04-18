import React, { useCallback, useEffect, useState } from "react";
import { ICourse } from "../utils/types/types";
import CourseService from "../utils/service/CourseService";
import { Button, Header, Loader } from "../components";
import PageContainer from "../components/PageContainer/PageContainer";
import Card from "../components/Card/Card";
import Grid from "../components/GridLayout/GridLayout";
import { useNavigate } from "react-router-dom";
import { ButtonVariant } from "../components/Button/Button";
import SideNavbar from "../components/Navigation/SideNavbar";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/actions";
import { useTypeSelector } from "../utils/hooks/useTypeSelector";
import { STUDENT_ROLE, TEACHER_ROLE } from "../utils/app.slug";

const CoursesPage = () => {
  const history = useNavigate();

  const [courses, setCourses] = useState<Array<ICourse>>();
  const [loading, setLoading] = useState(
    useTypeSelector((state) => state.loader.loading)
  );
  const user = useTypeSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(showLoader());
      switch (user["role"]) {
        case TEACHER_ROLE:
          await CourseService.fetchCourses().then((response) => {
            setCourses(response.data.courses);
            dispatch(hideLoader());
          });
          break;
        case STUDENT_ROLE:
          await CourseService.fetchCourses().then((response) => {
            setCourses(response.data.courses);
            dispatch(hideLoader());
          });
          break;
        default:
          break;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const goTo = (id: number) => {
    history(`/course/${id}`);
  };

  const createCourse = () => {
    history("/create-course");
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      {!loading && courses !== undefined && courses.length > 0 ? (
        <PageContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Header>Курсы</Header>
            {user["role"] === TEACHER_ROLE ? (
              <Button onClick={createCourse} variant={ButtonVariant.primary}>
                Создать Курс
              </Button>
            ) : null}
          </div>
          <Grid
            items={courses.map((course, index) => {
              return (
                <Card
                  title={<Header>{course.course_name}</Header>}
                  body={course.author_name}
                  key={index}
                  onClick={() => goTo(course.id)}
                />
              );
            })}
          />
        </PageContainer>
      ) : (
        <>
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
                <Header>Курсы</Header>
                {user["role"] === TEACHER_ROLE ? (
                  <Button
                    onClick={createCourse}
                    variant={ButtonVariant.primary}
                  >
                    Создать Курс
                  </Button>
                ) : null}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                На данный момент курсов пока нет
              </div>
            </PageContainer>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;
