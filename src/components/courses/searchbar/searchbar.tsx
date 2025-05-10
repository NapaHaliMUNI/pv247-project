'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useFiltersContext } from '@/store/courses/filters-context';

const Searchbar = () => {
	const { searchQuery, setSearchQuery } = useFiltersContext();
	return (
		<div className="relative flex-grow">
			<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#ABABAB]" />
			<Input
				type="text"
				placeholder="Search courses..."
				className="border-[#333333] bg-[#1A1A1A] pl-10 text-white focus-visible:ring-[#FF5500]"
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default Searchbar;
