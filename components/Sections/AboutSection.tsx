"use client";

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
	const showTime = typeof window !== "undefined";

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
				className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#1a1a1a]"
				whileHover={{ scale: 1.02 }}
				transition={{ type: "spring", stiffness: 300, damping: 15 }}
			>
				<p className="text-sm sm:text-base mb-4">{description}</p>

				<p className="text-xs sm:text-sm text-[#666] dark:text-[#999]">
					{location} • {showTime && currentTime}
				</p>
			</motion.div>
		</motion.section>
	);
}
