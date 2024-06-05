"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
      const ref = modalRef.current;
      return () => {
        ref.close();
      };
    }
  }, []);

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box flex flex-col gap-2">{children}</div>
    </dialog>
  );
};

export default Modal;
