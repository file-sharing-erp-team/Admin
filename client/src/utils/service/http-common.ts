import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:7000/ecosystem",
    headers: {
        "Content-type": "application/json",
    },
});