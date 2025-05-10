'use client';

import { FileText, BookOpen, HelpCircle, Eye } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

import { CourseDetailsTab } from './tabs/details-tab';
import { CourseLessonsTab } from './tabs/lessons-tab';
import { CourseQuestionsTab } from './tabs/questions-tab';
import { CoursePreviewTab } from './tabs/preview-tab';

export const CourseMakerTabs = () => {
	const { activeTab, setActiveTab, currentStep, setCurrentStep } =
		useCourseMakerContext();

	return (
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
				<CourseDetailsTab />
			</TabsContent>

			<TabsContent value="lessons">
				<CourseLessonsTab />
			</TabsContent>

			<TabsContent value="questions">
				<CourseQuestionsTab />
			</TabsContent>

			<TabsContent value="preview">
				<CoursePreviewTab />
			</TabsContent>
		</Tabs>
	);
};
