import Link from "next/link";
import React from "react";
import { FaList } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const EditButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Link href="/projects">
        <MdEdit />
      </Link>
      <Link href="/projects">
        <FaList />
      </Link>
    </div>
  );
};

export default EditButtons;
