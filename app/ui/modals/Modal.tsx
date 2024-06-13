"use client";

import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  const detectKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, [detectKeyDown]);

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
    <dialog className="modal overflow-y-hidden" ref={modalRef}>
      <div className="modal-box flex flex-col gap-2">{children}</div>
    </dialog>
  );
};

export default Modal;
