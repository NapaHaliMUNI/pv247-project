import { Target } from 'lucide-react';
import Link from 'next/link';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from '@/components/ui/navigation-menu';
import NavigationMenuLink from '@/components/navigation/navigation-menu-link';
import { Button } from '@/components/ui/button';

const Navigation = () => (
	<header className="bg-background sticky top-0 z-100 border-b border-[#2A2A2A]">
		<div className="container mx-auto p-3">
			<nav className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="relative h-8 w-8">
						<div className="absolute inset-0 rounded-md bg-[#FF5500] opacity-40 blur-sm" />
						<div className="absolute inset-0 flex items-center justify-center">
							<Target className="h-5 w-5 text-[#FF5500]" />
						</div>
					</div>
					<Link
						href="/"
						className="text-xl font-bold tracking-tight text-white"
					>
						CS2 Academy
					</Link>
				</div>
				<div className="hidden items-center space-x-6 md:flex">
					<NavigationMenuLink href="/">Courses</NavigationMenuLink>
					<NavigationMenuLink href="/feeds">Feeds</NavigationMenuLink>
				</div>
				<div className="flex items-center gap-3">
					<Link href="/login">
						<Button variant="outline">Log In</Button>
					</Link>
					<Link href="/register">
						<Button>Join Now</Button>
					</Link>
				</div>
			</nav>
		</div>
	</header>
);

export default Navigation;
