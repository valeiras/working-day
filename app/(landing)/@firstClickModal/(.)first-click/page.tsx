import { FirstClick, Modal } from "@/app/ui";
import React from "react";

const Page: React.FC = () => {
  return (
    <Modal>
      <div>Interception!!!</div>
      <FirstClick />
    </Modal>
  );
};

export default Page;
