import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <section className=" bg-slate-200 h-screen overflow-hidden flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-5 "> Sign in </h1>
      <SignIn />
    </section>
  );
};

export default page;
