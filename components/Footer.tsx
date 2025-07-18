"use client";

import { motion } from "framer-motion";

interface FooterProps {
	year: number;
	author: string;
}

export function Footer({ year, author }: FooterProps) {
	return (
		<motion.footer
			className="flex flex-col items-center mb-8"
			initial="hidden"
			whileInView="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { delay: 0.2, duration: 0.6 },
				},
			}}
			viewport={{ once: true }}
		>
			{/* Анимированный круглый логотип */}
			<motion.div
				className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111111] dark:bg-[#f5f5f1] flex items-center justify-center mb-4"
				whileHover={{ rotate: 180 }}
				transition={{ duration: 0.8 }}
			>
				<div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f5f5f1] dark:bg-[#111111] rounded-xs" />
			</motion.div>

			<p className="text-center text-xs sm:text-sm text-[#666666] dark:text-[#999999]">
				© {year ?? new Date().getFullYear()} •{" "}
				{author ?? "Unknown Author"}
			</p>
		</motion.footer>
	);
}
