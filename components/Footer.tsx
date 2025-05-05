// components/Footer.tsx
import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
	year: number;
	author: string;
}

export function Footer({ year, author }: FooterProps) {
	return (
		<motion.footer
			className="flex flex-col items-center mb-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.5, duration: 0.5 }}
		>
			{/* Анимированный элемент футера */}
			<motion.div
				className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111111] dark:bg-[#f5f5f1] flex items-center justify-center mb-4"
				whileHover={{ rotate: 180 }}
				transition={{ duration: 0.8 }}
			>
				<div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f5f5f1] dark:bg-[#111111] rounded-xs"></div>
			</motion.div>
			<div className="text-center text-xs sm:text-sm text-[#666666] dark:text-[#999999]">
				<p>
					© {year} • {author}
				</p>
			</div>
		</motion.footer>
	);
}
