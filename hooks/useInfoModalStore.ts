import { create } from 'zustand'

export interface InfoModalStore {
	movieId?: string
	isOpen: boolean
	openModal: (movieId: string) => void
	closeModal: () => void
}

export const useInfoModalStore = create<InfoModalStore>((set) => ({
	isOpen: false,
	openModal: (movieId) => set({ isOpen: true, movieId }),
	closeModal: () => set({ isOpen: false, movieId: undefined })
}))

export default useInfoModalStore
