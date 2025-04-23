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
		<UiNavigationMenuLink asChild active={isActive}>
			<Link href={href}>{children}</Link>
		</UiNavigationMenuLink>
	);
};

export default NavigationMenuLink;
