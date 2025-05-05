// components/Common/StatCard.tsx
import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
	count: number | string | null; // Может быть число, строка "Loading..." или null
	label: string;
	delay?: number; // Задержка для анимации
}

export function StatCard({ count, label, delay = 0 }: StatCardProps) {
	return (
		<motion.div
			className="bg-white dark:bg-[#1a1a1a] rounded-full aspect-square flex items-center justify-center"
			whileHover={{ scale: 1.05 }}
			transition={{ type: "spring", stiffness: 300, damping: 10 }}
		>
			<motion.div
				className="text-center"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: delay, duration: 0.5 }}
			>
				<p className="text-lg sm:text-xl font-medium">
					{count !== null ? count : "Loading..."}
				</p>
				<p className="text-xs text-[#666666] dark:text-[#999999]">
					{label}
				</p>
			</motion.div>
		</motion.div>
	);
}
