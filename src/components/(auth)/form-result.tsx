import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { FormResult as FormResultType } from "@/types/form-result";

export default function FormResult({ success, message }: FormResultType) {
  if (!message) {
    return null;
  }

  return (
    <div className={cn(
      "p-2 flex items-center text-sm gap-2 rounded",
      success ? "bg-green-700/25 text-green-700" : "bg-red-700/25 text-red-700"
    )}>
      {success ? (
        <FaRegCircleCheck className="w-4 h-4" />
      ) : (
        <FaRegCircleXmark className="w-4 h-4" />
      )}
      <p>{message}</p>
    </div>
  );
}