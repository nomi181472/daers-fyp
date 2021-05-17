import axios from "axios";
export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "https://daers.dev/api/user/current-user/",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: "https://daers.dev/api/user/current-user/",
    });
  }
};
