import { axiosPrivate } from "./axios";

export const getDisplayRequest = async (
  pageSize = 8,
  offset = 0,
  name='',
  type=''
) => {
  let url = `/display?pageSize=${pageSize}&offset=${offset}`;
  if (name) url = `${url}&name=${name}`;
  if (type) url = `${url}&type=${type}`;

  return await axiosPrivate.get(url);
};

export const getDisplayByRequest = async (id: number) =>
  axiosPrivate.get(`/display/${id}`);

export const createDisplayRequest = async (data: any) =>
  axiosPrivate.post("/display", data);

export const updateDisplayRequest = async (data: any, id: number) =>
  axiosPrivate.put(`/display/${id}`, data);

export const deleteDisplayRequest = async (id: number) =>
  axiosPrivate.delete(`/display/${id}`);
