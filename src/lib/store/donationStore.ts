import { create } from "zustand";

export type DonationType = "general" | "specific";

interface ContributorsData {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface DonationState {
  step: number;
  type: DonationType;
  shelterId?: number;
  value: string;
  contributors: ContributorsData[];

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setType: (type: DonationType) => void;
  setShelterId: (id: number | undefined) => void;
  setValue: (value: string) => void;
  addContributor: (contributor: ContributorsData) => void;
  removeContributor: (key: string) => void;
  updateContributor: (key: string, contributor: ContributorsData) => void;
  setContributors: (contributors: ContributorsData[]) => void;
  reset: () => void;
}

const initialState: Pick<
  DonationState,
  "step" | "type" | "shelterId" | "value" | "contributors"
> = {
  step: 0,
  type: "general",
  shelterId: undefined,
  value: "",
  contributors: [],
};

export const useDonationStore = create<DonationState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  setType: (type) =>
    set({
      type,
      shelterId:
        type === "general" ? undefined : (undefined as unknown as undefined),
    }),
  setShelterId: (id) => set({ shelterId: id }),
  setValue: (value) => set({ value }),

  addContributor: (contributor) =>
    set((s) => ({
      contributors: [
        ...s.contributors,
        { ...contributor, key: contributor.key || crypto.randomUUID() },
      ],
    })),

  removeContributor: (key) =>
    set((s) => ({
      contributors: s.contributors.filter(
        (contributor) => contributor.key !== key,
      ),
    })),

  updateContributor: (key, contributorVal) =>
    set((s) => ({
      contributors: s.contributors.map((contributor) =>
        contributor.key === key ? contributorVal : contributor,
      ),
    })),

  setContributors: (contributors) => set({ contributors }),

  reset: () => set(initialState),
}));
