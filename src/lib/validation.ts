import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  age: z.coerce.number().int().min(18, "You must be at least 18").max(100),
  occupation: z.string().min(2, "Occupation is required"),
  region: z.string().min(2, "Region is required"),
  bio: z.string().max(280, "Bio cannot exceed 280 characters").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});
