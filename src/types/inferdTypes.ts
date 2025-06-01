import * as z from "zod";
import type { SearchSchema } from "../lib/zod/Schemas";
export type SearchFormValues = z.infer<typeof SearchSchema>;
