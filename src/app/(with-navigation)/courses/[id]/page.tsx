import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
	ChevronLeft,
	Clock,
	Award,
	BookOpen,
	Calendar,
	Target,
	Zap,
	Move,
	Map,
	Shield,
	Brain,
	CheckCircle,
	Star,
	Users,
	Play
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RelatedCourseCard } from '@/components/course/related-course-card';

// Types based on the Zod schema
type CourseDifficulty =
	| 'Silver'
	| 'Gold'
	| 'Legendary Eagle'
	| 'The Global Elite';
type CourseDuration =
	| 'Short (10-30 minutes)'
	| 'Medium (30-60 minutes)'
	| 'Long (60+ minutes)';
type CourseCategory =
	| 'Fundamentals'
	| 'Weapon Skills'
	| 'Movement'
	| 'Maps'
	| 'Utility'
	| 'Game Sense';

type User = {
	id: number;
	name: string;
	imageUrl?: string;
	title?: string;
};

type CoursePrerequisite = {
	id: string;
	title: string;
	imageUrl?: string;
	difficulty: CourseDifficulty;
};

type CourseLesson = {
	id: string;
	title: string;
	description: string;
	videoUrl?: string;
	duration: string;
	order: number;
	isCompleted?: boolean;
};

type Course = {
	id: string;
	title: string;
	imageUrl?: string;
	shortDescription: string;
	longDescription: string;
	category: CourseCategory;
	difficulty: CourseDifficulty;
	duration: CourseDuration;
	createdAt: string;
	createdBy: number;
	updatedAt: string;
	createdByUser: User;
	prerequisites: CoursePrerequisite[];
	lessons: CourseLesson[];
	studentsCount: number;
	rating: number;
	isEnrolled?: boolean;
	progress?: number;
};

// Mock data for a single course
const getCourseData = (id: string): Course | null => {
	// This would be replaced with a real data fetch in production
	const mockCourse: Course = {
		id,
		title: 'Advanced Rifle Mastery: AK-47 & M4A4',
		imageUrl: '/placeholder.svg?height=600&width=1200',
		shortDescription:
			"Master the spray patterns, movement mechanics, and positioning for CS2's most powerful rifles.",
		longDescription: `
      <p>Welcome to our comprehensive Advanced Rifle Mastery course for Counter-Strike 2. This course is designed to transform your rifle gameplay by focusing on the two most important rifles in the game: the AK-47 and M4A4.</p>
      
      <h3>What You'll Learn</h3>
      <p>Throughout this course, you'll develop a deep understanding of rifle mechanics that will give you a significant advantage in competitive play:</p>
      <ul>
        <li><strong>Spray Pattern Mastery:</strong> Learn to control the unique recoil patterns of both rifles with precision, allowing you to land consistent shots at various distances.</li>
        <li><strong>Counter-Strafing Techniques:</strong> Master the art of movement and shooting to maximize accuracy while maintaining mobility.</li>
        <li><strong>Positioning & Angles:</strong> Understand optimal positioning with rifles on both T and CT sides across different maps.</li>
        <li><strong>Burst vs. Spray vs. Tap:</strong> Develop the judgment to know which firing method to use in different combat scenarios.</li>
        <li><strong>Weapon Economics:</strong> Learn when to buy, save, or force-buy rifles to maximize your team's economic advantage.</li>
        <li><a href="https://www.google.com">google</a></li>
      </ul>
      
      <h3>Course Structure</h3>
      <p>The course is divided into progressive modules that build upon each other:</p>
      <ol>
        <li>Fundamentals of rifle mechanics in CS2</li>
        <li>AK-47 mastery (T-side)</li>
        <li>M4A4 mastery (CT-side)</li>
        <li>Advanced movement while rifling</li>
        <li>Position-specific rifle techniques</li>
        <li>Practical drills and training routines</li>
      </ol>
      
      <h3>Who This Course Is For</h3>
      <p>This course is ideal for players who have basic familiarity with CS2 but want to significantly improve their rifle skills. Whether you're stuck in the Gold ranks or pushing toward Legendary Eagle, the techniques in this course will help you break through skill plateaus and dominate with the game's most versatile weapons.</p>
      
      <h3>Requirements</h3>
      <p>To get the most out of this course, you should:</p>
      <ul>
        <li>Have a basic understanding of CS2 mechanics</li>
        <li>Be familiar with basic map callouts</li>
        <li>Have completed our "CS2 Fundamentals" course or have equivalent experience</li>
      </ul>
      
      <p>By the end of this course, you'll have the confidence and skill to take on any rifle duel and consistently come out on top. Your improved accuracy and game sense will make you a more valuable player to any team.</p>
    `,
		category: 'Weapon Skills',
		difficulty: 'Gold',
		duration: 'Medium (30-60 minutes)',
		createdAt: '2023-10-15',
		updatedAt: '2023-11-02',
		createdBy: 2,
		createdByUser: {
			id: 2,
			name: "Maria 'Headshot' Rodriguez",
			imageUrl: '/placeholder.svg?height=100&width=100',
			title: 'Weapon Specialist & Former Pro Player'
		},
		prerequisites: [
			{
				id: 'prereq-1',
				title: 'CS2 Fundamentals: From Beginner to Competitive',
				imageUrl: '/placeholder.svg?height=100&width=200',
				difficulty: 'Silver'
			},
			{
				id: 'prereq-2',
				title: 'Movement Mechanics: Strafing & Positioning',
				imageUrl: '/placeholder.svg?height=100&width=200',
				difficulty: 'Silver'
			}
		],
		lessons: [
			{
				id: 'lesson-1',
				title: 'Introduction to Rifle Mechanics in CS2',
				description:
					'Overview of how rifles work in CS2 and the key differences from previous versions.',
				videoUrl: '#',
				duration: '8:45',
				order: 1,
				isCompleted: true
			},
			{
				id: 'lesson-2',
				title: 'AK-47 Spray Pattern Analysis',
				description:
					'Detailed breakdown of the AK-47 spray pattern and how to control it effectively.',
				videoUrl: '#',
				duration: '12:30',
				order: 2,
				isCompleted: true
			},
			{
				id: 'lesson-3',
				title: 'M4A4 Spray Pattern Analysis',
				description:
					'Detailed breakdown of the M4A4 spray pattern and how it differs from the AK-47.',
				videoUrl: '#',
				duration: '11:15',
				order: 3,
				isCompleted: false
			},
			{
				id: 'lesson-4',
				title: 'Counter-Strafing with Rifles',
				description:
					'Learn how to maintain accuracy while moving with rifles using counter-strafing techniques.',
				videoUrl: '#',
				duration: '15:20',
				order: 4,
				isCompleted: false
			},
			{
				id: 'lesson-5',
				title: 'Optimal Positioning for Rifle Players',
				description:
					'Map-specific positions that give rifle players the advantage in duels.',
				videoUrl: '#',
				duration: '14:50',
				order: 5,
				isCompleted: false
			},
			{
				id: 'lesson-6',
				title: 'Practical Drills & Training Routines',
				description:
					'Daily practice routines to improve your rifle skills consistently over time.',
				videoUrl: '#',
				duration: '18:10',
				order: 6,
				isCompleted: false
			}
		],
		studentsCount: 2150,
		rating: 4.8,
		isEnrolled: true,
		progress: 33
	};

	return mockCourse;
};

