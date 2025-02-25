"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface TabSelectorProps {
  activeTab: string;
}

export default function TabSelector({ activeTab }: TabSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  }

  return (
    <ul className="p-4 h-14 flex items-center gap-4 border-b border-slate-300">
      <li className="flex-1">
        <Button
          variant="ghost"
          onClick={() => handleClickTab("contents")}
          className={cn(
            "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
            activeTab === "contents" && "bg-emerald-900/10"
          )}
        >
          Contents
        </Button>
      </li>
      <li className="flex-1">
        <Button
          variant="ghost"
          onClick={() => handleClickTab("styles")}
          className={cn(
            "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
            activeTab === "styles" && "bg-emerald-900/10"
          )}
        >
          Styles
        </Button>
      </li>
      <li className="flex-1">
        <Button
          variant="ghost"
          onClick={() => handleClickTab("design")}
          className={cn(
            "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
            activeTab === "design" && "bg-emerald-900/10"
          )}
        >
          Design
        </Button>
      </li>
    </ul>
  );
}