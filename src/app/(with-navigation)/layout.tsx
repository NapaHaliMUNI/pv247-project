import { type PropsWithChildren } from 'react';

import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';

const WithNavigationLayout = ({ children }: PropsWithChildren) => (
	<div className="grid grid-rows-[var(--navigation-height)_1fr_var(--footer-height)]">
		<Navigation />
		<div className="min-h-[calc(100dvh-var(--navigation-height)-var(--footer-height))] p-4 md:p-8">
			{children}
		</div>
		<Footer />
	</div>
);

export default WithNavigationLayout;
