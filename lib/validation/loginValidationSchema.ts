import * as z from "zod";

export const loginValidationSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    })
    .max(150, {
      message: "Username must be at most 150 characters.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(1, {
      message: "Password must be at least 1 characters.",
    })
    .max(128, {
      message: "Password must be at most 128 characters.",
    }),
});
