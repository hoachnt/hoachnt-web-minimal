import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("theme") as
			| "light"
			| "dark"
			| null;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
		setTheme(initialTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	if (!mounted) {
		return (
			<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5e5e1] dark:bg-[#222222] flex items-center justify-center">
				<div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#111111] dark:bg-[#f5f5f1] rounded-sm"></div>
			</div>
		);
	}

	return (
		<motion.button
			onClick={toggleTheme}
			className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5e5e1] dark:bg-[#222222] flex items-center justify-center transition-colors cursor-pointer"
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
