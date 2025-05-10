'use client';

import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState
} from 'react';

import {
	type CourseCategory,
	type CourseDifficulty,
	type CourseDuration
} from '@/db/schema/course';

type FiltersContextType = {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	selectedDifficulties: CourseDifficulty[];
	setSelectedDifficulties: Dispatch<SetStateAction<CourseDifficulty[]>>;
	selectedCategories: CourseCategory[];
	setSelectedCategories: Dispatch<SetStateAction<CourseCategory[]>>;
	selectedSort: string;
	setSelectedSort: Dispatch<SetStateAction<string>>;
	selectedDurations: CourseDuration[];
	setSelectedDurations: Dispatch<SetStateAction<CourseDuration[]>>;
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
	const [selectedCategories, setSelectedCategories] = useState<
		CourseCategory[]
	>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSort, setSelectedSort] = useState('Most Popular');
	const [selectedDurations, setSelectedDurations] = useState<CourseDuration[]>(
		[]
	);

	const resetFilters = () => {
		setSelectedDifficulties([]);
		setSelectedCategories([]);
		setSelectedDurations([]);
		setSearchQuery('');
		setSelectedSort('Most Popular');
	};

	return (
		<FiltersContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				selectedDifficulties,
				setSelectedDifficulties,
				selectedCategories,
				setSelectedCategories,
				selectedSort,
				setSelectedSort,
				selectedDurations,
				setSelectedDurations,
				resetFilters
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};
