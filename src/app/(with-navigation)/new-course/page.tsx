'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Trash2,
	Edit,
	Eye,
	Save,
	FileText,
	HelpCircle,
	Clock,
	BarChart2,
	BookOpen,
	ArrowRight,
	Layers
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Types
type QuestionType = 'radio' | 'checkbox' | 'true-false';

type Lesson = {
	id: string;
	title: string;
	content: string;
	order: number;
};

// 1. Update the Question interface to include lessonId
type Question = {
	id: string;
	title: string;
	type: QuestionType;
	lessonId: string; // Add this field to bind questions to lessons
	options: {
		id: string;
		text: string;
		isCorrect: boolean;
	}[];
	explanation: string;
	order: number;
};

type Course = {
	title: string;
	shortDescription: string;
	longDescription: string;
	duration: string;
	difficulty: string;
	prerequisite: string;
	category: string;
	image: string;
	lessons: Lesson[];
	questions: Question[];
};

// Sample prerequisite courses
const prerequisiteCourses = [
	{ id: '1', title: 'CS2 Fundamentals: From Beginner to Competitive' },
	{ id: '2', title: 'Advanced Weapon Mastery: Rifles' },
	{ id: '3', title: 'Pro Team Strategies: T-Side Executes' },
	{ id: '4', title: 'Map Mastery: Dust 2 Complete Guide' }
];

// Sample categories
const categories = [
	'Fundamentals',
	'Weapon Skills',
	'Team Tactics',
	'Maps',
	'Utility',
	'Strategy',
	'Advanced Skills'
];

// Difficulty levels
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

// Duration options
const durationOptions = ['1-2 hours', '3-5 hours', '6-10 hours', '10+ hours'];

