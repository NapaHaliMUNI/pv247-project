// TODO: dont forget to force dynamic basically everywhere

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	Search,
	Filter,
	Star,
	Clock,
	BookOpen,
	BarChart2,
	Target,
	Users,
	Shield,
	Zap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import DifficultyFilter from '@/components/courses/filters/difficulty-filter';
import CategoryFilter from '@/components/courses/filters/category-filter';
import { useFiltersContext } from '@/store/courses/filters-context';
import Searchbar from '@/components/courses/searchbar/searchbar';
import Sort from '@/components/courses/sort/sort';

// Course type definition
type Course = {
	id: string;
	title: string;
	description: string;
	image: string;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
	category: string;
	creator: {
		name: string;
		image: string;
		title: string;
	};
	rating: number;
	duration: string;
	modules: number;
	students: number;
	tags: string[];
	featured?: boolean;
	new?: boolean;
};

// Sample courses data
const coursesData: Course[] = [
	{
		id: '1',
		title: 'CS2 Fundamentals: From Beginner to Competitive',
		description:
			'Master the core mechanics and gain the essential knowledge needed to start your competitive journey.',
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Beginner',
		category: 'Fundamentals',
		creator: {
			name: "Alex 'Striker' Chen",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Former Pro Player'
		},
		rating: 4.8,
		duration: '8 hours',
		modules: 12,
		students: 3240,
		tags: ['basics', 'mechanics', 'competitive'],
		featured: true
	},
	{
		id: '2',
		title: 'Advanced Weapon Mastery: Rifles',
		description:
			"Master the spray patterns, movement mechanics, and economic strategies behind CS2's most powerful rifles.",
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Intermediate',
		category: 'Weapon Skills',
		creator: {
			name: "Maria 'Headshot' Rodriguez",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Aim Coach'
		},
		rating: 4.9,
		duration: '6 hours',
		modules: 10,
		students: 2150,
		tags: ['rifles', 'spray control', 'aim']
	},
	{
		id: '3',
		title: 'Pro Team Strategies: T-Side Executes',
		description:
			'Learn professional-level team coordination, utility usage, and site execution strategies for the T-side.',
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Advanced',
		category: 'Team Tactics',
		creator: {
			name: "Viktor 'Tactician' Petrov",
			image: '/placeholder.svg?height=100&width=100',
			title: 'IGL & Strategist'
		},
		rating: 4.7,
		duration: '7 hours',
		modules: 8,
		students: 1890,
		tags: ['tactics', 'utility', 'teamwork'],
		new: true
	},
	{
		id: '4',
		title: 'Map Mastery: Dust 2 Complete Guide',
		description:
			"Everything you need to know about CS2's most iconic map - callouts, angles, utility, and strategies.",
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'All Levels',
		category: 'Maps',
		creator: {
			name: "Jordan 'MapMaster' Williams",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Map Specialist'
		},
		rating: 4.6,
		duration: '5 hours',
		modules: 9,
		students: 2760,
		tags: ['dust2', 'callouts', 'positions']
	},
	{
		id: '5',
		title: 'AWP Specialist Training',
		description:
			'Become a deadly sniper with advanced AWP techniques, positioning, and decision-making skills.',
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Intermediate',
		category: 'Weapon Skills',
		creator: {
			name: "Sasha 'Eagle Eye' Ivanov",
			image: '/placeholder.svg?height=100&width=100',
			title: 'AWP Specialist'
		},
		rating: 4.9,
		duration: '4 hours',
		modules: 7,
		students: 1950,
		tags: ['awp', 'sniping', 'positioning']
	},
	{
		id: '6',
		title: 'Clutch Mastery: Winning 1vX Situations',
		description:
			'Psychological and tactical approaches to consistently win clutch situations and turn the tide of matches.',
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Advanced',
		category: 'Advanced Skills',
		creator: {
			name: "Carlos 'Clutchmeister' Silva",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Clutch Specialist'
		},
		rating: 4.8,
		duration: '3 hours',
		modules: 6,
		students: 1680,
		tags: ['clutch', 'psychology', 'decision-making']
	},
	{
		id: '7',
		title: 'Utility Mastery: Grenades & Tactics',
		description:
			'Learn essential smokes, flashes, molotovs and HE grenade lineups for all competitive maps.',
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'Intermediate',
		category: 'Utility',
		creator: {
			name: "Nina 'Smokescreen' Park",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Utility Expert'
		},
		rating: 4.7,
		duration: '6 hours',
		modules: 10,
		students: 2340,
		tags: ['utility', 'smokes', 'flashes'],
		new: true
	},
	{
		id: '8',
		title: 'CS2 Economy Management',
		description:
			"Master the economic meta of CS2 to maximize your team's firepower and strategic advantages.",
		image: '/placeholder.svg?height=400&width=600',
		difficulty: 'All Levels',
		category: 'Strategy',
		creator: {
			name: "Daniel 'Economist' Lee",
			image: '/placeholder.svg?height=100&width=100',
			title: 'Strategy Coach'
		},
		rating: 4.5,
		duration: '2 hours',
		modules: 5,
		students: 1420,
		tags: ['economy', 'buying', 'saving']
	}
];

