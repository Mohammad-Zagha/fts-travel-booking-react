import { useMutation } from "@tanstack/react-query";
import type { AddHotelFormValues } from "../../../types/inferdTypes";
import { axiosInstance } from "../../../lib/Axios";

export const userAddHotel = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: AddHotelFormValues }) => {
      const { data } = await axiosInstance.post("/hotels", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
  });
};
