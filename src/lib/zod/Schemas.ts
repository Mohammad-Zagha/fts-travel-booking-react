import { z } from "zod";
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

export const addCitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const addHotelSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  hotelType: z.string().min(1, "Hotel type is required"),
  starRating: z
    .number({ invalid_type_error: "Star rating must be a number" })
    .min(1, "Minimum 1 star")
    .max(5, "Maximum 5 stars"),
  latitude: z
    .number({ invalid_type_error: "Latitude must be a number" })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number({ invalid_type_error: "Longitude must be a number" })
    .min(-180, "Longitude must be between -180 and 180"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  availableRooms: z
    .number({ invalid_type_error: "Available rooms must be a number" })
    .min(0, "Available rooms cannot be negative"),
  cityId: z
    .number({ invalid_type_error: "City ID must be a number" })
    .min(1, "City ID is required"),

  rooms: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        type: z.string(),
        price: z.number(),
        available: z.boolean(),
        maxOccupancy: z.number(),
      })
    )
    .optional()
    .default([]),

  amenities: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .default([]),
});
export const amenitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const addRoomSchema = z.object({
  roomId: z.number(),
  roomNumber: z.number(),
  roomPhotoUrl: z.string().url("Must be a valid URL").optional(),
  roomType: z.string(),
  capacityOfAdults: z.number().min(0),
  capacityOfChildren: z.number().min(0),
  amenities: z.array(amenitySchema).optional().default([]),
  price: z.number().min(0),
  availability: z.boolean(),
});
