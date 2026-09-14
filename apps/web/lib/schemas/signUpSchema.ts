import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),
  email: z.email(),
  password: z
    .string()
    .min(6, {
      message: "Password must consist of 6 English letters and 1 number",
    })
    .regex(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
