import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { LocalStopwatch, ConnectedStopwatchAndProjectSelector } from "../ui";
import { ProjectWithWorkingTimes } from "../lib/db/queries";

export default async function Home() {
  return (
    <div className="flex flex-1 justify-center flex-col gap-6 md:pb-24">
      <SignedIn>
        <ConnectedStopwatchAndProjectSelector />
      </SignedIn>
      <SignedOut>
        <LocalStopwatch />
        <SignInButton>
          <button className="btn btn-primary">Sign in</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
