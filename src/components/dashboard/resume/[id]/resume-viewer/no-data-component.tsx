import { MdOutlineCancel } from "react-icons/md";

export default function NoDataComponent() {
  return (
    <div className="text-emerald-900 flex flex-col items-center justify-center gap-2">
      <MdOutlineCancel className="text-4xl" />
      <p className="text-sm font-medium">
        No PDF file specified
      </p>
    </div>
  );
}