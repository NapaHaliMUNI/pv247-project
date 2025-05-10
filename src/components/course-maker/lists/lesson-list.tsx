'use client';

import { BookOpen, Edit, Trash2, Video } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

export const LessonList = () => {
	const { courseLessons, editLesson, deleteLesson } = useCourseMakerContext();

	return (
		<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
			<CardHeader>
				<CardTitle>Course Lessons</CardTitle>
				<CardDescription className="text-[#ABABAB]">
					{courseLessons.length}{' '}
					{courseLessons.length === 1 ? 'lesson' : 'lessons'} added
				</CardDescription>
			</CardHeader>
			<CardContent>
				{courseLessons.length > 0 ? (
					<div className="space-y-4">
						{courseLessons.map((lesson, index) => (
							<div
								key={lesson.id}
								className="flex items-start rounded-lg border border-[#2A2A2A] bg-[#151515] p-3"
							>
								<div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF5500]/10 text-[#FF5500]">
									{index + 1}
								</div>
								<div className="flex-grow">
									<h4 className="font-medium text-white">{lesson.title}</h4>
									<p className="mt-1 line-clamp-1 text-sm text-[#ABABAB]">
										{lesson.contentHtml.substring(0, 60)}...
									</p>
									{lesson.videoUrl ? (
										<Badge className="mt-2 flex w-fit items-center gap-1 bg-[#4BB4E6]/10 text-[#4BB4E6]">
											<Video className="h-3 w-3" />
											Video included
										</Badge>
									) : null}
								</div>
								<div className="ml-2 flex-shrink-0">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
										onClick={() =>
											lesson.id !== undefined && editLesson(lesson.id)
										}
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
										onClick={() =>
											lesson.id !== undefined && deleteLesson(lesson.id)
										}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="py-8 text-center">
						<BookOpen className="mx-auto mb-4 h-12 w-12 text-[#2A2A2A]" />
						<h3 className="mb-1 text-lg font-medium text-white">
							No lessons yet
						</h3>
						<p className="text-[#ABABAB]">
							Add your first lesson to get started
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
