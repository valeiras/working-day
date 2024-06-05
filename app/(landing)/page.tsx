import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { LocalStopwatch, ConnectedStopwatchAndProjectSelector } from "../ui";

export default function Home() {
  return (
    <div className="flex flex-1 justify-start flex-col gap-12 mb-12">
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
