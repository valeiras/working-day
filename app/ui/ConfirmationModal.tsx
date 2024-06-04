import { forwardRef } from "react";

type Props = { handleClick: () => void; title: string; message?: string; buttonText: string };

const ConfirmationModal = forwardRef<HTMLDialogElement, Props>(function ConfirmModal(
  { handleClick, title, buttonText, message },
  modalRef
) {
  return (
    <dialog ref={modalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" method="dialog">
        <h3 className="font-bold text-lg">{title}</h3>
        {message && <p>{message}</p>}
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary" onClick={handleClick}>
            {buttonText}
          </button>
          <button className="btn btn-secondary">No!</button>
        </div>
      </form>
    </dialog>
  );
});

export default ConfirmationModal;
