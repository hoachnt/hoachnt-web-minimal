// components/Header.tsx
import React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle"; // Убедитесь, что путь верный

interface HeaderProps {
	name: string;
	title: string;
}

export function Header({ name, title }: HeaderProps) {
	return (
		<motion.header
			className="flex justify-between items-center mb-8 sm:mb-12"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="flex items-center"
				whileHover={{ scale: 1.05 }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
			>
				{/* Профиль лого/инициалы */}
				<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111111] dark:bg-[#f5f5f1] text-[#f5f5f1] dark:text-[#111111] flex items-center justify-center text-xs sm:text-sm font-medium">
					{name
						.split(" ")
						.map((n) => n[0])
						.join("")}{" "}
					{/* Берем инициалы */}
				</div>
				<div className="ml-3">
					<h1 className="text-sm sm:text-base font-medium">{name}</h1>
					<p className="text-xs text-[#666666] dark:text-[#999999]">
						{title}
					</p>
				</div>
			</motion.div>
			<ThemeToggle />
		</motion.header>
	);
}
