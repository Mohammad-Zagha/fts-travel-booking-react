import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/Axios";
import type { AddCityFormValues } from "../../../types/inferdTypes";

export const useEditCity = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: AddCityFormValues;
    }) => {
      const { data } = await axiosInstance.put(`/cities/${id}`, formData);
      return data;
    },
  });
};
