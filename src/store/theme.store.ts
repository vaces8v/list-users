import {create, StateCreator} from 'zustand';
import { persist } from 'zustand/middleware';


interface ITheme {
	theme: boolean
}

interface ActionTheme {
	switchTheme: () => void
}

const sliceTheme: StateCreator<ITheme & ActionTheme, [["zustand/persist", unknown]]> = (set, get) => ({
	theme: true,
	switchTheme: () => {
		const {theme} = get()
		set({theme: !theme})
	}
})


export const useTheme = create<ITheme & ActionTheme, [["zustand/persist", unknown]]>(persist(sliceTheme, {name: 'theme'}))