"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/redux/features/auth-slice";
import { redirect, useRouter } from "next/navigation";
import UsersTable from "@/components/table/users-table/UsersTable";
import Bio from "@/components/bio/Bio";

export default function Home() {
  const { value } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();
  if (!value.isAuth) return redirect("/sign-in");

  return (
    <>
      <header className={"w-full py-2.5 bg-custom-white shadow-xl"}>
        <div
          className={
            "container flex justify-between gap-5 items-center text-dark font-semibold"
          }
        >
          <h3>Welcome!</h3>
          <Button
            className={"form-bg"}
            onClick={() => {
              dispatch(logout());
              router.push("/sign-in");
            }}
          >
            Logout
          </Button>
        </div>
      </header>
      <main>
        <section className={"container"}>
          <UsersTable />
        </section>
        <Bio />
      </main>
    </>
  );
}
