"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SignInFormValues, signInSchema } from "@/lib/schemas/signInSchema";
import { redirect } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "@/lib/api/client-api";
import { toast } from "sonner";
import axios from "axios";
import AuthLayout from "@/lib/ui/auth-layout";

type PageProps = {};

function LoginPage({}: PageProps) {
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("You successfully logged in. Welcome!");
      redirect("/dictionary");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) toast.error(error.response?.data?.message);
        if (status === 500) toast.error("Something went wrong");
      }
    },
  });

  return (
    <AuthLayout
      title="Login"
      description="Please enter your login details to continue using our service:"
    >
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input {...register("email")} id="email" type="text" />
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="text" />
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Registration</Link>
    </AuthLayout>
  );
}
export default LoginPage;
