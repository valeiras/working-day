import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { GoGear } from "react-icons/go";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-end p-2 w-full h-14">
      <SignedIn>
        <div className="flex items-center gap-2">
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
