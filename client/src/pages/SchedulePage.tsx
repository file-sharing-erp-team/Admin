import React, { useEffect, useState, useCallback } from "react";
import { ICourse } from "../utils/types/types";
import { Loader, Navbar } from "../components";
import PageContainer from "../components/PageContainer/PageContainer";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ScheduleService from "../utils/service/ScheduleService";
import SideNavbar from "../components/Navigation/SideNavbar";

const SchedulePage = () => {
  const [schedule, setSchedule] = useState<ICourse>();

  const fetchData = useCallback(async () => {
    try {
      const response = await ScheduleService.fetchSchedule();
      setSchedule(response.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <SideNavbar />
      {schedule !== undefined ? (
        <PageContainer>
          <Breadcrumbs
            values={[
              { label: "Home", link: "/" },
              { label: "Login", link: "/login" },
            ]}
          />
        </PageContainer>
      ) : (
        <Loader isLoading={true} />
      )}
    </div>
  );
};

export default SchedulePage;
