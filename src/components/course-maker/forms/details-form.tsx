'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	courseCategorySchema,
	courseDifficultySchema,
	courseDurationSchema
} from '@/db/schema/course';
import { MultiSelect } from '@/components/ui/multi-select';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';
import { getToolbarTemplate } from '@/utils/quillToolbarTemplate';

// Sample prerequisite courses
const prerequisiteCoursesForMultiSelect = [
	{ value: '1', label: 'CS2 Fundamentals: From Beginner to Competitive' },
	{ value: '2', label: 'Advanced Weapon Mastery: Rifles' },
	{ value: '3', label: 'Pro Team Strategies: T-Side Executes' },
	{ value: '4', label: 'Map Mastery: Dust 2 Complete Guide' }
];

export const CourseDetailsForm = () => {
	const {
		course,
		setCourse,
		selectedPrerequisiteCourses,
		setSelectedPrerequisiteCourses,
		handleCourseChange,
		handleSelectChange
	} = useCourseMakerContext();

	const { quill, quillRef } = useQuill({
		modules: {
			toolbar: getToolbarTemplate()
		}
	});

	useEffect(() => {
		if (quill) {
			quill.clipboard.dangerouslyPasteHTML(course.longDescriptionHtml);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quill]);

	useEffect(() => {
		if (quill) {
			quill.on('text-change', () => {
				setCourse(prev => ({
					...prev,
					longDescriptionHtml: quill.root.innerHTML
				}));
			});
		}
	}, [quill, setCourse]);

	return (
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
						placeholder="e.g. Advanced AWP Movement Guide"
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
					<Label htmlFor="longDescriptionHtml">Detailed Description</Label>
					<div className="ql-html-container bg-[#151515] text-white">
						<div id="longDescriptionHtml" ref={quillRef} />
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select
							value={course.category ?? ''}
							onValueChange={value => handleSelectChange('category', value)}
						>
							<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent className="border-[#333333] bg-[#151515] text-white">
								{courseCategorySchema.options.map(category => (
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
							value={course.difficulty ?? ''}
							onValueChange={value => handleSelectChange('difficulty', value)}
						>
							<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
								<SelectValue placeholder="Select difficulty" />
							</SelectTrigger>
							<SelectContent className="border-[#333333] bg-[#151515] text-white">
								{courseDifficultySchema.options.map(level => (
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
							value={course.duration ?? ''}
							onValueChange={value => handleSelectChange('duration', value)}
						>
							<SelectTrigger className="border-[#333333] bg-[#151515] text-white">
								<SelectValue placeholder="Select duration" />
							</SelectTrigger>
							<SelectContent className="border-[#333333] bg-[#151515] text-white">
								{courseDurationSchema.options.map(option => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="prerequisite">
							Prerequisite Courses (Optional)
						</Label>
						<MultiSelect
							className="border-[#333333] bg-[#151515] text-white"
							options={prerequisiteCoursesForMultiSelect}
							selectedValues={selectedPrerequisiteCourses}
							setSelectedValues={setSelectedPrerequisiteCourses}
							placeholder="Select prerequisite courses"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
