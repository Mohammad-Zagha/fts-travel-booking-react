import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { Amenity } from "../../types/hotel_types";

export function useFetchAmenities() {
  return useQuery({
    queryKey: ["amenities"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<Amenity[]>(
          `/search-results/amenities`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}
