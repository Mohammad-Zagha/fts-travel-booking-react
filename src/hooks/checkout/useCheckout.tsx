import { useMutation } from "@tanstack/react-query";
import type { CheckoutFormValues } from "../../types/inferdTypes";
import { axiosInstance } from "../../lib/Axios";

export const useCheckout = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: CheckoutFormValues }) => {
      const { data } = await axiosInstance.post(
        "/bookings",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
  });
};
