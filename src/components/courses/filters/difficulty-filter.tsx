import type React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useFiltersContext } from '@/store/courses/filters-context';
import { MultiSelect } from '@/components/ui/multi-select';
import {
	type CourseDifficulty,
	courseDifficultySchema
} from '@/db/schema/course';

const courseDifficultyOptions = courseDifficultySchema.options.map(
	difficulty => ({
		label: difficulty,
		value: difficulty
		// icon can be added here if needed
	})
);

const DifficultyFilter = ({ difficulties }: { difficulties: string[] }) => {
	const { selectedDifficulties, setSelectedDifficulties } = useFiltersContext();

	return (
		<div>
			<h4 className="mb-2 text-sm font-medium">Difficulty</h4>
			<MultiSelect
				className="border-[#333333] bg-[#151515] text-white"
				options={courseDifficultyOptions}
				selectedValues={selectedDifficulties}
				setSelectedValues={values =>
					setSelectedDifficulties(values as CourseDifficulty[])
				}
				defaultValue={selectedDifficulties}
				placeholder="Select difficulties"
			/>
		</div>
	);
};

export default DifficultyFilter;
