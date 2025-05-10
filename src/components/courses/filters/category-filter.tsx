'use client';

import type React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useFiltersContext } from '@/store/courses/filters-context';
import {
	type CourseCategory,
	courseCategorySchema,
	type CourseDifficulty,
	courseDifficultySchema
} from '@/db/schema/course';
import { MultiSelect } from '@/components/ui/multi-select';

const courseCategoryOptions = courseCategorySchema.options.map(category => ({
	label: category,
	value: category
	// icon can be added here if needed
}));

const CategoryFilter = () => {
	const { selectedCategories, setSelectedCategories } = useFiltersContext();
	return (
		<div>
			<h4 className="mb-2 text-sm font-medium">Category</h4>
			<MultiSelect
				className="border-[#333333] bg-[#151515] text-white"
				options={courseCategoryOptions}
				selectedValues={selectedCategories}
				setSelectedValues={values =>
					setSelectedCategories(values as CourseCategory[])
				}
				defaultValue={selectedCategories}
				placeholder="Select categories"
			/>
		</div>
	);
};

export default CategoryFilter;
