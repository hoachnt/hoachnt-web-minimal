import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GithubSection({ id }: { id: string }) {
	const [mounted, setMounted] = useState(false);
	const [imageTheme, setImageTheme] = useState<"default" | "dark">("default");
	const { theme } = useTheme();

	useEffect(() => {
		setMounted(true);
		// fallback-safe theme logic
		if (theme === "dark") {
			setImageTheme("dark");
		} else {
			setImageTheme("default");
		}
	}, [theme]);

	if (!mounted) {
		return <section id={id} className="mb-12 pt-4 space-y-6" />;
	}

	return (
		<motion.section
			id={id}
			className="mb-12 pt-4 space-y-6"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true, margin: "-100px" }}
		>
			<h1 className="text-3xl font-bold">Hi there 👋</h1>
			<div className="grid md:grid-cols-2 gap-4">
				<Image
					src={`https://github-readme-stats.vercel.app/api?username=hoachnt&show_icons=true&theme=${imageTheme}&border_radius=24&hide_rank=false&hide_border=true`}
					alt="GitHub Stats"
					width={500}
					height={200}
					className="w-full h-auto"
					unoptimized
					priority
				/>
				<Image
					src={`https://github-readme-stats.vercel.app/api/top-langs/?username=hoachnt&layout=compact&theme=${imageTheme}&border_radius=24&langs_count=6&hide=HTML&hide_border=true`}
					alt="Top Languages"
					width={500}
					height={200}
					className="w-full h-auto"
					unoptimized
					priority
				/>
			</div>
		</motion.section>
	);
}
