import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";
import type { AddRoomFormValues } from "../../../types/inferdTypes"; // adjust if your type path differs

export const useEditRoom = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: AddRoomFormValues;
    }) => {
      const { data } = await axiosInstance.put(`/rooms/${id}`, formData);
      return data;
    },
  });
};
