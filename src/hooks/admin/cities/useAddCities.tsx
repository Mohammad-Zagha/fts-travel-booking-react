import { useMutation } from "@tanstack/react-query";
import type { AddCityFormValues } from "../../../types/inferdTypes";
import { axiosInstance } from "../../../lib/Axios";

export const useAddCity = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: AddCityFormValues }) => {
      const { data } = await axiosInstance.post("/cities", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
  });
};
