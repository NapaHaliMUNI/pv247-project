import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useFiltersContext } from '@/store/filters-context';

const CategoryFilter = ({ categories }: { categories: string[] }) => {
	const { selectedCategory, setSelectedCategory } = useFiltersContext();
	return (
		<div>
			<h4 className="mb-2 text-sm font-medium">Category</h4>
			<Select value={selectedCategory} onValueChange={setSelectedCategory}>
				<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
					<SelectValue placeholder="Select category" />
				</SelectTrigger>
				<SelectContent className="border-[#333333] bg-[#151515] text-white">
					{categories.map(category => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default CategoryFilter;
