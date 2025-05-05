// components/Sections/AboutSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { SectionId } from "@/types";
interface AboutSectionProps {
	id: SectionId;
	description: string;
	location: string;
	currentTime: string;
}

export function AboutSection({
	id,
	description,
	location,
	currentTime,
}: AboutSectionProps) {
	return (
		<motion.section
			id={id}
			className="mb-12 pt-4"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true, margin: "-100px" }}
		>
			<motion.div
				className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8"
				whileHover={{ scale: 1.02 }}
				transition={{ type: "spring", stiffness: 300, damping: 10 }}
			>
				<p className="text-sm sm:text-base mb-4">{description}</p>
				<div className="text-xs sm:text-sm text-[#666666] dark:text-[#999999]">
					<p>
						{location} • {currentTime}
					</p>
				</div>
			</motion.div>
		</motion.section>
	);
}
