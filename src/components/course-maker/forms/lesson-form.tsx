'use client';

import type React from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Course } from '@/db/schema/course';
import type { CourseLesson } from '@/db/schema/course-lesson';

type LessonFormProps = {
	course: Course;
	courseLessonsState: [CourseLesson[], (lessons: CourseLesson[]) => void];
};

export const LessonForm = ({
	course,
	courseLessonsState: [courseLessons, setCourseLessons]
}: LessonFormProps) => {
	const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
	const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

	// Handle lesson change
	const handleLessonChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (!currentLesson) {
			// Initialize with defaults for required properties
			setCurrentLesson({
				id: -1,
				title: name === 'title' ? value : '',
				createdAt: null,
				createdBy: -1,
				updatedAt: null,
				updatedBy: -1,
				courseId: course.id,
				lessonOrder: courseLessons.length,
				content: name === 'content' ? value : '',
				videoUrl: ''
			});
		} else {
			setCurrentLesson({
				...currentLesson,
				[name]: value
			});
		}
	};

	// Add lesson
	const addLesson = () => {
		if (!currentLesson?.title || !currentLesson.content) return;

		const newLesson = {
			...currentLesson,
			id: editingLessonId ?? -1,
			order: editingLessonId
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

		setCurrentLesson(null);
		setEditingLessonId(null);
	};

	return (
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
						value={currentLesson?.title}
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
						value={currentLesson?.content}
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
									setCurrentLesson(null);
									setEditingLessonId(null);
								}}
							>
								Cancel
							</Button>
							<Button
								className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
								onClick={addLesson}
								disabled={!currentLesson?.title || !currentLesson.content}
							>
								Update Lesson
							</Button>
						</>
					) : (
						<Button
							className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
							onClick={addLesson}
							disabled={!currentLesson?.title || !currentLesson.content}
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Lesson
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
