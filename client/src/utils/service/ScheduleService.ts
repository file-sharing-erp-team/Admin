import http from "./http-common";
import { ICourse } from "../types/types";

const fetchSchedule = () => {
  return http.get<ICourse>("/schedule/get");
};

const ScheduleService = { fetchSchedule };

export default ScheduleService;
