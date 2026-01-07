import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/icons/hamburger.svg" alt="menu" width={36} height={36} className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 border-none p-6" side="left">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <SheetClose asChild>
          <Link href="/" className="flex items-center gap-1">
            <Image src="/images/site-logo.svg" width={23} height={23} alt="logo" />
            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Flow</span>
            </p>
          </Link>
        </SheetClose>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between gap-16 overflow-y-auto">
          <section className="flex h-full flex-col gap-6 pt-16">
            <NavLinks isMobileNav />
          </section>

          <div className="flex flex-col gap-3">
            {/* Log In Button */}
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            {/* Sign Up */}
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium btn-tertiary light-border-2 text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
