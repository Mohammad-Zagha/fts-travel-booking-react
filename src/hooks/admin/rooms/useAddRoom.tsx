import { useMutation } from "@tanstack/react-query";
import type { AddRoomFormValues } from "../../../types/inferdTypes";
import { axiosInstance } from "../../../lib/Axios";

export const useAddRoom = () => {
  return useMutation({
    mutationFn: async (formData: AddRoomFormValues) => {
      const { data } = await axiosInstance.post(`/rooms`, formData);
      return data;
    },
  });
};
