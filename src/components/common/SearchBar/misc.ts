import type { SearchFormValues } from "../../../types/inferdTypes";
import { formatDate } from "../../../lib/utils";

export const buildSearchParams = (values: SearchFormValues) => {
  const params = new URLSearchParams({
    search: values.search ?? "",
    from: formatDate(values.from, "YYYY-MM-DD"),
    to: formatDate(values.to, "YYYY-MM-DD"),
    adults: values.adults.toString(),
    children: values.children.toString(),
    rooms: values.rooms.toString(),
  });

  return `/search-results?${params.toString()}`;
};
