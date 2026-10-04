import { request } from "./api";

export const getStudents = async () => {
  const response = await request("/students");
  return response;
}