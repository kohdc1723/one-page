import { create } from "zustand";

import { SidebarType } from "@/types/sidebar";

interface UseSidebarStoreProps {
  sidebar: SidebarType;
  toggleSidebar: () => void;
  setSidebar: (value: SidebarType) => void;
}

export const useSidebarStore = create<UseSidebarStoreProps>(set => ({
  sidebar: "open",
  toggleSidebar: () => set(state => {
    if (state.sidebar === "open") {
      return { sidebar: "close" };
    } else {
      return { sidebar: "open" };
    }
  }),
  setSidebar: (value) => set({ sidebar: value })
}));