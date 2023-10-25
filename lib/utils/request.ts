import axios from "axios";

interface IResponse {
  url: string;
  method?: string;
  body?: any;
}

export const request = async ({ url, method = "GET", body }: IResponse) => {
  axios.defaults.baseURL = "https://technical-task-api.icapgroupgmbh.com/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const fetchData = () => {
    if (method === "GET") return axios.get(url, { params: body });
    else return axios({ url, method, data: body });
  };
  return fetchData();
};
