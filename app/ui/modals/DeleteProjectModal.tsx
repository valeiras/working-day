"use client";

import { deleteProject } from "@/app/lib/projectFetchers";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useEditProjectContext } from "@/app/contexts/EditProjectContext";

const DeleteProjectModal = () => {
  const { projectId, deleteModalRef } = useEditProjectContext()!;
  const queryClient = useQueryClient();

  const closeModal = () => {
    deleteModalRef.current?.close();
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await deleteProject({ id: projectId });
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const onReset = () => {
    closeModal();
  };

  return (
    <dialog ref={deleteModalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Are you sure you want to delete this project?</h3>
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Deleting project..." : "Delete project"}
          </button>
          <button className="btn btn-secondary" type="reset" onClick={onReset} disabled={isSubmitting}>
            {isSubmitting ? "Deleting project..." : "Cancel"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteProjectModal;
