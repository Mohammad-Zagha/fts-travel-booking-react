import * as z from "zod";
export const SearchSchema = z.object({
  search: z.string(),
  from: z.string(),
  to: z.string(),
  adults: z.number().min(1),
  children: z.number().min(0),
  rooms: z.number().min(1, "At least 1 room is required"),
});
