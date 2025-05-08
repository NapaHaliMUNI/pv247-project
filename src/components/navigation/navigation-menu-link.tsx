'use client';

import Link from 'next/link';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

import { NavigationMenuLink as UiNavigationMenuLink } from '@/components/ui/navigation-menu';

const NavigationMenuLink = ({
	href,
	children
}: {
	href: string;
	children?: ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = href === pathname;
	return (
		<Link
			href={href}
			className={
				isActive
					? 'text-foreground border-b-2 border-[#FF5500] py-1 text-sm font-medium'
					: 'text-foreground/90 hover:text-foreground border-b-2 border-transparent py-1 text-sm font-medium transition-colors'
			}
		>
			{children}
		</Link>
	);
};

export default NavigationMenuLink;
