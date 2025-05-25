import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { FeaturedDeal } from "../../types";

export function useFetchFeaturedDeals() {
  return useQuery({
    queryKey: ["featured-deals"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<FeaturedDeal[]>(
          `/home/featured-deals`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    placeholderData: keepPreviousData,
  });
}
