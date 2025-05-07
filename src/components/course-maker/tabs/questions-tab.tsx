'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { CourseLesson } from '@/db/schema/course-lesson';
import type { CourseLessonQuestion } from '@/db/schema/course-lesson-question';

import { QuestionList } from '../lists/question-list';
import { QuestionForm } from '../forms/question-form';

type CourseQuestionsTabProps = {
	courseLessons: CourseLesson[];
	courseLessonQuestionsState: [
		CourseLessonQuestion[],
		(questions: CourseLessonQuestion[]) => void
	];
	nextStep: () => void;
	prevStep: () => void;
};

export const CourseQuestionsTab = ({
	courseLessons,
	courseLessonQuestionsState: [courseLessonQuestions, setCourseLessonQuestions],
	nextStep,
	prevStep
}: CourseQuestionsTabProps) => (
	<div>
		<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div className="md:col-span-2">
				<QuestionForm
					courseLessons={courseLessons}
					courseLessonQuestionsState={[
						courseLessonQuestions,
						setCourseLessonQuestions
					]}
				/>
			</div>
			<div>
				<QuestionList
					courseLessons={courseLessons}
					courseLessonQuestionsState={[
						courseLessonQuestions,
						setCourseLessonQuestions
					]}
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
				Back to Lessons
			</Button>
			<Button
				className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
				onClick={nextStep}
			>
				Next: Preview Course
				<ChevronRight className="ml-2 h-4 w-4" />
			</Button>
		</div>
	</div>
);
