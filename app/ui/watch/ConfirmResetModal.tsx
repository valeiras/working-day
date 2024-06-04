import { forwardRef } from "react";

type Props = { resetTimer: () => void };

const ConfirmResetModal = forwardRef<HTMLDialogElement, Props>(function ConfirmResetModal({ resetTimer }, modalRef) {
  return (
    <dialog ref={modalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" method="dialog">
        <h3 className="font-bold text-lg">{"Are you sure you want to reset your working time?"}</h3>
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary" onClick={resetTimer}>
            Yes, set it to 0
          </button>
          <button className="btn btn-secondary">No!</button>
        </div>
      </form>
    </dialog>
  );
});

export default ConfirmResetModal;
