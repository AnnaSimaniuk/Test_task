import { IUser } from "@/types/IUser";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userValidationSchema } from "@/lib/validation/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/assets/icons/Spinner";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { editUser } from "@/redux/services/users";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Dispatch, SetStateAction } from "react";

interface EditUserFormProps {
  data: IUser;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditUserForm = ({ data, setOpen }: EditUserFormProps) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.usersReducer);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userValidationSchema>>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      ...data,
      birthday_date: parse(data.birthday_date, "dd-MM-yy", new Date()),
    },
  });

  const onSubmit = (values: z.infer<typeof userValidationSchema>) => {
    const updatedUser = {
      ...values,
      id: data.id,
      birthday_date: format(values.birthday_date, "yyyy-MM-dd"),
    };
    dispatch(editUser(updatedUser));
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      setOpen(false);
      form.reset();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col gap-5 p-5"}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emil</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {typeof field.value === "string"
                          ? field.value
                          : format(field.value, "dd-MM-yy")}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        typeof field.value === "string"
                          ? parse(field.value, "dd-MM-yy", new Date())
                          : field.value
                      }
                      onSelect={field.onChange}
                      disabled={(date: any) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
