'use client';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

import { CourseDetailsForm } from '../forms/details-form';
import { CoursePreviewCard } from '../cards/preview-card';

export const CourseDetailsTab = () => {
	const { course, nextStep } = useCourseMakerContext();

	return (
		<div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div className="md:col-span-2">
					<CourseDetailsForm />
				</div>
				<div>
					<CoursePreviewCard />
				</div>
			</div>

			<div className="mt-8 flex justify-end">
				<Button
					className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
					onClick={nextStep}
					disabled={
						!course.title ||
						!course.shortDescription ||
						!course.longDescriptionHtml ||
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
};
