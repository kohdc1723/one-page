import { MdErrorOutline } from "react-icons/md";

export default function ErrorComponent() {
  return (
    <div className="text-emerald-900 flex flex-col items-center justify-center gap-2">
      <MdErrorOutline className="text-4xl" />
      <p className="text-sm font-medium">
        Failed to load PDF
      </p>
    </div>
  );
}