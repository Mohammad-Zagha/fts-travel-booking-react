import * as z from "zod";
export const searchSchema = z.object({
  search: z.string().optional(),
  from: z.string(),
  to: z.string(),
  adults: z.number().min(1),
  children: z.number().min(0),
  rooms: z.number().min(1, "At least 1 room is required"),
});


export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
  cardNumber: z
    .string()
    .min(16, "Invalid card number")
    .max(16, "Invalid card number"),
  expiryDate: z.string().min(5, "Invalid expiry date"), // MM/YY
  cvv: z.string().min(3, "Invalid CVV").max(4, "Invalid CVV"),
});
