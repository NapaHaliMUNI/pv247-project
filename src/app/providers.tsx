'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import { FiltersContextProvider } from '@/store/filters-context';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<FiltersContextProvider>{children}</FiltersContextProvider>
	</QueryClientProvider>
);
