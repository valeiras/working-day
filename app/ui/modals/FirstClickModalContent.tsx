"use client";

import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const FirstClickModalContent: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <h3 className="font-bold text-lg">{"If you don't log in, the app is just a Stopwatch"}</h3>
      <p>Create an account to track your working hours on different projects, get stats, etc.</p>
      <div className="modal-action grid grid-cols-2">
        <SignInButton>
          <button className="btn btn-primary" type="button">
            Sign in
          </button>
        </SignInButton>
        <button
          className="btn btn-secondary"
          onClick={() => {
            router.back();
          }}
        >
          I just want a stopwatch
        </button>
      </div>
    </>
  );
};

export default FirstClickModalContent;
