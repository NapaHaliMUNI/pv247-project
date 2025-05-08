import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, HelpCircle, Video } from 'lucide-react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import type { Course, NewCourse } from '@/db/schema/course';
import type { NewCourseLesson } from '@/db/schema/course-lesson';
import type { NewCourseLessonQuestion } from '@/db/schema/course-lesson-question';

type CoursePreviewProps = {
	course: NewCourse;
	courseLessons: NewCourseLesson[];
	courseLessonQuestions: NewCourseLessonQuestion[];
	prerequisiteCourses: Course[];
};

export const CoursePreview = ({
	course,
	courseLessons,
	courseLessonQuestions,
	prerequisiteCourses
}: CoursePreviewProps) => {
	// Get questions for a specific lesson
	const getQuestionsForLesson = (lessonId: string) =>
		courseLessonQuestions.filter(question => question.lessonId === lessonId);

	return (
		<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>{course.title || 'Course Title'}</CardTitle>
						<CardDescription className="text-[#ABABAB]">
							{course.shortDescription || 'Course short description'}
						</CardDescription>
					</div>
					{course.difficulty && (
						<Badge
							className={` ${
								course.difficulty === 'Silver'
									? 'bg-green-500/10 text-green-500'
									: course.difficulty === 'Gold'
										? 'bg-blue-500/10 text-blue-500'
										: course.difficulty === 'Legendary Eagle'
											? 'bg-orange-500/10 text-orange-500'
											: 'bg-purple-500/10 text-purple-500'
							} `}
						>
							{course.difficulty}
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
					<Image
						src={
							course.imageUrl ??
							'https://placehold.co/600x400.png?text=Course+Image'
						}
						alt="Course preview"
						fill
						className="object-cover"
					/>
				</div>

				<div className="mb-6">
					<h3 className="mb-3 text-lg font-bold text-white">
						About this course
					</h3>
					<p className="text-[#ABABAB]">
						{course.longDescription ||
							'Detailed course description will appear here.'}
					</p>
				</div>

				{prerequisiteCourses.length > 0 && (
					<div className="mb-6 rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
						<div className="flex items-start">
							<ArrowRight className="mt-0.5 mr-3 h-5 w-5 text-[#FF5500]" />
							<div>
								<h4 className="font-medium text-white">Prerequisite Courses</h4>
								<p className="text-sm text-[#ABABAB]">
									It is recommended to complete the following courses first:
								</p>
								<div className="mt-2 space-y-1">
									{prerequisiteCourses.map(prereqCourse => (
										<Link
											key={prereqCourse.id}
											href={`/courses/${prereqCourse.id}`}
											className="block text-sm font-medium text-[#FF5500] hover:underline"
										>
											• {prereqCourse.title}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mb-6">
					<h3 className="mb-3 text-lg font-bold text-white">Course Content</h3>

					<Accordion type="single" collapsible className="w-full">
						{courseLessons.map((lesson, lessonIndex) => {
							const lessonQuestions = getQuestionsForLesson(lesson.id ?? -1);
							return (
								<AccordionItem
									key={lesson.id}
									value={lesson.id?.toString() ?? ''}
									className="border-[#2A2A2A]"
								>
									<AccordionTrigger className="py-4 text-white hover:text-white hover:no-underline">
										<div className="flex items-center">
											<Layers className="mr-2 h-5 w-5 text-[#FF5500]" />
											<span>
												Lesson {lessonIndex + 1}: {lesson.title}
											</span>
											{lesson.videoUrl && (
												<Badge className="ml-2 flex items-center gap-1 bg-[#4BB4E6]/10 text-[#4BB4E6]">
													<Video className="h-3 w-3" />
													Video
												</Badge>
											)}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 pl-7">
											{lesson.videoUrl ? (
												<LiteYouTubeEmbed
													id={lesson.videoUrl.split('v=')[1]}
													title="Lesson Video"
												/>
											) : null}
											<div className="py-2">
												<h4 className="mb-2 font-medium text-white">
													Lesson Content
												</h4>
												<p className="text-[#ABABAB]">
													{lesson.contentHtml.substring(0, 150)}...
												</p>
											</div>

											{lessonQuestions.length > 0 && (
												<div className="border-t border-[#2A2A2A] py-2">
													<h4 className="mb-2 flex items-center font-medium text-white">
														<HelpCircle className="mr-2 h-4 w-4 text-[#4BB4E6]" />
														Assessment Questions ({lessonQuestions.length})
													</h4>
													<div className="space-y-2">
														{lessonQuestions.map((question, index) => (
															<div key={question.id} className="py-2">
																<div className="flex items-center">
																	<div className="mr-3 flex-shrink-0 text-[#ABABAB]">
																		{index + 1}.
																	</div>
																	<div className="flex-grow">
																		<h5 className="font-medium text-white">
																			{question.title}
																		</h5>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											)}
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</CardContent>
		</Card>
	);
};
