// components/Sections/SkillsSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { SectionId, SkillCategory } from "@/types";

// Варианты анимации для контейнера и элементов
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
};

interface SkillsSectionProps {
	id: SectionId;
	skillCategories: SkillCategory[];
}

// Компонент для одной категории навыков
interface SkillCategoryCardProps {
	category: SkillCategory;
	variants: Variants;
}

function SkillCategoryCard({ category, variants }: SkillCategoryCardProps) {
	return (
		<motion.div
			key={category.title}
			className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-4 sm:p-6"
			variants={variants}
			whileHover={{
				scale: 1.05,
				boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
			}}
			transition={{ type: "spring", stiffness: 300, damping: 10 }}
		>
			<h2 className="text-xs sm:text-sm font-medium mb-3">
				{category.title}
			</h2>
			<ul className="text-xs space-y-1 text-[#666666] dark:text-[#999999]">
				{category.skills.map((skill) => (
					<li key={skill}>{skill}</li>
				))}
			</ul>
		</motion.div>
	);
}

export function SkillsSection({ id, skillCategories }: SkillsSectionProps) {
	return (
		<motion.section
			id={id}
			className="mb-12 pt-4"
			variants={containerVariants} // Применяем варианты контейнера
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-100px" }}
		>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{skillCategories.map((category) => (
					// Рендерим отдельный компонент для каждой категории
					<SkillCategoryCard
						key={category.title}
						category={category}
						variants={itemVariants} // Передаем варианты элемента
					/>
				))}
			</div>
		</motion.section>
	);
}
