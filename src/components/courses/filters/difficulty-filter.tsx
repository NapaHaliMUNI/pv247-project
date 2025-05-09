import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { useFiltersContext } from '@/store/filters-context';

const DifficultyFilter = ({ difficulties }: { difficulties: string[] }) => {
	const { selectedDifficulty, setSelectedDifficulty } = useFiltersContext();
	return (
		<div>
			<h4 className="mb-2 text-sm font-medium">Difficulty</h4>
			<Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
				<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
					<SelectValue placeholder="Select difficulty" />
				</SelectTrigger>
				<SelectContent className="border-[#333333] bg-[#151515] text-white">
					{difficulties.map(difficulty => (
						<SelectItem key={difficulty} value={difficulty}>
							{difficulty}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default DifficultyFilter;
