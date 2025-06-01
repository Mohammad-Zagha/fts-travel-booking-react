import { useLocation } from "react-router";

export default function useQueryParams(): Record<string, string> {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
