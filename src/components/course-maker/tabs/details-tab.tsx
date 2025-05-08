'use client';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { NewCourse } from '@/db/schema/course';

import { CourseDetailsForm } from '../forms/details-form';
import { CoursePreviewCard } from '../cards/preview-card';

type CourseDetailsTabProps = {
	course: NewCourse;
	setCourse: (course: NewCourse) => void;
	nextStep: () => void;
};

export const CourseDetailsTab = ({
	course,
	setCourse,
	nextStep
}: CourseDetailsTabProps) => (
	<div>
		<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div className="md:col-span-2">
				<CourseDetailsForm courseState={[course, setCourse]} />
			</div>
			<div>
				<CoursePreviewCard course={course} />
			</div>
		</div>

		<div className="mt-8 flex justify-end">
			<Button
				className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
				onClick={nextStep}
				disabled={
					!course.title ||
					!course.shortDescription ||
					!course.difficulty ||
					!course.duration ||
					!course.category
				}
			>
				Next: Add Lessons
				<ChevronRight className="ml-2 h-4 w-4" />
			</Button>
		</div>
	</div>
);
