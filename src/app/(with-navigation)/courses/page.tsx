// TODO: dont forget to force dynamic basically everywhere

import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import DifficultyFilter from '@/components/courses/filters/difficulty-filter';
import CategoryFilter from '@/components/courses/filters/category-filter';
import Searchbar from '@/components/courses/searchbar/searchbar';
import Sort from '@/components/courses/sort/sort';
import DurationFilter from '@/components/courses/filters/duration-filter';
import ResetFiltersButton from '@/components/courses/filters/reset-filters-button';
import CourseList from '@/components/courses/course/course-list';
import { CoursesCount } from '@/components/courses/courses-count';
import { CoursesPagination } from '@/components/courses/courses-pagination';

const CoursesPage = () => (
	<section className="p-4 md:p-8">
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
							<SheetHeader>
								<SheetTitle>Filters</SheetTitle>
								<SheetDescription>
									Filter courses by difficulty, category, and duration.
								</SheetDescription>
							</SheetHeader>

							<div className="px-4">
								<div className="space-y-6">
									<DifficultyFilter />
									<CategoryFilter />
									<DurationFilter />

									<ResetFiltersButton />
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<div className="hidden w-full max-w-[280px] shrink-0 lg:block">
					<div className="sticky top-[calc(var(--navigation-height)+32px)] rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6">
						<div className="mb-6 flex items-center justify-between">
							<h3 className="text-lg font-semibold">Filters</h3>
							<ResetFiltersButton
								variant="ghost"
								className="h-auto w-fit p-2 text-sm text-[#FF5500] hover:bg-transparent hover:text-[#FF5500]/90"
							/>
						</div>

						<div className="space-y-6">
							<DifficultyFilter />
							<CategoryFilter />
							<DurationFilter />
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

					<CoursesCount />
					<CourseList />
					<CoursesPagination />
				</div>
			</div>
		</div>
	</section>
);

export default CoursesPage;
