import axios from "axios";
export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://localhost:3010/api-gateway/current-user/",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: "http://localhost:3010/api-gateway/current-user/",
    });
  }
};
