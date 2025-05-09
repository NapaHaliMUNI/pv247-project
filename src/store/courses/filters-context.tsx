import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState
} from 'react';

import {
	type CourseDifficulty,
	type courseDifficultySchema
} from '@/db/schema/course';

type FiltersContextType = {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	selectedDifficulties: CourseDifficulty[];
	setSelectedDifficulties: Dispatch<SetStateAction<CourseDifficulty[]>>;
	selectedCategory: string;
	setSelectedCategory: Dispatch<SetStateAction<string>>;
	selectedSort: string;
	setSelectedSort: Dispatch<SetStateAction<string>>;
	selectedDuration: string;
	setSelectedDuration: Dispatch<SetStateAction<string>>;
	resetFilters: () => void;
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
	const [selectedDifficulties, setSelectedDifficulties] = useState<
		CourseDifficulty[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSort, setSelectedSort] = useState('Most Popular');
	const [selectedDuration, setSelectedDuration] = useState('');

	console.log('selectedDifficulties', selectedDifficulties);

	const resetFilters = () => {
		console.log('resetFilters');
		// TODO: reset all filters including search bar
		setSelectedDifficulties([]);
		// setSearchQuery('');
		// setSelectedSort('Most Popular');
		// setSelectedTags([]);
	};

	return (
		<FiltersContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				selectedDifficulties,
				setSelectedDifficulties,
				selectedCategory,
				setSelectedCategory,
				selectedSort,
				setSelectedSort,
				selectedDuration,
				setSelectedDuration,
				resetFilters
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};
