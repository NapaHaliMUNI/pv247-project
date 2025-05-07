'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { ProgressSteps } from '@/components/course-maker/progress-steps';
import { CourseMakerTabs } from '@/components/course-maker/course-maker-tabs';
import type { NewCourse } from '@/db/schema/course';
import type { NewCourseLesson } from '@/db/schema/course-lesson';
import type { NewCourseLessonQuestion } from '@/db/schema/course-lesson-question';

// Initial empty course state
const initialCourse: NewCourse = {
	id: uuidv4(),
	title: '',
	shortDescription: '',
	longDescription: '',
	duration: null,
	difficulty: null,
	prerequisiteId: null,
	category: null,
	image: 'https://placehold.co/600x400.png?text=Course+Image'
};

const CourseMakerPage = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('details');
	const [currentStep, setCurrentStep] = useState(1);

	// Course state
	const [course, setCourse] = useState<NewCourse>(initialCourse);
	const [courseLessons, setCourseLessons] = useState<NewCourseLesson[]>([]);
	const [courseLessonQuestions, setCourseLessonQuestions] = useState<
		NewCourseLessonQuestion[]
	>([]);

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
		console.log('Saving lessons:', courseLessons);
		console.log('Saving questions:', courseLessonQuestions);

		// For demo purposes, just redirect to courses page
		router.push('/courses');
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<ProgressSteps currentStep={currentStep} />

			<CourseMakerTabs
				activeTabState={[activeTab, setActiveTab]}
				currentStepState={[currentStep, setCurrentStep]}
				courseState={[course, setCourse]}
				courseLessonsState={[courseLessons, setCourseLessons]}
				courseLessonQuestionsState={[
					courseLessonQuestions,
					setCourseLessonQuestions
				]}
				nextStep={nextStep}
				prevStep={prevStep}
				saveCourse={saveCourse}
			/>
		</div>
	);
};

export default CourseMakerPage;
