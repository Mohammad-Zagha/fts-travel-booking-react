import * as z from "zod";
import type { checkoutSchema, searchSchema } from "../lib/zod/Schemas";
export type SearchFormValues = z.infer<typeof searchSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
