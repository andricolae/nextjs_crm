import { create } from "zustand";

interface StoreState {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

const useStore = create<StoreState>((set: any) => ({
	searchTerm: "",
	setSearchTerm: (term: string) => set({ searchTerm: term }),
}));

export default useStore;
