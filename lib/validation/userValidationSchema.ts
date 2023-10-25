import * as z from "zod";
import { parse, isValid } from "date-fns";

export const userValidationSchema = z.object({
  name: z
    .string({
      required_error: "Username is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    })
    .max(255, {
      message: "Username must be at most 255 characters.",
    }),
  email: z
    .string({
      required_error: "Username is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    })
    .max(254, {
      message: "Username must be at most 254 characters.",
    })
    .email({
      message: "Email must be a valid email.",
    }),
  birthday_date: z.date({
    required_error: "Birthday is required.",
  }),
  phone_number: z
    .string({
      required_error: "Phone is required.",
    })
    .min(1, {
      message: "Phone must be at least 1 characters.",
    })
    .max(20, {
      message: "Phone must be at most 20 characters.",
    }),
  address: z
    .string()
    .min(1, {
      message: "Address must be at least 1 characters.",
    })
    .optional(),
});
