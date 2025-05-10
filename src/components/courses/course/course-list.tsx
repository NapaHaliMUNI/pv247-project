import { Search } from 'lucide-react';

import { getAllCourses } from '@/db/queries/select';
import CourseListItem from '@/components/courses/course/course-list-item';
import ResetFiltersButton from '@/components/courses/filters/reset-filters-button';

const CourseList = async () => {
	const courses = await getAllCourses();

	return courses.length > 0 ? (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
			{courses.map(course => (
				<CourseListItem key={course.id} course={course} />
			))}
		</div>
	) : (
		<div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center">
			<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#151515]">
				<Search className="h-6 w-6 text-[#ABABAB]" />
			</div>
			<h3 className="mb-2 text-xl font-bold text-white">No courses found</h3>
			<p className="mb-6 text-[#ABABAB]">
				We couldn&#39;t find any courses matching your current filters.
			</p>
			<ResetFiltersButton className="max-w-xs" />
		</div>
	);
};

export default CourseList;