// Helper function to get category icon
const getCategoryIcon = (category: CourseCategory) => {
	switch (category) {
		case 'Fundamentals':
			return <Target className="h-5 w-5" />;
		case 'Weapon Skills':
			return <Zap className="h-5 w-5" />;
		case 'Movement':
			return <Move className="h-5 w-5" />;
		case 'Maps':
			return <Map className="h-5 w-5" />;
		case 'Utility':
			return <Shield className="h-5 w-5" />;
		case 'Game Sense':
			return <Brain className="h-5 w-5" />;
		default:
			return <BookOpen className="h-5 w-5" />;
	}
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty: CourseDifficulty) => {
	switch (difficulty) {
		case 'Silver':
			return 'bg-gray-400/10 text-gray-400 hover:bg-gray-400/20';
		case 'Gold':
			return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
		case 'Legendary Eagle':
			return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
		case 'The Global Elite':
			return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
		default:
			return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
	}
};

// Helper function to get difficulty rank image (placeholder for now)
const getDifficultyRankImage = (difficulty: CourseDifficulty) =>
	`/placeholder.svg?height=40&width=40`;

const CourseDetailPage = async ({
	params
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const course = getCourseData(id);

	if (!course) {
		notFound();
	}

	return (
		<div className="">
			{/* Course Hero */}
			<section className="relative border-b border-[#2A2A2A] bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/60">
				<div className="relative container mx-auto px-4 py-12 md:px-8">
					{/* Back button */}
					<Link
						href="/courses"
						className="mb-6 inline-flex items-center text-sm text-[#ABABAB] hover:text-white"
					>
						<ChevronLeft className="mr-1 h-4 w-4" />
						Back to Courses
					</Link>

					<div className="flex flex-col gap-8 md:flex-row">
						<div className="md:w-2/3">
							{/* Category badge */}
							<div className="mb-4 flex items-center gap-2">
								<Badge className="border border-[#2A2A2A] bg-[#1A1A1A] text-[#ABABAB] hover:bg-[#1F1F1F]">
									<div className="flex items-center gap-1.5">
										{getCategoryIcon(course.category)}
										<span>{course.category}</span>
									</div>
								</Badge>
								<Badge className={getDifficultyColor(course.difficulty)}>
									<div className="flex items-center gap-1.5">
										<Award className="h-4 w-4" />
										<span>{course.difficulty}</span>
									</div>
								</Badge>
							</div>

							{/* Title */}
							<h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
								{course.title}
							</h1>

							{/* Short description */}
							<p className="mb-6 text-lg text-[#ABABAB]">
								{course.shortDescription}
							</p>

							{/* Course stats */}
							<div className="mb-8 flex flex-wrap gap-6">
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5 text-[#ABABAB]" />
									<span className="text-[#ABABAB]">{course.duration}</span>
								</div>
								<div className="flex items-center gap-2">
									<BookOpen className="h-5 w-5 text-[#ABABAB]" />
									<span className="text-[#ABABAB]">
										{course.lessons.length} Lessons
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-5 w-5 text-[#ABABAB]" />
									<span className="text-[#ABABAB]">
										Updated {new Date(course.updatedAt).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-5 w-5 text-[#ABABAB]" />
									<span className="text-[#ABABAB]">
										{course.studentsCount.toLocaleString()} Learners
									</span>
								</div>
							</div>

							{/* Creator */}
							<div className="mb-8 flex items-center gap-4">
								<Avatar className="h-12 w-12 border border-[#2A2A2A]">
									<AvatarImage
										src={
											course.createdByUser.imageUrl ??
											'https://placehold.co/64?text=Creator'
										}
										alt={course.createdByUser.name}
									/>
									<AvatarFallback className="bg-[#1A1A1A] text-[#ABABAB]">
										{course.createdByUser.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="text-sm text-[#ABABAB]">Creator</div>
									<div className="font-medium text-white">
										{course.createdByUser.name}
									</div>
									<div className="text-sm text-[#ABABAB]">
										{course.createdByUser.title}
									</div>
								</div>
							</div>
						</div>

						<div className="md:w-1/3">
							<div className="overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A]">
								{/* Course preview image */}
								<div className="relative aspect-video">
									<Image
										src={
											course.imageUrl ??
											'https://placehold.co/600x400?text=Course'
										}
										alt={course.title}
										fill
										className="object-cover"
									/>
								</div>

								<div className="p-6">
									{course.isEnrolled ? (
										<>
											<div className="mb-4">
												<div className="mb-2 flex justify-between">
													<span className="text-sm text-[#ABABAB]">
														Your progress
													</span>
													<span className="text-sm font-medium text-white">
														{course.progress}%
													</span>
												</div>
												<Progress
													value={course.progress}
													className="h-2 bg-[#2A2A2A]"
												/>
											</div>
											<Button className="w-full bg-[#FF5500] text-white hover:bg-[#FF5500]/90">
												Continue Learning
											</Button>
										</>
									) : (
										<Button className="mb-3 w-full bg-[#FF5500] text-white hover:bg-[#FF5500]/90">
											Enroll Now
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Course Content */}
			<section className="py-12">
				<div className="container mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<div className="prose prose-invert max-w-none">
								<h2 className="mb-6 text-2xl font-bold text-white">
									Course Overview
								</h2>
								<div
									dangerouslySetInnerHTML={{
										__html: course.longDescription
									}}
									className="html-content overflow-y-auto text-[#E0E0E0] lg:max-h-[600px]"
								/>
							</div>
						</div>

						<div>
							<h3 className="mb-4 text-xl font-bold text-white">Lessons</h3>
							{/*TODO: list lessons*/}
							<ul className="mb-8 space-y-3">
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5500]" />
									<span>Master the spray patterns of AK-47 and M4A4</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5500]" />
									<span>Develop advanced counter-strafing techniques</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5500]" />
									<span>Learn optimal positioning for rifle players</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5500]" />
									<span>Understand when to tap, burst, or spray</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5500]" />
									<span>Create effective practice routines</span>
								</li>
							</ul>

							<h3 className="mb-4 text-xl font-bold text-white">
								Prerequisites
							</h3>
							{/*TODO: list prerequisites*/}
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<Play className="h-5 w-5 text-[#ABABAB]" />
									<span>{course.lessons.length} video lessons</span>
								</li>
								<li className="flex items-center gap-2">
									<BookOpen className="h-5 w-5 text-[#ABABAB]" />
									<span>Downloadable resources</span>
								</li>
								<li className="flex items-center gap-2">
									<Users className="h-5 w-5 text-[#ABABAB]" />
									<span>Community discussion</span>
								</li>
								<li className="flex items-center gap-2">
									<Award className="h-5 w-5 text-[#ABABAB]" />
									<span>Completion certificate</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Related Courses */}
			<section className="border-t border-[#2A2A2A] bg-[#151515] py-12">
				<div className="container mx-auto px-4 md:px-8">
					<h2 className="mb-8 text-2xl font-bold text-white">
						Related Courses
					</h2>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{/* Related course cards would go here - using placeholder for now */}
						{/*TODO */}
						{/*{[1, 2, 3].map(i => (*/}
						{/*	<RelatedCourseCard course={course} key={i} />*/}
						{/*))}*/}
					</div>
				</div>
			</section>
		</div>
	);
};

export default CourseDetailPage;
