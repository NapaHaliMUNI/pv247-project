import Image from 'next/image';
import Link from 'next/link';

import { type Course } from '@/db/schema/course';

export const RelatedCourseCard = ({ course }: { course: Course }) => {
	const x = 0;
	return (
		<Link href="/courses/related-1" className="group">
			<div className="h-full overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#FF5500]/50 hover:shadow-[0_0_20px_rgba(255,85,0,0.1)]">
				<div className="relative aspect-video">
					<Image
						src={
							course.imageUrl ??
							'https://placehold.co/600x400.png?text=Course+Image'
						}
						alt={course.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<div className="p-5">
					<h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#FF5500]">
						Pistol Mastery: Eco Rounds & Force Buys
					</h3>
					<p className="mb-4 line-clamp-2 text-sm text-[#ABABAB]">
						Master pistols to win crucial eco and force buy rounds.
					</p>
				</div>
			</div>
		</Link>
	);
};
