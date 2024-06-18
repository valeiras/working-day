"use client";

import React, { useEffect } from "react";
import { FieldErrors, Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { SaveBlockFormSchemaType, saveBlockFormSchema } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatTime } from "@/app/lib/utils";
import { stopBlock } from "@/app/lib/actions";
import { forwardRef } from "react";

type Props = {
  closeModal: () => void;
  handleLocalStop: () => void;
  blockId: number | undefined;
  currentTimerCs: number;
};

const SaveBlockModal = forwardRef<HTMLDialogElement, Props>(function SaveBlockModal(
  { closeModal, handleLocalStop, currentTimerCs, blockId },
  modalRef
) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SaveBlockFormSchemaType>({
    resolver: zodResolver(saveBlockFormSchema),
    defaultValues: { hours: 0, minutes: 0, seconds: 0 },
  });

  useEffect(() => {
    const { hours, minutes, seconds } = formatTime(currentTimerCs);
    setValue("hours", parseInt(hours));
    setValue("minutes", parseInt(minutes));
    setValue("seconds", parseInt(seconds));
  }, [currentTimerCs, setValue]);

  const onCancel = () => {
    closeModal();
  };

  const onSubmit: SubmitHandler<SaveBlockFormSchemaType> = async (data) => {
    const totalTimeSeconds = data.hours * 3600 + data.minutes * 60 + data.seconds;
    if (blockId) await stopBlock({ blockId, totalTimeSeconds });
    handleLocalStop();
    closeModal();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <form className="modal-box flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Save the current working block</h3>
        <p>You can adjust the worked time</p>
        <div className="flex flex-row items-center justify-stretch">
          <input type="text" className="absolute top-[-1000px]" autoFocus={true} />
          <TimeInput name="hours" register={register} errors={errors} />
          <TimeInput name="minutes" register={register} errors={errors} />
          <TimeInput name="seconds" register={register} errors={errors} hasColon={false} />
        </div>
        <div className="modal-action grid grid-cols-2">
          <button className="btn btn-primary " type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button className="btn btn-secondary" type="reset" onClick={onCancel} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Cancel"}
          </button>
        </div>
      </form>
    </dialog>
  );
});

const TimeInput = ({
  name,
  register,
  errors,
  hasColon = true,
}: {
  name: Path<SaveBlockFormSchemaType>;
  register: UseFormRegister<SaveBlockFormSchemaType>;
  errors: FieldErrors<SaveBlockFormSchemaType>;
  hasColon?: boolean;
}) => {
  return (
    <div className="form-control flex-1">
      <label className="label capitalize" htmlFor="minutes">
        {name}
      </label>
      <div className="flex items-center">
        <input {...register(name)} type="number" min={0} max={60} id={name} className="flex-1 input input-bordered" />
        {hasColon && <span className="mx-1">:</span>}
      </div>
      <span className="text-sm text-error h-1 -mt-2 mb-1">{errors[name] ? errors[name]?.message : " "}</span>
    </div>
  );
};

export default SaveBlockModal;
