import { axiosPrivate } from "./axios";

export const getDisplayRequest = async (
  pageSize = 8,
  offset = 0,
  name?: string,
  type?: string
) => {
  let url = `/display?pageSize=${pageSize}&offset=${offset}`;
  if (name) url.concat(`&name=${name}`);
  if (type) url.concat(`&type=${type}`);

  return await axiosPrivate.get(url);
};

export const getDisplayByRequest  = async (id: number) =>
  axiosPrivate.get(`/display/${id}`);

export const createDisplayRequest  = async (data: any) =>
  axiosPrivate.post("/display", data);

export const updateDisplayRequest  = async (data: any, id: number) =>
  axiosPrivate.put(`/display/${id}`, data);

export const deleteDisplayRequest  = async (id: number) =>
  axiosPrivate.delete(`/display/${id}`);
