'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

import { LessonForm } from '../forms/lesson-form';
import { LessonList } from '../lists/lesson-list';

export const CourseLessonsTab = () => {
	const { courseLessons, nextStep, prevStep } = useCourseMakerContext();

	return (
		<div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div className="md:col-span-2">
					<LessonForm />
				</div>
				<div>
					<LessonList />
				</div>
			</div>

			<div className="mt-8 flex justify-between">
				<Button
					variant="outline"
					className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
					onClick={prevStep}
				>
					<ChevronLeft className="mr-2 h-4 w-4" />
					Back to Details
				</Button>
				<Button
					className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
					onClick={nextStep}
					disabled={courseLessons.length === 0}
				>
					Next: Add Questions
					<ChevronRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
