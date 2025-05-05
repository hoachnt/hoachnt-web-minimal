// components/Sections/ContactSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { SectionId } from "@/types";
import { StatCard } from "@/components/Common/StatCard";
import { SocialLinks } from "@/components/Common/SocialLinks";

interface ContactSectionProps {
	id: SectionId;
	projectCount: number | null;
	articlesCount: number;
	email: string;
}

export function ContactSection({
	id,
	projectCount,
	articlesCount,
	email,
}: ContactSectionProps) {
	return (
		<motion.section
			id={id}
			className="mb-12 pt-4"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true, margin: "-100px" }}
		>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{/* Карточка проектов */}
				<StatCard count={projectCount} label="Projects" delay={0.2} />

				{/* Карточка статей */}
				<StatCard count={articlesCount} label="Articles" delay={0.3} />

				{/* Карточка контактов и социальных ссылок */}
				<motion.div
					className="md:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-3xl p-4 sm:p-6 flex items-center"
					whileHover={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300, damping: 10 }}
				>
					<div className="w-full">
						<h3 className="text-sm sm:text-base font-medium mb-2">
							Get in touch
						</h3>
						<p className="text-xs sm:text-sm text-[#666666] dark:text-[#999999] mb-4">
							{email}
						</p>
						<SocialLinks /> {/* Используем компонент SocialLinks */}
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}
