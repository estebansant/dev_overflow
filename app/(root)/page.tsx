import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const page = async () => {
  const session = await auth();

  console.log(session);
  return (
    <div className="min-h-[100dvh] bg-black md:h-full">
      <h1 className="text-red-600">Welcome!</h1>
    </div>
  );
};

export default page;
