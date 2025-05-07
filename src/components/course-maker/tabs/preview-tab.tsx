'use client';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { NewCourse } from '@/db/schema/course';
import type { NewCourseLesson } from '@/db/schema/course-lesson';
import type { NewCourseLessonQuestion } from '@/db/schema/course-lesson-question';

import { CoursePreview } from '../preview/course-preview';
import { CourseSummary } from '../preview/course-summary';

type CoursePreviewTabProps = {
	course: NewCourse;
	courseLessons: NewCourseLesson[];
	courseLessonQuestions: NewCourseLessonQuestion[];
	prevStep: () => void;
	saveCourse: () => void;
	prerequisiteCourses: { id: string; title: string }[];
};

export const CoursePreviewTab = ({
	course,
	courseLessons,
	courseLessonQuestions,
	prevStep,
	saveCourse,
	prerequisiteCourses
}: CoursePreviewTabProps) => (
	<div>
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<CoursePreview
					course={course}
					courseLessons={courseLessons}
					courseLessonQuestions={courseLessonQuestions}
					prerequisiteCourses={prerequisiteCourses}
				/>
			</div>
			<div>
				<CourseSummary
					course={course}
					courseLessons={courseLessons}
					courseLessonQuestions={courseLessonQuestions}
					saveCourse={saveCourse}
				/>
			</div>
		</div>

		<div className="mt-8 flex justify-between">
			<Button
				variant="outline"
				className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
				onClick={prevStep}
			>
				<ChevronLeft className="mr-2 h-4 w-4" />
				Back to Questions
			</Button>
			<Button
				className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
				onClick={saveCourse}
				disabled={
					!course.title ||
					!course.shortDescription ||
					!course.difficulty ||
					!course.duration ||
					!course.category ||
					courseLessons.length === 0
				}
			>
				Save and Publish Course
			</Button>
		</div>
	</div>
);
