import React, { useState } from "react";
import Modal from "./Modal";

const SubtaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className= "text-teal-900 font-medium underline"
      >
        View
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Subtasks</h2>
        
      </Modal>
    </>
  );
};

export default SubtaskModal;
