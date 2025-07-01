import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";
import type { AddHotelFormValues } from "../../../types/inferdTypes"; // adjust this import to match your form values type

export const useEditHotel = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: AddHotelFormValues;
    }) => {
      const { data } = await axiosInstance.put(`/hotels/${id}`, formData);
      return data;
    },
  });
};
