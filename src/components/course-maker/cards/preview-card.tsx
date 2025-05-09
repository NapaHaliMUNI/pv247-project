import Image from 'next/image';
import { BarChart2, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

import { ImageUpload } from '../image-upload';

export const CoursePreviewCard = () => {
	const { course } = useCourseMakerContext();

	return (
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
							src={
								course.imageUrl ??
								'https://placehold.co/600x400.png?text=Course+Image'
							}
							alt="Course preview"
							fill
							className="object-cover"
						/>
						{course.difficulty && (
							<div className="absolute top-3 left-3">
								<Badge
									className={` ${
										course.difficulty === 'Silver'
											? 'bg-green-500/10 text-green-500'
											: course.difficulty === 'Gold'
												? 'bg-blue-500/10 text-blue-500'
												: course.difficulty === 'Legendary Eagle'
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

						{(course.duration ?? course.category) && (
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
					<ImageUpload onImageUploaded={url => console.log(url)} />
				</div>
			</CardContent>
		</Card>
	);
};
