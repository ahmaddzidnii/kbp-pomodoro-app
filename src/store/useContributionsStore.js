import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper untuk generate data kosong
const generateEmptyData = (daysBack = 365) => {
  const data = [];
  const today = new Date();

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      count: 0,
    });
  }

  return data;
};

const useContributionStore = create(
  persist(
    (set, get) => ({
      // State sebagai array of objects
      contributions: generateEmptyData(),

      // Menambah kontribusi
      addContribution: (date, value) =>
        set((state) => ({
          contributions: state.contributions.map((item) =>
            item.date === date ? { ...item, count: item.count + value } : item
          ),
        })),

      // Reset ke data kosong
      resetContributions: () =>
        set({
          contributions: generateEmptyData(),
        }),

      // Mendapatkan kontribusi untuk tanggal tertentu
      getContributionByDate: (date) => {
        const state = get();
        const contribution = state.contributions.find((item) => item.date === date);
        return contribution ? contribution.count : 0;
      },

      // Mendapatkan semua data (sudah dalam format yang siap untuk graph)
      getAllContributions: () => {
        const state = get();
        return state.contributions;
      },
    }),
    {
      name: "contribution-storage",
    }
  )
);

export default useContributionStore;
