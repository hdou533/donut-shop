"use client";
import { useState } from "react";

interface DeleteBtnProps {
  label: string;
  onDelete: () => void;
}

const DeleteBtn = ({ label, onDelete }: DeleteBtnProps) => {
  const [confirmDial, setConfirmDial] = useState(false);

  return (
    <>
      {confirmDial && (
        <div className="fixed bg-black/20 inset-0 flex items-center h-screen justify-center">
          <div className="bg-white p-12 rounded-lg">
            <div>Are you sure you want to delete?</div>
            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setConfirmDial(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmDial(false);
                  onDelete();
                }}
                className="bg-primary text-white"
              >
                Yes,&nbsp;delete!
              </button>
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setConfirmDial(true)}>
        {label}
      </button>
    </>
  );
};

export default DeleteBtn;
