import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from '@/components/ui/navigation-menu';
import NavigationMenuLink from '@/components/navigation/navigation-menu-link';

const Navigation = () => (
	<div className="sticky top-0 z-100 bg-primary max-w-full flex items-center">
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem />
				<NavigationMenuItem>
					<NavigationMenuLink href="/">Courses</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="/feeds">Feeds</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="/profile">Profile</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="/new-course">New Course</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</div>
);

export default Navigation;
