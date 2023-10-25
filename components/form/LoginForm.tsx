"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedText from "@/components/ui/animated-text";
import { motion } from "framer-motion";
import { loginValidationSchema } from "@/lib/validation/loginValidationSchema";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginUser } from "@/redux/services/auth";
import { useAppSelector } from "@/hooks/useAppSelector";
import Spinner from "@/assets/icons/Spinner";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, redirect } from "next/navigation";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { loading, error, value } = useAppSelector(
    (state) => state.authReducer
  );

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    dispatch(loginUser(values));
    form.reset();
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  useEffect(() => {
    if (value.isAuth) {
      toast({
        title: "Login success",
        description: "You have successfully logged in",
      });
      router.push("/");
    }
  }, [value.isAuth]);

  if (value.isAuth) return redirect("/");

  return (
    <section className="w-[380px] rounded-lg shadow-lg flex flex-col gap-5 overflow-hidden text-dark bg-custom-white">
      <h3
        className={
          "text-3xl text-center form-bg font-semibold leading-[100px] text-custom-white"
        }
      >
        <AnimatedText text={"Login form"} />
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col gap-5 p-5"}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  initial={{ filter: "blur(20px)", opacity: 0, scale: 0 }}
                  animate={{ filter: "blur(0)", opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                  }}
                >
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </motion.div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  initial={{ filter: "blur(20px)", opacity: 0, scale: 0 }}
                  animate={{ filter: "blur(0)", opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password..."
                      {...field}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage />
                </motion.div>
              </FormItem>
            )}
          />
          <motion.div
            initial={{ filter: "blur(20px)", opacity: 0, scale: 0 }}
            animate={{ filter: "blur(0)", opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.6,
            }}
            className={"flex justify-center"}
          >
            <Button type="submit" className={"form-bg mt-5"} disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  <span className={"ml-3"}>Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
