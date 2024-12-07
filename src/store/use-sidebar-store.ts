import { create } from "zustand";

interface UseSidebarStoreProps {
  isExtended: boolean;
  toggleExtended: () => void;
}

export const useSidebarStore = create<UseSidebarStoreProps>(set => ({
  isExtended: true,
  toggleExtended: () => set(state => ({ isExtended: !state.isExtended }))
}));