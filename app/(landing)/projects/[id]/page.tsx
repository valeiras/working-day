import React from "react";

type Props = { params: { id: string } };

const Project: React.FC<Props> = ({ params: { id } }) => {
  return (
    <div>
      <h2>Project</h2>
    </div>
  );
};

export default Project;
