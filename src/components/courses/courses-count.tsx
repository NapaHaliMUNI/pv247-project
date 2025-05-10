import { getAllCoursesCount } from '@/db/queries/select';

export const CoursesCount = async () => {
	const coursesCount = await getAllCoursesCount();

	return (
		<div className="mb-6">
			<p className="text-[#ABABAB]">
				Showing <span className="font-medium text-white">{coursesCount}</span>{' '}
				courses
			</p>
		</div>
	);
};
