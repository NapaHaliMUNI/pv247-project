'use client';

import { BarChart2, BookOpen, Clock, HelpCircle, Save } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

export const CourseSummary = () => {
	const {
		course,
		courseLessons,
		courseLessonQuestions,
		selectedPrerequisiteCourses,
		saveCourse
	} = useCourseMakerContext();

	return (
		<Card className="sticky top-4 border-[#2A2A2A] bg-[#1A1A1A] text-white">
			<CardHeader>
				<CardTitle>Course Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
						<div className="text-sm text-[#ABABAB]">Duration</div>
						<div className="mt-1 flex items-center">
							<Clock className="mr-2 h-4 w-4 text-[#FF5500]" />
							<div className="font-medium text-white">
								{course.duration ?? 'Not set'}
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
						<div className="text-sm text-[#ABABAB]">Difficulty</div>
						<div className="mt-1 flex items-center">
							<BarChart2 className="mr-2 h-4 w-4 text-[#FF5500]" />
							<div className="font-medium text-white">
								{course.difficulty ?? 'Not set'}
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
						<div className="text-sm text-[#ABABAB]">Lessons</div>
						<div className="mt-1 flex items-center">
							<BookOpen className="mr-2 h-4 w-4 text-[#FF5500]" />
							<div className="font-medium text-white">
								{courseLessons.length}
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
						<div className="text-sm text-[#ABABAB]">Questions</div>
						<div className="mt-1 flex items-center">
							<HelpCircle className="mr-2 h-4 w-4 text-[#FF5500]" />
							<div className="font-medium text-white">
								{courseLessonQuestions.length}
							</div>
						</div>
					</div>
				</div>

				<Separator className="border-[#2A2A2A]" />

				<div>
					<h4 className="mb-2 font-medium text-white">Course Status</h4>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm text-[#ABABAB]">Course details</span>
							<Badge className="bg-green-500/10 text-green-500">Complete</Badge>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-[#ABABAB]">Lessons</span>
							{courseLessons.length > 0 ? (
								<Badge className="bg-green-500/10 text-green-500">
									Complete
								</Badge>
							) : (
								<Badge className="bg-orange-500/10 text-orange-500">
									Required
								</Badge>
							)}
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-[#ABABAB]">Questions</span>
							{courseLessonQuestions.length > 0 ? (
								<Badge className="bg-green-500/10 text-green-500">
									Complete
								</Badge>
							) : (
								<Badge className="bg-[#2A2A2A] text-[#ABABAB]">Optional</Badge>
							)}
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-[#ABABAB]">Prerequisites</span>
							<Badge
								className={
									selectedPrerequisiteCourses.length > 0
										? 'bg-green-500/10 text-green-500'
										: 'bg-[#2A2A2A] text-[#ABABAB]'
								}
							>
								{selectedPrerequisiteCourses.length > 0
									? `${selectedPrerequisiteCourses.length} Selected`
									: 'Optional'}
							</Badge>
						</div>
					</div>
				</div>

				<div className="pt-4">
					<Button
						className="w-full bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
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
						<Save className="mr-2 h-4 w-4" />
						Save and Publish Course
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
