import { usePathname } from "next/navigation";

export default function useBasePathname() {
  const pathname = usePathname();

  return `/${pathname.split('/')[1]}` || "/";
}