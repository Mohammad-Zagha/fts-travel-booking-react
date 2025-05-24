import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import type { FeaturedDeal } from "../../types";

export function useGetFeaturedDeals() {
  return useQuery({
    queryKey: [],
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
