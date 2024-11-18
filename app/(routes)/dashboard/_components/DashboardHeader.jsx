import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="shadow-sm relative w-full h-12 py-3 px-5 ">
      <div className="absolute right-0 pr-2">
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
