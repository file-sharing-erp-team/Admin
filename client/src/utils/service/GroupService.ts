import http from "./http-common";
import { GetGroupResponse, GroupResponse } from "../types/types";

const fetchGroups = () => {
  return http.get<GroupResponse>("/group/getAllGroups");
};

const getGroup = (id: any) => {
  return http.get<GetGroupResponse>(`/group/getGroupById/${id}`);
};

const GroupService = { fetchGroups, getGroup };

export default GroupService;
