import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";

export const useDeleteCity = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/cities/${id}`);
      return data;
    },
  });
};
