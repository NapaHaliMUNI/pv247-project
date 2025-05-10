'use client';

import type React from 'react';
import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

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
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';
import { getToolbarTemplate } from '@/utils/quillToolbarTemplate';

export const LessonForm = () => {
	const {
		course,
		courseLessons,
		currentLesson,
		setCurrentLesson,
		editingLessonId,
		setEditingLessonId,
		handleLessonChange,
		addLesson
	} = useCourseMakerContext();

	const { quill, quillRef } = useQuill({
		modules: {
			toolbar: getToolbarTemplate()
		}
	});

	useEffect(() => {
		if (quill) {
			quill.on('text-change', () => {
				setCurrentLesson(prev => ({
					...prev,
					contentHtml: quill.root.innerHTML
				}));
			});
		}
	}, [quill, setCurrentLesson]);

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
					<Label htmlFor="videoUrl">Video URL (Optional)</Label>
					<div className="flex gap-2">
						<Input
							id="videoUrl"
							name="videoUrl"
							placeholder="e.g. https://www.youtube.com/watch?v=..."
							className="flex-1 border-[#333333] bg-[#151515] text-white focus-visible:ring-[#FF5500]"
							value={currentLesson?.videoUrl ?? ''}
							onChange={handleLessonChange}
						/>
						{/* <Button
							variant="outline"
							className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
							type="button"
						>
							<Video className="mr-2 h-4 w-4" />
							Preview
						</Button> */}
					</div>
					<p className="text-xs text-[#ABABAB]">Supports YouTube links only</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="lessonContentHtml">Lesson Content</Label>
					<div className="ql-html-container bg-[#151515] text-white">
						<div id="lessonContentHtml" ref={quillRef} />
					</div>
				</div>

				<div className="flex justify-end">
					{editingLessonId ? (
						<>
							<Button
								variant="outline"
								className="mr-2 border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
								onClick={() => {
									setCurrentLesson({
										id: uuidv4(),
										title: '',
										videoUrl: '',
										contentHtml: '',
										lessonOrder: courseLessons.length,
										courseId: course.id
									});
									setEditingLessonId(null);
								}}
							>
								Cancel
							</Button>
							<Button
								className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
								onClick={addLesson}
								disabled={!currentLesson?.title || !currentLesson.contentHtml}
							>
								Update Lesson
							</Button>
						</>
					) : (
						<Button
							className="bg-[#FF5500] text-white hover:bg-[#FF5500]/90"
							onClick={() => {
								addLesson();
								quill?.setText('');
							}}
							disabled={!currentLesson?.title || !currentLesson.contentHtml}
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
