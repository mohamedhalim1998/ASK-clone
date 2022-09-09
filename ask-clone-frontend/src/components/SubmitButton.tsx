import React from "react";

function SubmitButton(params: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer "
    >
      {params.label}
    </button>
  );
}

export default SubmitButton;
