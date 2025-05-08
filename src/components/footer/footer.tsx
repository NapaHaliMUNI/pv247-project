import { Target } from 'lucide-react';
import Link from 'next/link';

const Footer = () => (
	<footer className="min-h-(footer-height) border-t border-[#2A2A2A] bg-[#121212] py-12">
		<div className="container mx-auto px-4">
			<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
				<div className="flex items-center gap-2">
					<div className="relative h-8 w-8">
						<div className="absolute inset-0 rounded-md bg-[#FF5500] opacity-20 blur-sm" />
						<div className="absolute inset-0 flex items-center justify-center">
							<Target className="h-5 w-5 text-[#FF5500]" />
						</div>
					</div>
					<span className="text-xl font-bold tracking-tight text-white">
						CS2 Academy
					</span>
				</div>

				<div className="flex flex-wrap justify-center gap-8">
					<div>
						<div className="mb-2 text-sm font-medium text-white">Platform</div>
						<ul className="space-y-2 text-sm text-[#ABABAB]">
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Courses
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Instructors
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Pricing
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<div className="mb-2 text-sm font-medium text-white">Resources</div>
						<ul className="space-y-2 text-sm text-[#ABABAB]">
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Blog
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Community
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Guides
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Support
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<div className="mb-2 text-sm font-medium text-white">Company</div>
						<ul className="space-y-2 text-sm text-[#ABABAB]">
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									About
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Careers
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Privacy
								</Link>
							</li>
							<li>
								<Link href="#" className="transition-colors hover:text-white">
									Terms
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="mt-12 border-t border-[#2A2A2A] pt-6 text-center text-sm text-[#ABABAB]">
				<p>
					© {new Date().getFullYear()} CS2 Academy. All rights reserved. Not
					affiliated with Valve Corporation.
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