// Filter options
const difficulties = [
	'All',
	'Beginner',
	'Intermediate',
	'Advanced',
	'All Levels'
];
const categories = [
	'All',
	'Fundamentals',
	'Weapon Skills',
	'Team Tactics',
	'Maps',
	'Utility',
	'Strategy',
	'Advanced Skills'
];

const CoursesPage = () => {
	const [courses, setCourses] = useState<Course[]>(coursesData);
	const {
		searchQuery,
		setSearchQuery,
		selectedDifficulties,
		setSelectedDifficulties,
		selectedCategory,
		setSelectedCategory,
		selectedSort,
		setSelectedSort,
		resetFilters
	} = useFiltersContext();

	// All unique tags from courses
	const allTags = Array.from(
		new Set(coursesData.flatMap(course => course.tags))
	);

	// Filter and sort courses
	useEffect(() => {
		let filteredCourses = [...coursesData];

		// Filter by search query
		if (searchQuery) {
			filteredCourses = filteredCourses.filter(
				course =>
					course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					course.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					course.creator.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					course.tags.some(tag =>
						tag.toLowerCase().includes(searchQuery.toLowerCase())
					)
			);
		}

		// Filter by difficulty
		// if (selectedDifficulties !== 'All') {
		// 	filteredCourses = filteredCourses.filter(
		// 		course => course.difficulty === selectedDifficulties
		// 	);
		// }

		// Filter by category
		if (selectedCategory !== 'All') {
			filteredCourses = filteredCourses.filter(
				course => course.category === selectedCategory
			);
		}

		// Sort courses
		switch (selectedSort) {
			case 'Most Popular':
				filteredCourses.sort((a, b) => b.students - a.students);
				break;
			case 'Newest':
				filteredCourses.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
				break;
			case 'Highest Rated':
				filteredCourses.sort((a, b) => b.rating - a.rating);
				break;
			case 'Duration (Shortest)':
				filteredCourses.sort(
					(a, b) => Number.parseInt(a.duration) - Number.parseInt(b.duration)
				);
				break;
			case 'Duration (Longest)':
				filteredCourses.sort(
					(a, b) => Number.parseInt(b.duration) - Number.parseInt(a.duration)
				);
				break;
			default:
				break;
		}

		setCourses(filteredCourses);
	}, [searchQuery, selectedDifficulties, selectedCategory, selectedSort]);

	// Get difficulty badge color
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'Beginner':
				return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
			case 'Intermediate':
				return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
			case 'Advanced':
				return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
			default:
				return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
		}
	};

	// Get category icon
	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'Fundamentals':
				return <Target className="h-4 w-4" />;
			case 'Weapon Skills':
				return <Zap className="h-4 w-4" />;
			case 'Team Tactics':
				return <Users className="h-4 w-4" />;
			case 'Maps':
				return <BarChart2 className="h-4 w-4" />;
			case 'Utility':
				return <Shield className="h-4 w-4" />;
			case 'Strategy':
				return <BarChart2 className="h-4 w-4" />;
			case 'Advanced Skills':
				return <Zap className="h-4 w-4" />;
			default:
				return <BookOpen className="h-4 w-4" />;
		}
	};

	return (
		<div className="">
			{/* Main Content */}
			<section className="">
				<div className="container mx-auto">
					<div className="flex flex-col gap-8 lg:flex-row">
						{/* Mobile Filter Button */}
						<div className="w-full lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="outline"
										className="w-full border-[#333333] bg-[#1A1A1A] text-white hover:bg-[#1F1F1F]"
									>
										<Filter className="mr-2 h-4 w-4" />
										Filters
									</Button>
								</SheetTrigger>
								<SheetContent
									side="left"
									className="w-[300px] border-[#2A2A2A] bg-[#1A1A1A] text-white sm:w-[400px]"
								>
									<div className="px-4 py-24">
										<h3 className="mb-4 text-lg font-semibold">Filters</h3>

										<div className="space-y-6">
											<DifficultyFilter difficulties={difficulties} />
											<CategoryFilter categories={categories} />
											{/*TODO add duration filter*/}

											{/* Reset Filters */}
											<Button
												variant="outline"
												className="w-full border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
												onClick={resetFilters}
											>
												Reset Filters
											</Button>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>

						<div className="hidden w-full max-w-[280px] shrink-0 lg:block">
							<div className="sticky top-[calc(var(--navigation-height)+32px)] rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6">
								<div className="mb-6 flex items-center justify-between">
									<h3 className="text-lg font-semibold">Filters</h3>
									<Button
										variant="ghost"
										className="h-auto p-0 text-sm text-[#FF5500] hover:bg-transparent hover:text-[#FF5500]/90"
										onClick={resetFilters}
									>
										Reset
									</Button>
								</div>

								<div className="space-y-6">
									<DifficultyFilter difficulties={difficulties} />
									<CategoryFilter categories={categories} />
									{/*TODO add duration filter*/}
								</div>
							</div>
						</div>

						{/* Courses Grid */}
						<div className="w-full">
							{/* Search and Sort */}
							<div className="mb-8 flex flex-col gap-4 sm:flex-row">
								<Searchbar />
								<Sort />
							</div>

							{/* Results Count */}
							<div className="mb-6">
								<p className="text-[#ABABAB]">
									Showing{' '}
									<span className="font-medium text-white">
										{courses.length}
									</span>{' '}
									courses
								</p>
							</div>

							{/* Courses Grid */}
							{courses.length > 0 ? (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
									{courses.map(course => (
										<Link
											href={`/courses/${course.id}`}
											key={course.id}
											className="group"
										>
											<div className="h-full overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#FF5500]/50 hover:shadow-[0_0_20px_rgba(255,85,0,0.1)]">
												<div className="relative aspect-video">
													<Image
														src={course.image || '/placeholder.svg'}
														alt={course.title}
														fill
														className="object-cover transition-transform group-hover:scale-105"
													/>
													{/* Badges */}
													<div className="absolute top-3 left-3 flex gap-2">
														<Badge
															className={getDifficultyColor(course.difficulty)}
														>
															{course.difficulty}
														</Badge>
														{course.featured && (
															<Badge className="bg-[#FF5500]/10 text-[#FF5500] hover:bg-[#FF5500]/20">
																Featured
															</Badge>
														)}
														{course.new && (
															<Badge className="bg-[#4BB4E6]/10 text-[#4BB4E6] hover:bg-[#4BB4E6]/20">
																New
															</Badge>
														)}
													</div>
												</div>

												<div className="p-5">
													{/* Category */}
													<div className="mb-2 flex items-center gap-1.5">
														{getCategoryIcon(course.category)}
														<span className="text-sm text-[#ABABAB]">
															{course.category}
														</span>
													</div>

													{/* Title */}
													<h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-[#FF5500]">
														{course.title}
													</h3>

													{/* Description */}
													<p className="mb-4 line-clamp-2 text-sm text-[#ABABAB]">
														{course.description}
													</p>

													{/* Creator */}
													<div className="mb-4 flex items-center gap-3">
														<div className="relative h-8 w-8 overflow-hidden rounded-full">
															<Image
																src={course.creator.image || '/placeholder.svg'}
																alt={course.creator.name}
																fill
																className="object-cover"
															/>
														</div>
														<div>
															<div className="text-sm font-medium text-white">
																{course.creator.name}
															</div>
															<div className="text-xs text-[#ABABAB]">
																{course.creator.title}
															</div>
														</div>
													</div>

													{/* Stats */}
													<div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
														<div className="flex items-center gap-1">
															<Star className="h-4 w-4 fill-[#FF5500] text-[#FF5500]" />
															<span className="text-sm font-medium text-white">
																{course.rating}
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
															<span className="text-sm text-[#ABABAB]">
																{course.modules} modules
															</span>
														</div>
													</div>
												</div>
											</div>
										</Link>
									))}
								</div>
							) : (
								<div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center">
									<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#151515]">
										<Search className="h-6 w-6 text-[#ABABAB]" />
									</div>
									<h3 className="mb-2 text-xl font-bold text-white">
										No courses found
									</h3>
									<p className="mb-6 text-[#ABABAB]">
										We couldnt find any courses matching your current filters.
									</p>
									<Button
										variant="outline"
										className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
										onClick={resetFilters}
									>
										Reset Filters
									</Button>
								</div>
							)}

							{/* Pagination - Only show if there are enough courses */}
							{courses.length > 6 && (
								<div className="mt-8 flex items-center justify-center">
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
											disabled
										>
											Previous
										</Button>
										<Button
											variant="outline"
											className="border-[#333333] bg-[#FF5500]/10 text-[#FF5500] hover:bg-[#FF5500]/20"
										>
											1
										</Button>
										<Button
											variant="outline"
											className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
										>
											2
										</Button>
										<Button
											variant="outline"
											className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
										>
											3
										</Button>
										<Button
											variant="outline"
											className="border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]"
										>
											Next
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CoursesPage;
