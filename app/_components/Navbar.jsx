"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="py-2 bg-late-200 flex justify-between items-center border shadow-sm ">
      <div className="flex justify-center items-center gap-3">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={50}
          height={19}
          className="pl-3"
        />
        <span className=" text-primary font-bold text-xl"> Finance Smart </span>
      </div>

      <>
        <div className="flex justify-center items-center gap-6 px-2">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              {" "}
              Dashboard{" "}
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/login">
              <Button className="rounded-full"> Get started </Button>
            </Link>
          )}
        </div>
      </>
    </div>
  );
};

export default Navbar;
