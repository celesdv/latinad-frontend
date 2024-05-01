import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${user?.token}`;

        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responceInterceptor = axiosPrivate.interceptors.response.use(
    //     responce => responce,
    //     async (error) => {
    //         const prevRequest = error?.config
    //         if(error?.responce?.status === 403 && !prevRequest?.sent) {
    //             prevRequest.sent = true
    //             const tkn = token
    //             prevRequest.headers['Authorization'] = `Bearer ${tkn}`
    //             return axiosPrivate(prevRequest)
    //         }

    //     }
    // )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);
  return axiosPrivate;
};

export default useAxiosPrivate;
