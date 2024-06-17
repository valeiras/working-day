"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import { FieldErrors, FieldValues, Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { SaveBlockFormSchemaType, saveBlockFormSchema } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatTime } from "@/app/lib/utils";
import { stopBlock } from "@/app/lib/actions";
import { useQueryClient } from "@tanstack/react-query";

const SaveBlockModalContent: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { blockId } = useParams<{ blockId: string }>();
  const searchParams = useSearchParams();

  const { hours, minutes, seconds } = formatTime(parseInt(searchParams.get("t") || "0"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SaveBlockFormSchemaType>({
    resolver: zodResolver(saveBlockFormSchema),
    defaultValues: { hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) },
  });

  const onCancel = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<SaveBlockFormSchemaType> = async (data) => {
    const totalTimeSeconds = data.hours * 3600 + data.minutes * 60 + data.seconds;
    await stopBlock({ blockId: parseInt(blockId), totalTimeSeconds });
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    router.back();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-lg">Save the current working block</h3>
      <p>You can adjust the worked time</p>
      <div className="flex flex-row items-center justify-stretch">
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
  );
};

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
        <input
          {...register(name)}
          type="number"
          min={0}
          max={60}
          id={name}
          className="flex-1 input input-bordered"
          autoFocus={false}
        />
        {hasColon && <span className="mx-1">:</span>}
      </div>
      <span className="text-sm text-error h-1 -mt-2 mb-1">{errors[name] ? errors[name]?.message : " "}</span>
    </div>
  );
};

export default SaveBlockModalContent;
