import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { IoMdStats, IoMdList, IoMdSettings } from "react-icons/io";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between p-2 px-4 w-full items-center">
      <Link href={"/"}>
        <h1 className="text-3xl md:text-5xl font-bold">W</h1>
      </Link>
      <SignedIn>
        <div className="flex items-center gap-2 text-2xl md:text-3xl">
          <Link href={"/stats"} className="tooltip tooltip-bottom" data-tip="Stats">
            <IoMdStats />
          </Link>
          <Link href={"/projects"} className="tooltip tooltip-bottom" data-tip="Projects">
            <IoMdList />
          </Link>
          <Link href={"/settings"} className="tooltip tooltip-bottom" data-tip="Settings">
            <IoMdSettings />
          </Link>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar;
