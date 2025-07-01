import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";

export const useDeleteHotel = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/hotels/${id}`);
      return data;
    },
  });
};
