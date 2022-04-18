import React, { useCallback, useEffect, useState } from "react";
import { ICourse, IGroup, IMaterial } from "../utils/types/types";
import { useParams } from "react-router-dom";
import MaterialService from "../utils/service/MaterialService";
import PageContainer from "../components/PageContainer/PageContainer";
import { Loader } from "../components";
import Material from "../forms/Material";
import SideNavbar from "../components/Navigation/SideNavbar";
import CourseService from "../utils/service/CourseService";
import GroupService from "../utils/service/GroupService";

const MaterialPage = () => {
  const [material, setMaterial] = useState<IMaterial>();
  const [course, setCourse] = useState<ICourse>();
  const [group, setGroup] = useState<IGroup>();
  const { id } = useParams();

  const fetchMaterial = useCallback(async () => {
    try {
      await MaterialService.fetchById(id).then(async (res) => {
        const courseResponse = await CourseService.getCourse(
          res.data.material.CourseId
        );

        const groupResponse = await GroupService.getGroup(
          res.data.material.GroupId
        );

        setCourse(courseResponse.data.course);
        setGroup(groupResponse.data.group);
        setMaterial(res.data.material);
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
      {material && group && course ? (
        <PageContainer>
          <Material group={group} course={course} material={material} />
        </PageContainer>
      ) : (
        <Loader isLoading={true} />
      )}
    </div>
  );
};

export default MaterialPage;
