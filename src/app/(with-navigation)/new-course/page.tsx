'use client';

import { ProgressSteps } from '@/components/course-maker/progress-steps';
import { CourseMakerTabs } from '@/components/course-maker/course-maker-tabs';
import { CourseMakerProvider } from '@/store/course-maker/course-maker-context';

const CourseMakerPage = () => {
	const handleSave = () => {
		// Handle save logic here
	};

	return (
		<CourseMakerProvider onSave={handleSave}>
			<div className="container mx-auto px-4 py-8">
				<ProgressSteps />
				<CourseMakerTabs />
			</div>
		</CourseMakerProvider>
	);
};

export default CourseMakerPage;
