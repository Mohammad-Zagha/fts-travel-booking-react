import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/rooms/${id}`);
      return data;
    },
  });
};
