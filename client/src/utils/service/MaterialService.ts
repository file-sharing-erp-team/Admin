import http from "./http-common";
import { MaterialResponse } from "../types/types";

const fetchById = (id: any) => {
  return http.get<MaterialResponse>(`/material/getMaterialById/${id}`);
};

const MaterialService = {
  fetchById,
};

export default MaterialService;
