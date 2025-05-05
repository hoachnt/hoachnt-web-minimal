// components/Layout/PageWrapper.tsx
import React from "react";

interface PageWrapperProps {
	children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
	return (
		<main className="min-h-screen bg-[#f5f5f1] dark:bg-[#111111] text-[#111111] dark:text-[#f5f5f1] font-sans antialiased">
			<div className="container mx-auto px-4 py-8 sm:py-12 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
				{children}
			</div>
		</main>
	);
}
