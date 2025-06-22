import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { Review } from "../../types/hotel_types";

export function useFetchHotelReviews({ id }: { id: string }) {
  return useQuery({
    queryKey: ["hotel-reviews", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Review[]>(
          `/hotels/${id}/reviews`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
