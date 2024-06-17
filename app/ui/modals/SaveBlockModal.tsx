// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useParams } from "next/navigation";
// import { FieldErrors, Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
// import { SaveBlockFormSchemaType, saveBlockFormSchema } from "@/app/lib/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { formatTime } from "@/app/lib/utils";
// import { stopBlock } from "@/app/lib/actions";
// import { useQueryClient } from "@tanstack/react-query";

// import React from "react";
// import Modal from "./Modal";
// import { SAVE_BLOCK_MODAL_ID } from "@/app/lib/constants";

// type Props = { blockId: number; currentTimerCs: number };

// const SaveBlockModal: React.FC<Props> = ({ blockId, currentTimerCs }) => {
//   const queryClient = useQueryClient();

//   const { hours, minutes, seconds } = formatTime(currentTimerCs);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SaveBlockFormSchemaType>({
//     resolver: zodResolver(saveBlockFormSchema),
//     defaultValues: { hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) },
//   });

//   const onCancel = () => {
//     document.getElementById(SAVE_BLOCK_MODAL_ID)?.close();
//   };

//   const onSubmit: SubmitHandler<SaveBlockFormSchemaType> = async (data) => {
//     const totalTimeSeconds = data.hours * 3600 + data.minutes * 60 + data.seconds;
//     await stopBlock({ blockId, totalTimeSeconds });
//     queryClient.invalidateQueries({ queryKey: ["projects"] });
//     router.back();
//   };

//   return (
//     <Modal id={SAVE_BLOCK_MODAL_ID}>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//         <h3 className="font-bold text-lg">Save the current working block</h3>
//         <p>You can adjust the worked time</p>
//         <div className="flex flex-row items-center justify-stretch">
//           <input type="text" className="absolute top-[-1000px]" autoFocus={true} />
//           <TimeInput name="hours" register={register} errors={errors} />
//           <TimeInput name="minutes" register={register} errors={errors} />
//           <TimeInput name="seconds" register={register} errors={errors} hasColon={false} />
//         </div>
//         <div className="modal-action grid grid-cols-2">
//           <button className="btn btn-primary " type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Saving..." : "Save"}
//           </button>
//           <button className="btn btn-secondary" type="reset" onClick={onCancel} disabled={isSubmitting}>
//             {isSubmitting ? "Saving..." : "Cancel"}
//           </button>
//         </div>
//       </form>
//       );
//     </Modal>
//   );
// };

// const TimeInput = ({
//   name,
//   register,
//   errors,
//   hasColon = true,
// }: {
//   name: Path<SaveBlockFormSchemaType>;
//   register: UseFormRegister<SaveBlockFormSchemaType>;
//   errors: FieldErrors<SaveBlockFormSchemaType>;
//   hasColon?: boolean;
// }) => {
//   return (
//     <div className="form-control flex-1">
//       <label className="label capitalize" htmlFor="minutes">
//         {name}
//       </label>
//       <div className="flex items-center">
//         <input {...register(name)} type="number" min={0} max={60} id={name} className="flex-1 input input-bordered" />
//         {hasColon && <span className="mx-1">:</span>}
//       </div>
//       <span className="text-sm text-error h-1 -mt-2 mb-1">{errors[name] ? errors[name]?.message : " "}</span>
//     </div>
//   );
// };

// export default SaveBlockModal;
