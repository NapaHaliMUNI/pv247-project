import { Button } from '@/components/ui/button';
import { getAllCoursesCount } from '@/db/queries/select';

export const CoursesPagination = async () => {
	const count = await getAllCoursesCount();

	return count > 10 ? (
		// TODO: put shadcn pagination here
		<div className="mt-8 flex items-center justify-center">
			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
					disabled
				>
					Previous
				</Button>
				<Button
					variant="outline"
					className="border-[#333333] bg-[#FF5500]/10 text-[#FF5500] hover:bg-[#FF5500]/20"
				>
					1
				</Button>
				<Button
					variant="outline"
					className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
				>
					2
				</Button>
				<Button
					variant="outline"
					className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
				>
					3
				</Button>
				<Button
					variant="outline"
					className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
				>
					Next
				</Button>
			</div>
		</div>
	) : null;
};
