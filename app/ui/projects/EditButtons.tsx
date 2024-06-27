import { useEditProjectContext } from "@/app/contexts/EditProjectContext";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

type Props = { projectId: number };
const EditButtons: React.FC<Props> = ({ projectId }) => {
  const { setProjectId, editModalRef, deleteModalRef } = useEditProjectContext()!;

  const handleEditClick = () => {
    setProjectId(projectId);
    console.log(editModalRef);
    editModalRef.current?.showModal();
  };

  const handleDeleteClick = () => {
    setProjectId(projectId);
    deleteModalRef.current?.showModal();
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleEditClick}>
        <MdEdit />
      </button>
      <button onClick={handleDeleteClick}>
        <MdDelete />
      </button>
    </div>
  );
};

export default EditButtons;
