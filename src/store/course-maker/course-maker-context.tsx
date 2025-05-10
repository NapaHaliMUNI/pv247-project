import {
	createContext,
	type Dispatch,
	type ReactNode,
	useCallback,
	useContext,
	useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { NewCourse } from '@/db/schema/course';
import type { NewCourseLesson } from '@/db/schema/course-lesson';
import type {
	CourseLessonQuestion,
	NewCourseLessonQuestion
} from '@/db/schema/course-lesson-question';

type CourseMakerContextType = {
	// Current step and tab state
	currentStep: number;
	setCurrentStep: Dispatch<React.SetStateAction<number>>;
	activeTab: string;
	setActiveTab: Dispatch<React.SetStateAction<string>>;

	// ----------------------------------------------------------------------

	// Course state
	course: NewCourse;
	setCourse: Dispatch<React.SetStateAction<NewCourse>>;
	selectedPrerequisiteCourses: string[];
	setSelectedPrerequisiteCourses: Dispatch<React.SetStateAction<string[]>>;

	// Course actions
	handleCourseChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleSelectChange: (name: string, value: string) => void;

	// ----------------------------------------------------------------------

	// Course lessons state
	courseLessons: NewCourseLesson[];
	setCourseLessons: Dispatch<React.SetStateAction<NewCourseLesson[]>>;

	// Current lesson state
	currentLesson: NewCourseLesson | null;
	setCurrentLesson: Dispatch<React.SetStateAction<NewCourseLesson>>;
	editingLessonId: string | null;
	setEditingLessonId: Dispatch<React.SetStateAction<string | null>>;

	// Course lesson actions
	handleLessonChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	addLesson: () => void;
	editLesson: (id: string) => void;
	deleteLesson: (id: string) => void;

	// ----------------------------------------------------------------------

	// Course lesson questions state
	courseLessonQuestions: NewCourseLessonQuestion[];
	setCourseLessonQuestions: Dispatch<
		React.SetStateAction<NewCourseLessonQuestion[]>
	>;

	// Current question state
	currentQuestion: NewCourseLessonQuestion | null;
	setCurrentQuestion: Dispatch<React.SetStateAction<NewCourseLessonQuestion>>;
	editingQuestionId: string | null;
	setEditingQuestionId: Dispatch<React.SetStateAction<string | null>>;

	// Course lesson question actions
	handleQuestionChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleQuestionTypeChange: (type: NewCourseLessonQuestion['type']) => void;
	handleOptionChange: (id: string, text: string) => void;
	handleCorrectOptionChange: (id: string) => void;
	addOption: () => void;
	removeOption: (id: string) => void;
	addQuestion: () => void;
	editQuestion: (id: string) => void;
	deleteQuestion: (id: string) => void;
	getQuestionsForLesson: (lessonId: string) => CourseLessonQuestion[];

	// ----------------------------------------------------------------------

	// Navigation functions
	nextStep: () => void;
	prevStep: () => void;

	// Course actions
	saveCourse: () => void;
	resetCourse: () => void;
};

const CourseMakerContext = createContext<CourseMakerContextType | null>(null);

export const useCourseMakerContext = () => {
	const context = useContext(CourseMakerContext);

	if (!context) {
		throw new Error(
			'useCourseMakerContext must be used within a CourseMakerProvider'
		);
	}

	return context;
};

// Initial empty course state
const initialCourse: NewCourse = {
	id: uuidv4(),
	title: '',
	shortDescription: '',
	longDescriptionHtml: '',
	duration: null,
	difficulty: null,
	category: null,
	imageUrl: 'https://placehold.co/600x400.png?text=Course+Image'
};

// Initial empty lesson state
const initialLesson: NewCourseLesson = {
	id: uuidv4(),
	courseId: initialCourse.id,
	title: '',
	contentHtml: '',
	lessonOrder: 0
};

// Initial empty question state
const initialQuestion: NewCourseLessonQuestion = {
	id: uuidv4(),
	lessonId: initialLesson.id,
	title: '',
	type: 'radio',
	options: [
		{ id: uuidv4(), text: '', isCorrect: false },
		{ id: uuidv4(), text: '', isCorrect: false }
	],
	questionOrder: 0
};

export const CourseMakerProvider = ({
	children,
	onSave
}: {
	children: ReactNode;
	onSave?: (
		course: NewCourse,
		courseLessons: NewCourseLesson[],
		courseQuestions: NewCourseLessonQuestion[],
		coursePrerequisites: string[]
	) => void;
}) => {
	// Current step and tab state
	const [currentStep, setCurrentStep] = useState(1);
	const [activeTab, setActiveTab] = useState('details');

	// Course state
	const [course, setCourse] = useState<NewCourse>(initialCourse);

	const [selectedPrerequisiteCourses, setSelectedPrerequisiteCourses] =
		useState<string[]>([]);

	// Course lessons state
	const [courseLessons, setCourseLessons] = useState<NewCourseLesson[]>([]);
	const [currentLesson, setCurrentLesson] =
		useState<NewCourseLesson>(initialLesson);
	const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

	// Course lesson questions state
	const [courseLessonQuestions, setCourseLessonQuestions] = useState<
		NewCourseLessonQuestion[]
	>([]);
	const [currentQuestion, setCurrentQuestion] =
		useState<NewCourseLessonQuestion>(initialQuestion);
	const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
		null
	);

	// Handle course change
	const handleCourseChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setCourse(prev => ({
				...prev,
				[name]: value
			}));
		},
		[]
	);

	// Handle select changes
	const handleSelectChange = useCallback((name: string, value: string) => {
		setCourse(prev => ({
			...prev,
			[name]: value
		}));
	}, []);

	// Handle lesson change
	const handleLessonChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setCurrentLesson(prev => ({
				...prev,
				[name]: value
			}));
		},
		[]
	);

	// Add or update lesson
	const addLesson = useCallback(() => {
		if (!currentLesson.title || !currentLesson.contentHtml) return;

		const newLesson = {
			...currentLesson,
			id: editingLessonId ?? uuidv4(),
			lessonOrder: editingLessonId
				? (courseLessons.find(l => l.id === editingLessonId)?.lessonOrder ??
					courseLessons.length)
				: courseLessons.length
		};

		const updatedLessons = editingLessonId
			? courseLessons.map(lesson =>
					lesson.id === editingLessonId ? newLesson : lesson
				)
			: [...courseLessons, newLesson];

		setCourseLessons(updatedLessons);
		setCurrentLesson(initialLesson);
		setEditingLessonId(null);
	}, [courseLessons, currentLesson, editingLessonId]);

	// Edit lesson
	const editLesson = useCallback(
		(id: string) => {
			const lesson = courseLessons.find(l => l.id === id);
			if (!lesson) return;

			setCurrentLesson(lesson);
			setEditingLessonId(id);
		},
		[courseLessons]
	);

	// Delete lesson
	const deleteLesson = useCallback((id: string) => {
		setCourseLessons(prevLessons =>
			prevLessons.filter(lesson => lesson.id !== id)
		);
	}, []);

	// Handle question change
	const handleQuestionChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setCurrentQuestion(prev => ({
				...prev,
				[name]: value
			}));
		},
		[]
	);

	// Handle question type change
	const handleQuestionTypeChange = useCallback(
		(type: NewCourseLessonQuestion['type']) => {
			setCurrentQuestion(prev => ({
				...prev,
				type,
				options:
					type === 'true-false'
						? [
								{ id: uuidv4(), text: 'True', isCorrect: false },
								{ id: uuidv4(), text: 'False', isCorrect: false }
							]
						: prev.options
			}));
		},
		[]
	);

	// Handle option change
	const handleOptionChange = useCallback((id: string, text: string) => {
		setCurrentQuestion(prev => ({
			...prev,
			options: prev.options.map(option =>
				option.id === id ? { ...option, text } : option
			)
		}));
	}, []);

	// Handle correct option change
	const handleCorrectOptionChange = useCallback((id: string) => {
		setCurrentQuestion(prev => ({
			...prev,
			options: prev.options.map(option =>
				prev.type === 'radio' || prev.type === 'true-false'
					? { ...option, isCorrect: option.id === id }
					: {
							...option,
							isCorrect: option.id === id ? !option.isCorrect : option.isCorrect
						}
			)
		}));
	}, []);

	// Add option
	const addOption = useCallback(() => {
		if (currentQuestion.type === 'true-false') return;

		setCurrentQuestion(prev => ({
			...prev,
			options: [...prev.options, { id: uuidv4(), text: '', isCorrect: false }]
		}));
	}, [currentQuestion.type]);

	// Remove option
	const removeOption = useCallback((id: string) => {
		setCurrentQuestion(prev => {
			if (prev.options.length <= 2) return prev;

			return {
				...prev,
				options: prev.options.filter(option => option.id !== id)
			};
		});
	}, []);

	// Add or update question
	const addQuestion = useCallback(() => {
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
			id: editingQuestionId ?? uuidv4(),
			questionOrder: editingQuestionId
				? (courseLessonQuestions.find(q => q.id === editingQuestionId)
						?.questionOrder ?? courseLessonQuestions.length)
				: courseLessonQuestions.length
		};

		const updatedQuestions = editingQuestionId
			? courseLessonQuestions.map(question =>
					question.id === editingQuestionId ? newQuestion : question
				)
			: [...courseLessonQuestions, newQuestion];

		setCourseLessonQuestions(updatedQuestions);
		setCurrentQuestion(initialQuestion);
		setEditingQuestionId(null);
	}, [courseLessonQuestions, currentQuestion, editingQuestionId]);

	// Edit question
	const editQuestion = useCallback(
		(id: string) => {
			const question = courseLessonQuestions.find(q => q.id === id);
			if (!question) return;

			setCurrentQuestion(question);
			setEditingQuestionId(id);
		},
		[courseLessonQuestions]
	);

	// Delete question
	const deleteQuestion = useCallback(
		(id: string) => {
			setCourseLessonQuestions(
				courseLessonQuestions.filter(question => question.id !== id)
			);
			console.log('Deleted question:', id);
		},
		[courseLessonQuestions]
	);

	// Get questions for a specific lesson
	const getQuestionsForLesson = useCallback(
		(lessonId: string): CourseLessonQuestion[] =>
			courseLessonQuestions.filter(
				question => question.lessonId === lessonId
			) as CourseLessonQuestion[],
		[courseLessonQuestions]
	);

	// Move to next step
	const nextStep = useCallback(() => {
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

		setCurrentStep(prev => prev + 1);

		if (currentStep === 1) {
			setActiveTab('lessons');
		} else if (currentStep === 2) {
			setActiveTab('questions');
		} else if (currentStep === 3) {
			setActiveTab('preview');
		}
	}, [course, currentStep]);

	// Move to previous step
	const prevStep = useCallback(() => {
		setCurrentStep(prev => prev - 1);

		if (currentStep === 4) {
			setActiveTab('questions');
		} else if (currentStep === 3) {
			setActiveTab('lessons');
		} else if (currentStep === 2) {
			setActiveTab('details');
		}
	}, [currentStep]);

	// Save course
	const saveCourse = useCallback(() => {
		// Here you would typically send the course data to your API
		console.log('Course:', course);
		console.log('Course lessons:', courseLessons);
		console.log('Course lesson questions:', courseLessonQuestions);
		console.log('Selected prerequisite courses:', selectedPrerequisiteCourses);

		if (onSave) {
			onSave(
				course,
				courseLessons,
				courseLessonQuestions,
				selectedPrerequisiteCourses
			);
		}
	}, [
		course,
		courseLessonQuestions,
		courseLessons,
		onSave,
		selectedPrerequisiteCourses
	]);

	// Reset course
	const resetCourse = useCallback(() => {
		setCourse(initialCourse);
		setCurrentLesson(initialLesson);
		setCurrentQuestion(initialQuestion);
		setEditingLessonId(null);
		setEditingQuestionId(null);
		setCurrentStep(1);
		setActiveTab('details');
	}, []);

	return (
		<CourseMakerContext.Provider
			value={{
				activeTab,
				setActiveTab,
				currentStep,
				setCurrentStep,
				course,
				setCourse,
				selectedPrerequisiteCourses,
				setSelectedPrerequisiteCourses,
				courseLessons,
				setCourseLessons,
				currentLesson,
				setCurrentLesson,
				editingLessonId,
				setEditingLessonId,
				handleCourseChange,
				handleSelectChange,
				handleLessonChange,
				addLesson,
				editLesson,
				deleteLesson,
				courseLessonQuestions,
				setCourseLessonQuestions,
				currentQuestion,
				setCurrentQuestion,
				editingQuestionId,
				setEditingQuestionId,
				handleQuestionChange,
				handleQuestionTypeChange,
				handleOptionChange,
				handleCorrectOptionChange,
				addOption,
				removeOption,
				addQuestion,
				editQuestion,
				deleteQuestion,
				getQuestionsForLesson,
				nextStep,
				prevStep,
				saveCourse,
				resetCourse
			}}
		>
			{children}
		</CourseMakerContext.Provider>
	);
};
