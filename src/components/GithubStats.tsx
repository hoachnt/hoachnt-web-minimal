"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GithubStats() {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"default" | "dark">("default");

	useEffect(() => {
		setMounted(true);

		const updateTheme = () => {
			const isDark = document.documentElement.classList.contains("dark");
			setTheme(isDark ? "dark" : "default");
		};

		updateTheme();

		// Listen for theme changes
		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	if (!mounted) {
		return (
			<div className="grid md:grid-cols-2 gap-4">
				<div className="w-full h-48 bg-muted rounded-3xl animate-pulse"></div>
				<div className="w-full h-48 bg-muted rounded-3xl animate-pulse"></div>
			</div>
		);
	}

	return (
		<motion.div
			className="grid md:grid-cols-2 gap-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<img
				src={`https://github-readme-stats.vercel.app/api?username=hoachnt&show_icons=true&theme=${theme}&border_radius=24&hide_rank=false&hide_border=true`}
				alt="GitHub Stats"
				className="w-full h-auto"
				loading="lazy"
			/>
			<img
				src={`https://github-readme-stats.vercel.app/api/top-langs/?username=hoachnt&layout=compact&theme=${theme}&border_radius=24&langs_count=6&hide=HTML&hide_border=true`}
				alt="Top Languages"
				className="w-full h-auto"
				loading="lazy"
			/>
		</motion.div>
	);
}
