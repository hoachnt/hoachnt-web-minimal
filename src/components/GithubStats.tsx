import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

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

		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className="grid md:grid-cols-2 gap-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<img
					src={`https://github-readme-stats.vercel.app/api?username=hoachnt&show_icons=true&theme=${theme}&border_radius=24&hide_rank=false&hide_border=true`}
					alt="GitHub Stats"
					className="w-full h-auto rounded-3xl"
					loading="lazy"
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				<img
					src={`https://github-readme-stats.vercel.app/api/top-langs/?username=hoachnt&layout=compact&theme=${theme}&border_radius=24&langs_count=6&hide=HTML&hide_border=true`}
					alt="Top Languages"
					className="w-full h-auto rounded-3xl"
					loading="lazy"
				/>
			</motion.div>
		</div>
	);
}
