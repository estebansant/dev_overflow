import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const page = async () => {
  const session = await auth();

  console.log(session);
  return (
    <div className="bg-black">
      <h1 className="text-red-600">Welcome!</h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit" className="hover:cursor-pointer">
          Log Out
        </Button>
      </form>
    </div>
  );
};

export default page;
