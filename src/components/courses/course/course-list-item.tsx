import Image from 'next/image';
import { BookOpen, Clock, Star } from 'lucide-react';
import Link from 'next/link';

import { type Course } from '@/db/schema/course';
import { type User } from '@/db/schema/user';

const CourseListItem = ({ course }: { course: Course }) => {
	const creator: User = {
		id: '1',
		createdAt: null,
		updatedAt: null,
		email: 'abcd@gmail.com',
		username: 'username1',
		password: 'password1'
	};

	return (
		<Link href={`/courses/${course.id}`} key={course.id} className="group">
			<div className="h-full overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#FF5500]/50 hover:shadow-[0_0_20px_rgba(255,85,0,0.1)]">
				<div className="relative aspect-video">
					<Image
						src={
							course.imageUrl ?? 'https://placehold.co/600x400?text=Course+Item'
						}
						alt={course.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>

					<div className="p-5">
						{/* Category */}
						<div className="mb-2 flex items-center gap-1.5">
							{/*TODO: Category icon*/}
							<span className="text-sm text-[#ABABAB]">{course.category}</span>
						</div>

						{/* Title */}
						<h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-[#FF5500]">
							{course.title}
						</h3>

						{/* Description */}
						<p className="mb-4 line-clamp-2 text-sm text-[#ABABAB]">
							{course.shortDescription}
						</p>

						{/* Creator */}
						<div className="mb-4 flex items-center gap-3">
							<div className="relative h-8 w-8 overflow-hidden rounded-full">
								<Image
									src={
										creator.avatarUrl ??
										'https://placehold.co/64?text=User+Avatar'
									}
									alt={creator.username}
									fill
									className="object-cover"
								/>
							</div>
							<div>
								<div className="text-sm font-medium text-white">
									{creator.username}
								</div>
								<div className="text-xs text-[#ABABAB]">
									{/*TODO: Show user role*/}
									Basic user
								</div>
							</div>
						</div>

						{/* Stats */}
						<div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
							<div className="flex items-center gap-1">
								{/*TODO: Difficulty icon*/}
								<span className="text-sm font-medium text-white">
									{course.difficulty}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4 text-[#ABABAB]" />
								<span className="text-sm text-[#ABABAB]">
									{course.duration}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<BookOpen className="h-4 w-4 text-[#ABABAB]" />
								{/*TODO: add lesson count*/}
								<span className="text-sm text-[#ABABAB]">X lessons</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseListItem;
