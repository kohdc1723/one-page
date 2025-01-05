"use client";

import { IoWarningSharp } from "react-icons/io5";

interface MyAccountErrorProps {
  error: Error;
}

export default function MyAccountError({ error }: MyAccountErrorProps) {
  console.log(error.message)
  return (
    <div className="flex justify-center px-4 pt-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col justify-center items-center gap-2 text-slate-900">
          <IoWarningSharp className="w-16 h-16" />
          <p className="text-2xl font-bold">
            Something went wrong
          </p>
        </div>
        <p className="font-medium text-slate-500">
          {error.message}
        </p>
      </div>
    </div>
  );
}