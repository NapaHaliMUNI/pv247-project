'use client';

import { useRouter } from 'next/navigation';

import { ProgressSteps } from '@/components/course-maker/progress-steps';
import { CourseMakerTabs } from '@/components/course-maker/course-maker-tabs';
import { CourseMakerProvider } from '@/store/course-maker/course-maker-context';
import type { NewCourse } from '@/db/schema/course';

export const CourseMaker = () => {
	const router = useRouter();

	const saveCallback = (courseId: NewCourse['id']) => {
		// Save the course data to the database
		// After saving, navigate to the course details page
		router.push(`/courses/${courseId}`);
	};

	return (
		<CourseMakerProvider onSave={saveCallback}>
			<div className="container mx-auto px-4 py-8">
				<ProgressSteps />
				<CourseMakerTabs />
			</div>
		</CourseMakerProvider>
	);
};
