import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState
} from 'react';

type FiltersContextType = {
	selectedDifficulty: string;
	setSelectedDifficulty: Dispatch<SetStateAction<string>>;
	selectedCategory: string;
	setSelectedCategory: Dispatch<SetStateAction<string>>;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
	const context = useContext(FiltersContext);

	if (!context) {
		throw new Error(
			'useFiltersContext must be used within a FiltersContextProvider'
		);
	}

	return context;
};

export const FiltersContextProvider = ({ children }: PropsWithChildren) => {
	const [selectedDifficulty, setSelectedDifficulty] = useState('All');
	const [selectedCategory, setSelectedCategory] = useState('All');

	return (
		<FiltersContext.Provider
			value={{
				selectedDifficulty,
				setSelectedDifficulty,
				selectedCategory,
				setSelectedCategory
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};
