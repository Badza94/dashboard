import { useQuery } from "react-query";
import { AxiosClient } from "./api-client";

const getProjects = async () => {
  const response = await AxiosClient.get("/projects");
  return response.data;
};
const getGateways = async () => {
  const response = await AxiosClient.get("/gateways");
  return response.data;
};

type TData = {
  from: string;
  to: string;
  projectId: string;
  gatewayId: string;
};
const postReports = async (data: TData) => {
  const response = await AxiosClient.post("/report", data);
  return response.data;
};

export const useGetProjectsQuery = () =>
  useQuery(["projects"], () => getProjects());

export const useGetGatewaysQuery = () =>
  useQuery(["gateways"], () => getGateways());

export const usePostReportsQuery = (data: TData) =>
  useQuery(["report", data.from, data.to, data.projectId, data.gatewayId], () =>
    postReports(data)
  );