const NewCoursePage = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('details');
	const [currentStep, setCurrentStep] = useState(1);

	// Course state
	const [course, setCourse] = useState<Course>({
		title: '',
		shortDescription: '',
		longDescription: '',
		duration: '',
		difficulty: '',
		prerequisite: '',
		category: '',
		image: 'https://placehold.co/600x400.png?text=Course+Image',
		lessons: [],
		questions: []
	});

	// Current lesson/question being edited
	const [currentLesson, setCurrentLesson] = useState<Lesson>({
		id: '',
		title: '',
		content: '',
		order: 0
	});

	// 2. Update the currentQuestion state initialization to include lessonId
	const [currentQuestion, setCurrentQuestion] = useState<Question>({
		id: '',
		title: '',
		type: 'radio',
		lessonId: '', // Initialize with empty lessonId
		options: [
			{ id: '1', text: '', isCorrect: false },
			{ id: '2', text: '', isCorrect: false }
		],
		explanation: '',
		order: 0
	});

	const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
	const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
		null
	);

	// Handle course details change
	const handleCourseChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCourse({
			...course,
			[name]: value
		});
	};

	// Handle select changes
	const handleSelectChange = (name: string, value: string) => {
		setCourse({
			...course,
			[name]: value
		});
	};

	// Handle lesson change
	const handleLessonChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCurrentLesson({
			...currentLesson,
			[name]: value
		});
	};

	// Handle question change
	const handleQuestionChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCurrentQuestion({
			...currentQuestion,
			[name]: value
		});
	};

	// Handle question type change
	const handleQuestionTypeChange = (type: QuestionType) => {
		setCurrentQuestion({
			...currentQuestion,
			type,
			options:
				type === 'true-false'
					? [
							{ id: '1', text: 'True', isCorrect: false },
							{ id: '2', text: 'False', isCorrect: false }
						]
					: currentQuestion.options
		});
	};

	// Handle option change
	const handleOptionChange = (id: string, text: string) => {
		setCurrentQuestion({
			...currentQuestion,
			options: currentQuestion.options.map(option =>
				option.id === id ? { ...option, text } : option
			)
		});
	};

	// Handle correct option change
	const handleCorrectOptionChange = (id: string) => {
		setCurrentQuestion({
			...currentQuestion,
			options: currentQuestion.options.map(option =>
				currentQuestion.type === 'radio' ||
				currentQuestion.type === 'true-false'
					? { ...option, isCorrect: option.id === id }
					: {
							...option,
							isCorrect: option.id === id ? !option.isCorrect : option.isCorrect
						}
			)
		});
	};

	// Add option
	const addOption = () => {
		if (currentQuestion.type === 'true-false') return;

		setCurrentQuestion({
			...currentQuestion,
			options: [
				...currentQuestion.options,
				{
					id: `${currentQuestion.options.length + 1}`,
					text: '',
					isCorrect: false
				}
			]
		});
	};

	// Remove option
	const removeOption = (id: string) => {
		if (currentQuestion.options.length <= 2) return;

		setCurrentQuestion({
			...currentQuestion,
			options: currentQuestion.options.filter(option => option.id !== id)
		});
	};

	// Add lesson
	const addLesson = () => {
		if (!currentLesson.title || !currentLesson.content) return;

		const newLesson = {
			...currentLesson,
			id: editingLessonId ?? `lesson-${Date.now()}`,
			order: editingLessonId
				? (course.lessons.find(l => l.id === editingLessonId)?.order ??
					course.lessons.length)
				: course.lessons.length
		};

		setCourse({
			...course,
			lessons: editingLessonId
				? course.lessons.map(lesson =>
						lesson.id === editingLessonId ? newLesson : lesson
					)
				: [...course.lessons, newLesson]
		});

		setCurrentLesson({
			id: '',
			title: '',
			content: '',
			order: 0
		});

		setEditingLessonId(null);
	};

	// 3. Update the addQuestion function to ensure it works correctly
	const addQuestion = () => {
		// Validate required fields
		if (
			!currentQuestion.title ||
			!currentQuestion.lessonId ||
			currentQuestion.options.some(opt => !opt.text)
		) {
			return;
		}

		// Validate at least one correct answer
		if (!currentQuestion.options.some(opt => opt.isCorrect)) {
			return;
		}

		const newQuestion = {
			...currentQuestion,
			id: editingQuestionId ?? `question-${Date.now()}`,
			order: editingQuestionId
				? (course.questions.find(q => q.id === editingQuestionId)?.order ??
					course.questions.length)
				: course.questions.length
		};

		setCourse({
			...course,
			questions: editingQuestionId
				? course.questions.map(question =>
						question.id === editingQuestionId ? newQuestion : question
					)
				: [...course.questions, newQuestion]
		});

		// Reset the current question state
		setCurrentQuestion({
			id: '',
			title: '',
			type: 'radio',
			lessonId: '', // Reset lessonId
			options: [
				{ id: '1', text: '', isCorrect: false },
				{ id: '2', text: '', isCorrect: false }
			],
			explanation: '',
			order: 0
		});

		setEditingQuestionId(null);
	};

	// 4. Update the editQuestion function to handle lessonId
	const editQuestion = (id: string) => {
		const question = course.questions.find(q => q.id === id);
		if (!question) return;

		setCurrentQuestion(question);
		setEditingQuestionId(id);
	};

	// Delete lesson
	const deleteLesson = (id: string) => {
		setCourse({
			...course,
			lessons: course.lessons.filter(lesson => lesson.id !== id)
		});
	};

	const editLesson = (id: string) => {
		const lesson = course.lessons.find(l => l.id === id);
		if (!lesson) return;

		setCurrentLesson(lesson);
		setEditingLessonId(id);
	};

	// Delete question
	const deleteQuestion = (id: string) => {
		setCourse({
			...course,
			questions: course.questions.filter(question => question.id !== id)
		});
	};

	// 5. Add a function to get questions for a specific lesson
	const getQuestionsForLesson = (lessonId: string) =>
		course.questions.filter(question => question.lessonId === lessonId);

	// Move to next step
	const nextStep = () => {
		if (currentStep === 1) {
			// Validate course details
			if (
				!course.title ||
				!course.shortDescription ||
				!course.difficulty ||
				!course.duration ||
				!course.category
			) {
				return;
			}
		}

		setCurrentStep(currentStep + 1);

		if (currentStep === 1) {
			setActiveTab('lessons');
		} else if (currentStep === 2) {
			setActiveTab('questions');
		}
	};

	// Move to previous step
	const prevStep = () => {
		setCurrentStep(currentStep - 1);

		if (currentStep === 3) {
			setActiveTab('lessons');
		} else if (currentStep === 2) {
			setActiveTab('details');
		}
	};

	// Save course
	const saveCourse = () => {
		// Here you would typically send the course data to your API
		console.log('Saving course:', course);

		// For demo purposes, just redirect to courses page
		router.push('/courses');
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6 flex items-center">
				<Link
					href="/courses"
					className="flex items-center text-[#ABABAB] transition-colors hover:text-white"
				>
					<ChevronLeft className="mr-1 h-4 w-4" />
					Back to Courses
				</Link>
				<h1 className="ml-auto text-2xl font-bold text-white">
					Create New Course
				</h1>
				<div className="ml-auto">
					<Button
						variant="outline"
						className="mr-2 border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
						onClick={() => router.push('/courses')}
					>
						Cancel
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
							course.lessons.length === 0
						}
					>
						<Save className="mr-2 h-4 w-4" />
						Save Course
					</Button>
				</div>
			</div>

			{/* Progress Steps */}
			<div className="mb-8">
				<div className="mx-auto flex max-w-3xl items-center justify-between">
					<div className="flex flex-col items-center">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-[#FF5500] text-white' : 'bg-[#2A2A2A] text-[#ABABAB]'}`}
						>
							1
						</div>
						<span
							className={`mt-2 text-sm ${currentStep >= 1 ? 'text-white' : 'text-[#ABABAB]'}`}
						>
							Course Details
						</span>
					</div>
					<div
						className={`mx-2 h-1 flex-1 ${currentStep >= 2 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
					/>
					<div className="flex flex-col items-center">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-[#FF5500] text-white' : 'bg-[#2A2A2A] text-[#ABABAB]'}`}
						>
							2
						</div>
						<span
							className={`mt-2 text-sm ${currentStep >= 2 ? 'text-white' : 'text-[#ABABAB]'}`}
						>
							Lessons
						</span>
					</div>
					<div
						className={`mx-2 h-1 flex-1 ${currentStep >= 3 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
					/>
					<div className="flex flex-col items-center">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? 'bg-[#FF5500] text-white' : 'bg-[#2A2A2A] text-[#ABABAB]'}`}
						>
							3
						</div>
						<span
							className={`mt-2 text-sm ${currentStep >= 3 ? 'text-white' : 'text-[#ABABAB]'}`}
						>
							Questions
						</span>
					</div>
					<div
						className={`mx-2 h-1 flex-1 ${currentStep >= 4 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
					/>
					<div className="flex flex-col items-center">
						<div
							className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 4 ? 'bg-[#FF5500] text-white' : 'bg-[#2A2A2A] text-[#ABABAB]'}`}
						>
							4
						</div>
						<span
							className={`mt-2 text-sm ${currentStep >= 4 ? 'text-white' : 'text-[#ABABAB]'}`}
						>
							Review
						</span>
					</div>
				</div>
			</div>

			{/* Course Creator Tabs */}
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

				{/* Course Details Tab */}
				<TabsContent value="details">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="md:col-span-2">
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>Course Information</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										Provide the basic information about your course
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="title">Course Title</Label>
										<Input
											id="title"
											name="title"
											placeholder="e.g. Advanced AWP Techniques"
											className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={course.title}
											onChange={handleCourseChange}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="shortDescription">Short Description</Label>
										<Input
											id="shortDescription"
											name="shortDescription"
											placeholder="Brief description (1-2 sentences)"
											className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={course.shortDescription}
											onChange={handleCourseChange}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="longDescription">
											Detailed Description
										</Label>
										<Textarea
											id="longDescription"
											name="longDescription"
											placeholder="Provide a detailed description of what students will learn"
											className="min-h-[150px] border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={course.longDescription}
											onChange={handleCourseChange}
										/>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="category">Category</Label>
											<Select
												value={course.category}
												onValueChange={value =>
													handleSelectChange('category', value)
												}
											>
												<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
												<SelectContent className="border-[#333333] bg-[#151515] text-white">
													{categories.map(category => (
														<SelectItem key={category} value={category}>
															{category}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor="difficulty">Difficulty Level</Label>
											<Select
												value={course.difficulty}
												onValueChange={value =>
													handleSelectChange('difficulty', value)
												}
											>
												<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
													<SelectValue placeholder="Select difficulty" />
												</SelectTrigger>
												<SelectContent className="border-[#333333] bg-[#151515] text-white">
													{difficultyLevels.map(level => (
														<SelectItem key={level} value={level}>
															{level}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="duration">Estimated Duration</Label>
											<Select
												value={course.duration}
												onValueChange={value =>
													handleSelectChange('duration', value)
												}
											>
												<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
													<SelectValue placeholder="Select duration" />
												</SelectTrigger>
												<SelectContent className="border-[#333333] bg-[#151515] text-white">
													{durationOptions.map(option => (
														<SelectItem key={option} value={option}>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor="prerequisite">
												Prerequisite Course (Optional)
											</Label>
											<Select
												value={course.prerequisite}
												onValueChange={value =>
													handleSelectChange('prerequisite', value)
												}
											>
												<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
													<SelectValue placeholder="None" />
												</SelectTrigger>
												<SelectContent className="border-[#333333] bg-[#151515] text-white">
													<SelectItem value="none">None</SelectItem>
													{prerequisiteCourses.map(course => (
														<SelectItem key={course.id} value={course.id}>
															{course.title}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>Course Preview</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										How your course will appear in listings
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#151515]">
										<div className="relative aspect-video">
											<Image
												src={course.image || '/placeholder.svg'}
												alt="Course preview"
												fill
												className="object-cover"
											/>
											{course.difficulty && (
												<div className="absolute top-3 left-3">
													<Badge
														className={` ${
															course.difficulty === 'Beginner'
																? 'bg-green-500/10 text-green-500'
																: course.difficulty === 'Intermediate'
																	? 'bg-blue-500/10 text-blue-500'
																	: course.difficulty === 'Advanced'
																		? 'bg-orange-500/10 text-orange-500'
																		: 'bg-purple-500/10 text-purple-500'
														} `}
													>
														{course.difficulty}
													</Badge>
												</div>
											)}
										</div>

										<div className="p-4">
											<h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">
												{course.title || 'Course Title'}
											</h3>
											<p className="mb-4 line-clamp-2 text-sm text-[#ABABAB]">
												{course.shortDescription ||
													'Course short description will appear here'}
											</p>

											{(course.duration || course.category) && (
												<div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
													{course.duration && (
														<div className="flex items-center gap-1">
															<Clock className="h-4 w-4 text-[#ABABAB]" />
															<span className="text-sm text-[#ABABAB]">
																{course.duration}
															</span>
														</div>
													)}
													{course.category && (
														<div className="flex items-center gap-1">
															<BarChart2 className="h-4 w-4 text-[#ABABAB]" />
															<span className="text-sm text-[#ABABAB]">
																{course.category}
															</span>
														</div>
													)}
												</div>
											)}
										</div>
									</div>

									<div className="mt-6">
										<Button
											variant="outline"
											className="w-full border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
										>
											Upload Course Image
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="mt-8 flex justify-end">
						<Button
							className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
							onClick={nextStep}
							disabled={
								!course.title ||
								!course.shortDescription ||
								!course.difficulty ||
								!course.duration ||
								!course.category
							}
						>
							Next: Add Lessons
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</TabsContent>

				{/* Lessons Tab */}
				<TabsContent value="lessons">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="md:col-span-2">
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>
										{editingLessonId ? 'Edit Lesson' : 'Add New Lesson'}
									</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										Create lessons with theory content for your course
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="lessonTitle">Lesson Title</Label>
										<Input
											id="lessonTitle"
											name="title"
											placeholder="e.g. Understanding Spray Patterns"
											className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={currentLesson.title}
											onChange={handleLessonChange}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="lessonContent">Lesson Content</Label>
										<Textarea
											id="lessonContent"
											name="content"
											placeholder="Provide the theory content for this lesson"
											className="min-h-[300px] border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={currentLesson.content}
											onChange={handleLessonChange}
										/>
									</div>

									<div className="flex justify-end">
										{editingLessonId ? (
											<>
												<Button
													variant="outline"
													className="mr-2 border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
													onClick={() => {
														setCurrentLesson({
															id: '',
															title: '',
															content: '',
															order: 0
														});
														setEditingLessonId(null);
													}}
												>
													Cancel
												</Button>
												<Button
													className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
													onClick={addLesson}
													disabled={
														!currentLesson.title || !currentLesson.content
													}
												>
													Update Lesson
												</Button>
											</>
										) : (
											<Button
												className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
												onClick={addLesson}
												disabled={
													!currentLesson.title || !currentLesson.content
												}
											>
												<Plus className="mr-2 h-4 w-4" />
												Add Lesson
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>Course Lessons</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										{course.lessons.length}{' '}
										{course.lessons.length === 1 ? 'lesson' : 'lessons'} added
									</CardDescription>
								</CardHeader>
								<CardContent>
									{course.lessons.length > 0 ? (
										<div className="space-y-4">
											{course.lessons.map((lesson, index) => (
												<div
													key={lesson.id}
													className="flex items-start rounded-lg border border-[#2A2A2A] bg-[#151515] p-3"
												>
													<div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF5500]/10 text-[#FF5500]">
														{index + 1}
													</div>
													<div className="flex-grow">
														<h4 className="font-medium text-white">
															{lesson.title}
														</h4>
														<p className="mt-1 line-clamp-1 text-sm text-[#ABABAB]">
															{lesson.content.substring(0, 60)}...
														</p>
													</div>
													<div className="ml-2 flex-shrink-0">
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
															onClick={() => editLesson(lesson.id)}
														>
															<Edit className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
															onClick={() => deleteLesson(lesson.id)}
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
							disabled={course.lessons.length === 0}
						>
							Next: Add Questions
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</TabsContent>

				{/* Questions Tab */}

				<TabsContent value="questions">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="md:col-span-2">
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>
										{editingQuestionId ? 'Edit Question' : 'Add New Question'}
									</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										Create assessment questions to test knowledge
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									{/* Lesson Selection */}
									<div className="space-y-2">
										<Label htmlFor="lessonSelect">Select Lesson</Label>
										<Select
											value={currentQuestion.lessonId}
											onValueChange={value =>
												setCurrentQuestion({
													...currentQuestion,
													lessonId: value
												})
											}
										>
											<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
												<SelectValue placeholder="Choose a lesson" />
											</SelectTrigger>
											<SelectContent className="border-[#333333] bg-[#151515] text-white">
												{course.lessons.map(lesson => (
													<SelectItem key={lesson.id} value={lesson.id}>
														{lesson.title}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="questionTitle">Question</Label>
										<Input
											id="questionTitle"
											name="title"
											placeholder="e.g. What is the correct spray pattern for AK-47?"
											className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={currentQuestion.title}
											onChange={handleQuestionChange}
										/>
									</div>

									<div className="space-y-2">
										<Label>Question Type</Label>
										<div className="flex flex-wrap gap-3">
											<Button
												type="button"
												variant={
													currentQuestion.type === 'radio'
														? 'default'
														: 'outline'
												}
												className={
													currentQuestion.type === 'radio'
														? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
														: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
												}
												onClick={() => handleQuestionTypeChange('radio')}
											>
												Radio Selection
											</Button>
											<Button
												type="button"
												variant={
													currentQuestion.type === 'checkbox'
														? 'default'
														: 'outline'
												}
												className={
													currentQuestion.type === 'checkbox'
														? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
														: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
												}
												onClick={() => handleQuestionTypeChange('checkbox')}
											>
												Checkbox Selection
											</Button>
											<Button
												type="button"
												variant={
													currentQuestion.type === 'true-false'
														? 'default'
														: 'outline'
												}
												className={
													currentQuestion.type === 'true-false'
														? 'bg-[#FF5500] text-white hover:bg-[#FF5500]/90'
														: 'border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]'
												}
												onClick={() => handleQuestionTypeChange('true-false')}
											>
												True/False
											</Button>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<Label>Answer Options</Label>
											{currentQuestion.type !== 'true-false' && (
												<Button
													type="button"
													variant="outline"
													size="sm"
													className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
													onClick={addOption}
												>
													<Plus className="mr-1 h-3 w-3" />
													Add Option
												</Button>
											)}
										</div>

										<div className="space-y-3">
											{currentQuestion.options.map((option, index) => (
												<div
													key={option.id}
													className="flex items-center gap-3"
												>
													{currentQuestion.type === 'radio' ||
													currentQuestion.type === 'true-false' ? (
														<RadioGroup
															value={
																currentQuestion.options.find(o => o.isCorrect)
																	?.id ?? ''
															}
														>
															<div className="flex items-center space-x-2">
																<RadioGroupItem
																	value={option.id}
																	id={`option-${option.id}`}
																	onClick={() =>
																		handleCorrectOptionChange(option.id)
																	}
																/>
															</div>
														</RadioGroup>
													) : (
														<Checkbox
															id={`option-${option.id}`}
															checked={option.isCorrect}
															onCheckedChange={() =>
																handleCorrectOptionChange(option.id)
															}
														/>
													)}

													<div className="flex-grow">
														<Input
															placeholder={`Option ${index + 1}`}
															className="border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
															value={option.text}
															onChange={e =>
																handleOptionChange(option.id, e.target.value)
															}
															readOnly={currentQuestion.type === 'true-false'}
														/>
													</div>

													{currentQuestion.type !== 'true-false' &&
														currentQuestion.options.length > 2 && (
															<Button
																type="button"
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-[#ABABAB] hover:bg-[#1F1F1F] hover:text-white"
																onClick={() => removeOption(option.id)}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														)}
												</div>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="explanation">Explanation (Optional)</Label>
										<Textarea
											id="explanation"
											name="explanation"
											placeholder="Provide an explanation for the correct answer"
											className="min-h-[100px] border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
											value={currentQuestion.explanation}
											onChange={handleQuestionChange}
										/>
									</div>

									<div className="flex justify-end">
										{editingQuestionId ? (
											<>
												<Button
													variant="outline"
													className="mr-2 border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
													onClick={() => {
														setCurrentQuestion({
															id: '',
															title: '',
															type: 'radio',
															lessonId: '',
															options: [
																{ id: '1', text: '', isCorrect: false },
																{ id: '2', text: '', isCorrect: false }
															],
															explanation: '',
															order: 0
														});
														setEditingQuestionId(null);
													}}
												>
													Cancel
												</Button>
												<Button
													className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
													onClick={addQuestion}
													disabled={
														!currentQuestion.title ||
														!currentQuestion.lessonId ||
														currentQuestion.options.some(opt => !opt.text) ||
														!currentQuestion.options.some(opt => opt.isCorrect)
													}
												>
													Update Question
												</Button>
											</>
										) : (
											<Button
												className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
												onClick={addQuestion}
												disabled={
													!currentQuestion.title ||
													!currentQuestion.lessonId ||
													currentQuestion.options.some(opt => !opt.text) ||
													!currentQuestion.options.some(opt => opt.isCorrect)
												}
											>
												<Plus className="mr-2 h-4 w-4" />
												Add Question
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="border-[#2A2A2A] bg-[#1A1A1A] text-white">
								<CardHeader>
									<CardTitle>Course Questions</CardTitle>
									<CardDescription className="text-[#ABABAB]">
										{course.questions.length}{' '}
										{course.questions.length === 1 ? 'question' : 'questions'}{' '}
										added
									</CardDescription>
								</CardHeader>
								<CardContent>
									{course.lessons.length > 0 ? (
										<Accordion type="multiple" className="w-full">
											{course.lessons.map(lesson => {
												const lessonQuestions = getQuestionsForLesson(
													lesson.id
												);
												return (
													<AccordionItem
														key={lesson.id}
														value={lesson.id}
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
				</TabsContent>

				{/* Preview Tab */}
				<TabsContent value="preview">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						<div className="lg:col-span-2">
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
													course.difficulty === 'Beginner'
														? 'bg-green-500/10 text-green-500'
														: course.difficulty === 'Intermediate'
															? 'bg-blue-500/10 text-blue-500'
															: course.difficulty === 'Advanced'
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
											src={course.image || '/placeholder.svg'}
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

									{course.prerequisite && (
										<div className="mb-6 rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
											<div className="flex items-start">
												<ArrowRight className="mt-0.5 mr-3 h-5 w-5 text-[#FF5500]" />
												<div>
													<h4 className="font-medium text-white">
														Prerequisite Course
													</h4>
													<p className="text-sm text-[#ABABAB]">
														It is recommended to complete the following course
														first:
													</p>
													<Link
														href={`/courses/${course.prerequisite}`}
														className="mt-1 inline-block text-sm font-medium text-[#FF5500] hover:underline"
													>
														{
															prerequisiteCourses.find(
																c => c.id === course.prerequisite
															)?.title
														}
													</Link>
												</div>
											</div>
										</div>
									)}

									<div className="mb-6">
										<h3 className="mb-3 text-lg font-bold text-white">
											Course Content
										</h3>

										<Accordion type="single" collapsible className="w-full">
											{course.lessons.map((lesson, lessonIndex) => {
												const lessonQuestions = getQuestionsForLesson(
													lesson.id
												);
												return (
													<AccordionItem
														key={lesson.id}
														value={lesson.id}
														className="border-[#2A2A2A]"
													>
														<AccordionTrigger className="py-4 text-white hover:text-white hover:no-underline">
															<div className="flex items-center">
																<Layers className="mr-2 h-5 w-5 text-[#FF5500]" />
																<span>
																	Lesson {lessonIndex + 1}: {lesson.title}
																</span>
															</div>
														</AccordionTrigger>
														<AccordionContent>
															<div className="space-y-4 pl-7">
																<div className="py-2">
																	<h4 className="mb-2 font-medium text-white">
																		Lesson Content
																	</h4>
																	<p className="text-[#ABABAB]">
																		{lesson.content.substring(0, 150)}...
																	</p>
																</div>

																{lessonQuestions.length > 0 && (
																	<div className="border-t border-[#2A2A2A] py-2">
																		<h4 className="mb-2 flex items-center font-medium text-white">
																			<HelpCircle className="mr-2 h-4 w-4 text-[#4BB4E6]" />
																			Assessment Questions (
																			{lessonQuestions.length})
																		</h4>
																		<div className="space-y-2">
																			{lessonQuestions.map(
																				(question, index) => (
																					<div
																						key={question.id}
																						className="py-2"
																					>
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
																				)
																			)}
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
						</div>

						<div>
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
													{course.duration || 'Not set'}
												</div>
											</div>
										</div>

										<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
											<div className="text-sm text-[#ABABAB]">Difficulty</div>
											<div className="mt-1 flex items-center">
												<BarChart2 className="mr-2 h-4 w-4 text-[#FF5500]" />
												<div className="font-medium text-white">
													{course.difficulty || 'Not set'}
												</div>
											</div>
										</div>

										<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
											<div className="text-sm text-[#ABABAB]">Lessons</div>
											<div className="mt-1 flex items-center">
												<BookOpen className="mr-2 h-4 w-4 text-[#FF5500]" />
												<div className="font-medium text-white">
													{course.lessons.length}
												</div>
											</div>
										</div>

										<div className="rounded-lg border border-[#2A2A2A] bg-[#151515] p-4">
											<div className="text-sm text-[#ABABAB]">Questions</div>
											<div className="mt-1 flex items-center">
												<HelpCircle className="mr-2 h-4 w-4 text-[#FF5500]" />
												<div className="font-medium text-white">
													{course.questions.length}
												</div>
											</div>
										</div>
									</div>

									<Separator className="border-[#2A2A2A]" />

									<div>
										<h4 className="mb-2 font-medium text-white">
											Course Status
										</h4>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm text-[#ABABAB]">
													Course details
												</span>
												<Badge className="bg-green-500/10 text-green-500">
													Complete
												</Badge>
											</div>

											<div className="flex items-center justify-between">
												<span className="text-sm text-[#ABABAB]">Lessons</span>
												{course.lessons.length > 0 ? (
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
												<span className="text-sm text-[#ABABAB]">
													Questions
												</span>
												{course.questions.length > 0 ? (
													<Badge className="bg-green-500/10 text-green-500">
														Complete
													</Badge>
												) : (
													<Badge className="bg-[#2A2A2A] text-[#ABABAB]">
														Optional
													</Badge>
												)}
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
												course.lessons.length === 0
											}
										>
											<Save className="mr-2 h-4 w-4" />
											Save and Publish Course
										</Button>
									</div>
								</CardContent>
							</Card>
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
								course.lessons.length === 0
							}
						>
							Save and Publish Course
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default NewCoursePage;
