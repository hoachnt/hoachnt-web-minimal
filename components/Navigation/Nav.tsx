// components/Navigation/Nav.tsx
import React, { MouseEvent, useRef } from "react";
import { motion } from "framer-motion";
import { SectionId } from "@/types"; 

interface NavProps {
	sections: SectionId[];
	activeSection: SectionId | null; // Активная секция (из useScrollSpy)
	onSelectSection: (sectionId: SectionId) => void; // Колбэк для скролла
}

export function Nav({ sections, activeSection, onSelectSection }: NavProps) {
	const navRef = useRef<HTMLDivElement | null>(null);

	// Плавный скролл к секции
	const handleScrollToSection = (
		e: MouseEvent<HTMLAnchorElement>,
		sectionId: SectionId
	) => {
		e.preventDefault();
		onSelectSection(sectionId); // Вызываем колбэк, который будет выполнять скролл
	};

	return (
		<div
			className="sticky top-0 z-50 py-4 bg-[#f5f5f1] dark:bg-[#111111]"
			ref={navRef}
		>
			<motion.nav
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="flex space-x-2 sm:space-x-4 overflow-x-auto py-1 scrollbar-hide">
					{sections.map((section) => (
						<a
							key={section}
							href={`#${section}`}
							onClick={(e) => handleScrollToSection(e, section)}
							className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
								activeSection === section
									? "bg-[#111111] dark:bg-[#f5f5f1] text-[#f5f5f1] dark:text-[#111111]"
									: "bg-[#e5e5e1] dark:bg-[#222222] text-[#111111] dark:text-[#f5f5f1]"
							}`}
						>
							{section.charAt(0).toUpperCase() + section.slice(1)}
						</a>
					))}
				</div>
			</motion.nav>
		</div>
	);
}
