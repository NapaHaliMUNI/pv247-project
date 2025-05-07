'use client';

import type React from 'react';

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
import { Textarea } from '@/components/ui/textarea';
import type { Course } from '@/db/schema/course';

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

// Sample prerequisite courses
const prerequisiteCourses = [
	{ id: '1', title: 'CS2 Fundamentals: From Beginner to Competitive' },
	{ id: '2', title: 'Advanced Weapon Mastery: Rifles' },
	{ id: '3', title: 'Pro Team Strategies: T-Side Executes' },
	{ id: '4', title: 'Map Mastery: Dust 2 Complete Guide' }
];

type CourseDetailsFormProps = {
	courseState: [Course, (course: Course) => void];
};

export const CourseDetailsForm = ({
	courseState: [course, setCourse]
}: CourseDetailsFormProps) => {
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
					<Label htmlFor="longDescription">Detailed Description</Label>
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
							onValueChange={value => handleSelectChange('category', value)}
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
							onValueChange={value => handleSelectChange('difficulty', value)}
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
							onValueChange={value => handleSelectChange('duration', value)}
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
						<Label htmlFor="prerequisite">Prerequisite Course (Optional)</Label>
						<Select
							value={course.prerequisiteId?.toString()}
							onValueChange={value => handleSelectChange('prerequisite', value)}
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
	);
};
