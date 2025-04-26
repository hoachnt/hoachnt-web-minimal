"use client";

import { useState, useEffect, JSX } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle(): JSX.Element {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div
				className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5e5e1] dark:bg-[#222222] flex items-center justify-center"
				aria-hidden="true"
			>
				<div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#111111] dark:bg-[#f5f5f1] rounded-sm"></div>
			</div>
		);
	}

	const handleThemeToggle = (): void => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<motion.button
			onClick={handleThemeToggle}
			className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5e5e1] dark:bg-[#222222] flex items-center justify-center transition-colors"
			aria-label="Toggle theme"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<motion.div
				className="w-3 h-3 sm:w-4 sm:h-4 bg-[#111111] dark:bg-[#f5f5f1] rounded-sm"
				animate={{ rotate: theme === "dark" ? 180 : 0 }}
				transition={{ duration: 0.5 }}
			/>
		</motion.button>
	);
}
