import axios from "axios";

export default axios.create({
  baseURL: "/api/ecosystem",
  headers: {
    "Content-type": "application/json",
  },
});
