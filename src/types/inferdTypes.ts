import * as z from "zod";
import type {
  addCitySchema,
  addHotelSchema,
  addRoomSchema,
  checkoutSchema,
  searchSchema,
} from "../lib/zod/Schemas";
export type SearchFormValues = z.infer<typeof searchSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type AddCityFormValues = z.infer<typeof addCitySchema>;
export type AddHotelFormValues = z.infer<typeof addHotelSchema>;
export type AddRoomFormValues = z.infer<typeof addRoomSchema>;
