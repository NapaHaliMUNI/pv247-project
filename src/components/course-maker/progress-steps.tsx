import { useCourseMakerContext } from '@/store/course-maker/course-maker-context';

export const ProgressSteps = () => {
	const { currentStep } = useCourseMakerContext();

	return (
		<div className="mb-8">
			<div className="mx-auto flex max-w-3xl items-center justify-between">
				<div className="flex flex-col items-center">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full ${
							currentStep >= 1
								? 'bg-[#FF5500] text-white'
								: 'bg-[#2A2A2A] text-[#ABABAB]'
						}`}
					>
						1
					</div>
					<span
						className={`mt-2 text-sm ${currentStep >= 1 ? 'text-white' : 'text-[#ABABAB]'}`}
					>
						Course Details
					</span>
				</div>
				<div
					className={`mx-2 h-1 flex-1 ${currentStep >= 2 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
				/>
				<div className="flex flex-col items-center">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full ${
							currentStep >= 2
								? 'bg-[#FF5500] text-white'
								: 'bg-[#2A2A2A] text-[#ABABAB]'
						}`}
					>
						2
					</div>
					<span
						className={`mt-2 text-sm ${currentStep >= 2 ? 'text-white' : 'text-[#ABABAB]'}`}
					>
						Lessons
					</span>
				</div>
				<div
					className={`mx-2 h-1 flex-1 ${currentStep >= 3 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
				/>
				<div className="flex flex-col items-center">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full ${
							currentStep >= 3
								? 'bg-[#FF5500] text-white'
								: 'bg-[#2A2A2A] text-[#ABABAB]'
						}`}
					>
						3
					</div>
					<span
						className={`mt-2 text-sm ${currentStep >= 3 ? 'text-white' : 'text-[#ABABAB]'}`}
					>
						Questions
					</span>
				</div>
				<div
					className={`mx-2 h-1 flex-1 ${currentStep >= 4 ? 'bg-[#FF5500]' : 'bg-[#2A2A2A]'}`}
				/>
				<div className="flex flex-col items-center">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full ${
							currentStep >= 4
								? 'bg-[#FF5500] text-white'
								: 'bg-[#2A2A2A] text-[#ABABAB]'
						}`}
					>
						4
					</div>
					<span
						className={`mt-2 text-sm ${currentStep >= 4 ? 'text-white' : 'text-[#ABABAB]'}`}
					>
						Review
					</span>
				</div>
			</div>
		</div>
	);
};
