import { create } from "zustand";

import { ResumeWithRelations } from "@/types/resume";

interface UseResumeStoreProps {
  resume: ResumeWithRelations | null;
  setResume: (resume: ResumeWithRelations) => void;
}

export const useResumeStore = create<UseResumeStoreProps>(set => ({
  resume: null,
  setResume: (resume) => set({ resume })
}));