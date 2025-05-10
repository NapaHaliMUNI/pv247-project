'use client';

import type React from 'react';

import { useFiltersContext } from '@/store/courses/filters-context';
import { MultiSelect } from '@/components/ui/multi-select';
import { type CourseDuration, courseDurationSchema } from '@/db/schema/course';

const courseDurationOptions = courseDurationSchema.options.map(duration => ({
	label: duration,
	value: duration
	// icon can be added here if needed
}));

const DurationFilter = () => {
	const { selectedDurations, setSelectedDurations } = useFiltersContext();
	return (
		<div>
			<h4 className="mb-2 text-sm font-medium">Duration</h4>
			<MultiSelect
				className="border-[#333333] bg-[#151515] text-white"
				options={courseDurationOptions}
				selectedValues={selectedDurations}
				setSelectedValues={values =>
					setSelectedDurations(values as CourseDuration[])
				}
				defaultValue={selectedDurations}
				placeholder="Select categories"
			/>
		</div>
	);
};

export default DurationFilter;
