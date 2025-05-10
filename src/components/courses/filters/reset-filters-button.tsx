'use client';

import { type ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { Button, type buttonVariants } from '@/components/ui/button';
import { useFiltersContext } from '@/store/courses/filters-context';
import { cn } from '@/lib/utils';

const ResetFiltersButton = ({
	className,
	variant,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>) => {
	const { resetFilters } = useFiltersContext();
	return (
		<Button
			variant={variant ?? 'outline'}
			className={cn(
				'w-full border-[#333333] bg-transparent text-white hover:bg-[#1F1F1F]',
				className
			)}
			onClick={resetFilters}
			{...props}
		>
			Reset Filters
		</Button>
	);
};

export default ResetFiltersButton;
