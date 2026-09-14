import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters" }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
