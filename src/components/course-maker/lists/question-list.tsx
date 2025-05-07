'use client';

import { HelpCircle, BookOpen, Edit, Trash2 } from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import type { NewCourseLesson } from '@/db/schema/course-lesson';
import type { NewCourseLessonQuestion } from '@/db/schema/course-lesson-question';

type QuestionListProps = {
	courseLessons: NewCourseLesson[];
	courseLessonQuestionsState: [
		NewCourseLessonQuestion[],
		(questions: NewCourseLessonQuestion[]) => void
	];
};

export const QuestionList = ({
	courseLessons,
	courseLessonQuestionsState: [courseLessonQuestions, setCourseLessonQuestions]
}: QuestionListProps) => {
	// Get questions for a specific lesson
	const getQuestionsForLesson = (lessonId: string) =>
		courseLessonQuestions.filter(question => question.lessonId === lessonId);

	// Edit question
	const editQuestion = (id: string) => {
		// TODO: Implement edit question logic
		const question = courseLessonQuestions.find(q => q.id === id);
		if (!question) return;
		console.log('Edit question:', id);
	};

	// Delete question
	const deleteQuestion = (id: string) => {
		setCourseLessonQuestions(
			courseLessonQuestions.filter(question => question.id !== id)
		);
		console.log('Deleted question:', id);
	};

	return (
		<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
			<CardHeader>
				<CardTitle>Course Questions</CardTitle>
				<CardDescription className="text-[#ABABAB]">
					{courseLessonQuestions.length}{' '}
					{courseLessonQuestions.length === 1 ? 'question' : 'questions'} added
				</CardDescription>
			</CardHeader>
			<CardContent>
				{courseLessons.length > 0 ? (
					<Accordion type="multiple" className="w-full">
						{courseLessons.map(lesson => {
							const lessonQuestions = getQuestionsForLesson(lesson.id ?? -1);
							return (
								<AccordionItem
									key={lesson.id}
									value={lesson.id?.toString() ?? ''}
									className="border-[#2A2A2A]"
								>
									<AccordionTrigger className="py-3 text-white hover:text-white hover:no-underline">
										<div className="flex items-center">
											<BookOpen className="mr-2 h-4 w-4 text-[#FF5500]" />
											<span>{lesson.title}</span>
											<Badge className="ml-2 border border-[#2A2A2A] bg-[#1A1A1A] text-[#ABABAB]">
												{lessonQuestions.length}
											</Badge>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										{lessonQuestions.length > 0 ? (
											<div className="space-y-3 pl-6">
												{lessonQuestions.map((question, index) => (
													<div
														key={question.id}
														className="flex items-start rounded-lg border border-[#2A2A2A] bg-[#151515] p-3"
													>
														<div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#4BB4E6]/10 text-[#4BB4E6]">
															{index + 1}
														</div>
														<div className="flex-grow">
															<h4 className="font-medium text-white">
																{question.title}
															</h4>
															<div className="mt-1 flex items-center">
																<Badge className="border border-[#2A2A2A] bg-[#1A1A1A] text-[#ABABAB]">
																	{question.type === 'radio'
																		? 'Radio Selection'
																		: question.type === 'checkbox'
																			? 'Checkbox Selection'
																			: 'True/False'}
																</Badge>
																<span className="ml-2 text-xs text-[#ABABAB]">
																	{question.options.length} options
																</span>
															</div>
														</div>
														<div className="ml-2 flex-shrink-0">
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
																onClick={() =>
																	question.id !== undefined &&
																	editQuestion(question.id)
																}
															>
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
																onClick={() =>
																	question.id !== undefined &&
																	deleteQuestion(question.id)
																}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="py-2 pl-6 text-[#ABABAB]">
												No questions for this lesson yet
											</div>
										)}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				) : (
					<div className="py-8 text-center">
						<HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#2A2A2A]" />
						<h3 className="mb-1 text-lg font-medium text-white">
							No questions yet
						</h3>
						<p className="text-[#ABABAB]">
							Add lessons first, then create questions for each lesson
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
