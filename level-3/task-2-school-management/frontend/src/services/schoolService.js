import { request } from "./api";

export const getStudents = async () => {
  const response = await request("/students");
  return response;
}

export const createStudent = async (studentObj) => {
  const response = await request("/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentObj)
  });
  return response;
}