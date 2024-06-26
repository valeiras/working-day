"use client";

import { createNewProject } from "@/app/lib/projectFetchers";
import { SubmitHandler, useForm } from "react-hook-form";
import { newProjectFormSchema, NewProjectFormSchemaType } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { forwardRef } from "react";

type Props = { closeModal: () => void };
const NewProjectModal = forwardRef<HTMLDialogElement, Props>(function NewProjectModal({ closeModal }, modalRef) {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectFormSchemaType>({ resolver: zodResolver(newProjectFormSchema), defaultValues: { name: "" } });

  const onSubmit: SubmitHandler<NewProjectFormSchemaType> = async (data) => {
    await createNewProject({ name: data.name });
    reset();
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const onReset = () => {
    closeModal();
    reset();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">{"Create new project"}</h3>
        <input {...register("name")} type="text" placeholder="Project's name" className="input input-bordered w-full" />
        <span className="text-sm text-error h-1">{errors.name ? errors.name.message : ` `}</span>
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creting project..." : "Create project"}
          </button>
          <button className="btn btn-secondary" type="reset" onClick={onReset} disabled={isSubmitting}>
            {isSubmitting ? "Creting project..." : "Cancel"}
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default NewProjectModal;
