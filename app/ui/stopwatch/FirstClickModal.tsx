import { forwardRef } from "react";
import { SignInButton } from "@clerk/nextjs";

type Props = { startTimer: () => void };

const FirstClickModal = forwardRef<HTMLDialogElement, Props>(function FirstClickModal({ startTimer }, modalRef) {
  return (
    <dialog ref={modalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" method="dialog">
        <h3 className="font-bold text-lg">{"If you don't log in, the app is just a Stopwatch"}</h3>
        <p>Create an account to track your working hours on different projects, get stats, etc.</p>
        <div className="modal-action grid grid-cols-2">
          <SignInButton>
            <button className="btn btn-primary" type="button">
              Sign in
            </button>
          </SignInButton>
          <button className="btn btn-secondary" onClick={startTimer}>
            I just want a stopwatch
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default FirstClickModal;
