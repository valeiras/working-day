"use client";

import { editProject } from "@/app/lib/projectFetchers";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectFormSchema, ProjectFormSchemaType } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useEditProjectContext } from "@/app/contexts/EditProjectContext";
import { useProjects } from "@/app/lib/hooks";
import { useEffect } from "react";

const EditProjectModal = () => {
  const { projectId, editModalRef } = useEditProjectContext()!;
  const { projects } = useProjects();
  const queryClient = useQueryClient();

  const currProject = projects.find((project) => project.id === projectId);

  const closeModal = () => {
    editModalRef.current?.close();
  };

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: { name: currProject?.name },
  });

  useEffect(() => {
    setValue("name", currProject?.name || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const onSubmit: SubmitHandler<ProjectFormSchemaType> = async (data) => {
    await editProject({ name: data.name, id: projectId });
    closeModal();
    reset();
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const onReset = () => {
    closeModal();
    reset();
  };

  return (
    <dialog ref={editModalRef} className="modal">
      <form className="modal-box flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">{"Edit existing project"}</h3>
        <input {...register("name")} type="text" placeholder="Project's name" className="input input-bordered w-full" />
        <span className="text-sm text-error h-1">{errors.name ? errors.name.message : ` `}</span>
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Editing project..." : "Edit project"}
          </button>
          <button className="btn btn-secondary" type="reset" onClick={onReset} disabled={isSubmitting}>
            {isSubmitting ? "Editing project..." : "Cancel"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EditProjectModal;
