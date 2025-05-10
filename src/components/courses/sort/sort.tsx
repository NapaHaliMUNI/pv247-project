'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useFiltersContext } from '@/store/courses/filters-context';
import { courseSortOptions } from '@/db/schema/course';

const Sort = () => {
	const { selectedSort, setSelectedSort } = useFiltersContext();
	return (
		<Select value={selectedSort} onValueChange={setSelectedSort}>
			<SelectTrigger className="w-full border-[#333333] bg-[#1A1A1A] text-white sm:w-[200px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent className="border-[#333333] bg-[#151515] text-white">
				{courseSortOptions.options.map(option => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default Sort;
