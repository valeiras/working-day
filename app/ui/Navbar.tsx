import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { GoGear } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-end p-2 pr-4 w-full h-14">
      <SignedIn>
        <div className="flex items-center gap-2">
          <Link href={"/stats"}>
            <IoStatsChart className="text-2xl" />
          </Link>
          <Link href={"/settings"}>
            <GoGear className="text-2xl" />
          </Link>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar;
