import { StartTimes, selectAllProjectsWithWorkingTimes } from "@/app/lib/db/queries";
import { computeAcumulatedTimer, formatTime } from "@/app/lib/utils";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaList } from "react-icons/fa6";

const Page: React.FC = async () => {
  const { data: projects, error } = await selectAllProjectsWithWorkingTimes();
  if (error) console.log(error);

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <h2 className="text-lg text-center">Projects:</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Total time</th>
              <th>Is active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects?.map(({ name, id, activeBlock, workingBlocks }, idx) => {
              const totalTimer = workingBlocks.reduce((acc, { startTimes }) => {
                return acc + computeAcumulatedTimer(startTimes);
              }, 0);
              const { hours, minutes, seconds } = formatTime(totalTimer);
              return (
                <tr key={id} className={activeBlock?.id ? "bg-neutral" : ""}>
                  <th>{idx}</th>
                  <th>{name}</th>
                  <th>{`${hours}:${minutes}:${seconds}`}</th>
                  <th>{activeBlock?.id ? <FaCheck /> : <IoClose />}</th>
                  <th className="flex gap-2">
                    <Link href="/">
                      <MdEdit />
                    </Link>
                    <Link href="/">
                      <FaList />
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
