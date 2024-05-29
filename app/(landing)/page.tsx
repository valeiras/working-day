import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Stopwatch } from "../ui";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center flex-col gap-12">
      <Stopwatch />
      <SignedIn>
        <button className="btn btn-primary">Manage your account</button>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="btn btn-primary">Sign in</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
