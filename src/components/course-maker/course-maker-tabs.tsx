'use client';

import { FileText, BookOpen, HelpCircle, Eye } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Course } from '@/db/schema/course';
import type { CourseLesson } from '@/db/schema/course-lesson';
import type { CourseLessonQuestion } from '@/db/schema/course-lesson-question';

import { CourseDetailsTab } from './tabs/details-tab';
import { CourseLessonsTab } from './tabs/lessons-tab';
import { CourseQuestionsTab } from './tabs/questions-tab';
import { CoursePreviewTab } from './tabs/preview-tab';

type CourseCreatorTabsProps = {
	activeTabState: [string, (tab: string) => void];
	currentStepState: [number, (step: number) => void];
	courseState: [Course, (course: Course) => void];
	courseLessonsState: [CourseLesson[], (lessons: CourseLesson[]) => void];
	courseLessonQuestionsState: [
		CourseLessonQuestion[],
		(questions: CourseLessonQuestion[]) => void
	];
	nextStep: () => void;
	prevStep: () => void;
	saveCourse: () => void;
};

export const CourseCreatorTabs = ({
	activeTabState: [activeTab, setActiveTab],
	currentStepState: [currentStep, setCurrentStep],
	courseState: [course, setCourse],
	courseLessonsState: [courseLessons, setCourseLessons],
	courseLessonQuestionsState: [courseLessonQuestions, setCourseLessonQuestions],
	nextStep,
	prevStep,
	saveCourse
}: CourseCreatorTabsProps) => (
	<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
		<TabsList className="mb-6 grid w-full grid-cols-4 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A]">
			<TabsTrigger
				value="details"
				className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white"
				onClick={() => setCurrentStep(1)}
			>
				<FileText className="mr-2 h-4 w-4" />
				Course Details
			</TabsTrigger>
			<TabsTrigger
				value="lessons"
				className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white"
				onClick={() => setCurrentStep(2)}
				disabled={currentStep < 2}
			>
				<BookOpen className="mr-2 h-4 w-4" />
				Lessons
			</TabsTrigger>
			<TabsTrigger
				value="questions"
				className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white"
				onClick={() => setCurrentStep(3)}
				disabled={currentStep < 3}
			>
				<HelpCircle className="mr-2 h-4 w-4" />
				Questions
			</TabsTrigger>
			<TabsTrigger
				value="preview"
				className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white"
				onClick={() => setCurrentStep(4)}
				disabled={currentStep < 4}
			>
				<Eye className="mr-2 h-4 w-4" />
				Preview
			</TabsTrigger>
		</TabsList>

		<TabsContent value="details">
			<CourseDetailsTab
				course={course}
				setCourse={setCourse}
				nextStep={nextStep}
			/>
		</TabsContent>

		<TabsContent value="lessons">
			<CourseLessonsTab
				course={course}
				courseLessonsState={[courseLessons, setCourseLessons]}
				nextStep={nextStep}
				prevStep={prevStep}
			/>
		</TabsContent>

		<TabsContent value="questions">
			<CourseQuestionsTab
				courseLessons={courseLessons}
				courseLessonQuestionsState={[
					courseLessonQuestions,
					setCourseLessonQuestions
				]}
				nextStep={nextStep}
				prevStep={prevStep}
			/>
		</TabsContent>

		<TabsContent value="preview">
			<CoursePreviewTab
				course={course}
				courseLessons={courseLessons}
				courseLessonQuestions={courseLessonQuestions}
				prevStep={prevStep}
				saveCourse={saveCourse}
				prerequisiteCourses={prerequisiteCourses}
			/>
		</TabsContent>
	</Tabs>
);

// Sample prerequisite courses
const prerequisiteCourses = [
	{ id: 1, title: 'CS2 Fundamentals: From Beginner to Competitive' },
	{ id: 2, title: 'Advanced Weapon Mastery: Rifles' },
	{ id: 3, title: 'Pro Team Strategies: T-Side Executes' },
	{ id: 4, title: 'Map Mastery: Dust 2 Complete Guide' }
];
