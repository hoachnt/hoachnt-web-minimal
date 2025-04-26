"use client";

import { useState, useEffect, useRef, JSX, MouseEvent } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

type SectionId = "about" | "skills" | "projects" | "blog" | "contact";

type SocialLink = {
	icon: JSX.Element;
	href: string;
	label: string;
};

export default function Home() {
	const [currentTime, setCurrentTime] = useState<string>("");
	const [visibleSections, setVisibleSections] = useState<SectionId[]>([
		"about",
	]);
	const navRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const options: Intl.DateTimeFormatOptions = {
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "Asia/Ho_Chi_Minh",
			};
			setCurrentTime(now.toLocaleTimeString("en-US", options) + " ICT");
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		// Обработчик прокрутки для отслеживания видимых секций
		const handleScroll = () => {
			const sections =
				document.querySelectorAll<HTMLElement>("section[id]");
			const visible: SectionId[] = [];

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				if (rect.top < windowHeight && rect.bottom > 0) {
					visible.push(section.getAttribute("id") as SectionId);
				}
			});

			if (JSON.stringify(visible) !== JSON.stringify(visibleSections)) {
				setVisibleSections(visible);
			}
		};

		// Первоначальная проверка и добавление слушателя событий
		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			clearInterval(interval);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [visibleSections]);

	// Smooth scroll to section when clicking nav links
	const scrollToSection = (
		e: MouseEvent<HTMLAnchorElement>,
		sectionId: SectionId
	) => {
		e.preventDefault();
		const section = document.getElementById(sectionId);
		if (section) {
			window.scrollTo({
				top: section.offsetTop - 100,
				behavior: "smooth",
			});
		}
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};

	return (
		<main className="min-h-screen bg-[#f5f5f1] dark:bg-[#111111] text-[#111111] dark:text-[#f5f5f1] font-sans antialiased">
			<div className="container mx-auto px-4 py-8 sm:py-12 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
				<motion.header
					className="flex justify-between items-center mb-8 sm:mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						className="flex items-center"
						whileHover={{ scale: 1.05 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 10,
						}}
					>
						<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111111] dark:bg-[#f5f5f1] text-[#f5f5f1] dark:text-[#111111] flex items-center justify-center text-xs sm:text-sm font-medium">
							NT
						</div>
						<div className="ml-3">
							<h1 className="text-sm sm:text-base font-medium">
								Nguyen Tien Hoach
							</h1>
							<p className="text-xs text-[#666666] dark:text-[#999999]">
								Developer
							</p>
						</div>
					</motion.div>
					<ThemeToggle />
				</motion.header>

				<div
					className="sticky top-0 z-50 py-4 bg-[#f5f5f1] dark:bg-[#111111]"
					ref={navRef}
				>
					<motion.nav
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="flex space-x-2 sm:space-x-4 overflow-x-auto py-1 scrollbar-hide">
							{(
								["about", "skills", "contact"] as SectionId[]
							).map((section) => (
								<a
									key={section}
									href={`#${section}`}
									onClick={(e) => scrollToSection(e, section)}
									className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
										visibleSections.includes(section)
											? "bg-[#111111] dark:bg-[#f5f5f1] text-[#f5f5f1] dark:text-[#111111]"
											: "bg-[#e5e5e1] dark:bg-[#222222] text-[#111111] dark:text-[#f5f5f1]"
									}`}
								>
									{section.charAt(0).toUpperCase() +
										section.slice(1)}
								</a>
							))}
						</div>
					</motion.nav>
				</div>

				<motion.section
					id="about"
					className="mb-12 pt-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-100px" }}
				>
					<motion.div
						className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 sm:p-8"
						whileHover={{ scale: 1.02 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 10,
						}}
					>
						<p className="text-sm sm:text-base mb-4">
							Software engineer specializing in developing
							scalable web applications and system architectures.
						</p>
						<div className="text-xs sm:text-sm text-[#666666] dark:text-[#999999]">
							<p>Vietnam • {currentTime}</p>
						</div>
					</motion.div>
				</motion.section>

				<motion.section
					id="skills"
					className="mb-12 pt-4"
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
				>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{
								title: "Frontend",
								skills: [
									"TypeScript",
									"React",
									"Vue",
									"Astro",
									"Angular",
								],
							},
							{
								title: "Backend",
								skills: ["Golang", "PostgreSQL"],
							},
							{
								title: "DevOps",
								skills: ["Docker", "Kubernetes"],
							},
							{ title: "Systems", skills: ["Linux", "NixOS"] },
						].map((category, index) => (
							<motion.div
								key={category.title}
								className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-4 sm:p-6"
								variants={item}
								whileHover={{
									scale: 1.05,
									boxShadow:
										"0 10px 30px -15px rgba(0, 0, 0, 0.1)",
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 10,
								}}
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
						))}
					</div>
				</motion.section>

				<motion.section
					id="contact"
					className="mb-12 pt-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-100px" }}
				>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<motion.div
							className="bg-white dark:bg-[#1a1a1a] rounded-full aspect-square flex items-center justify-center"
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 10,
							}}
						>
							<motion.div
								className="text-center"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.5 }}
							>
								<p className="text-lg sm:text-xl font-medium">
									19
								</p>
								<p className="text-xs text-[#666666] dark:text-[#999999]">
									Projects
								</p>
							</motion.div>
						</motion.div>
						<motion.div
							className="bg-white dark:bg-[#1a1a1a] rounded-full aspect-square flex items-center justify-center"
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 10,
							}}
						>
							<motion.div
								className="text-center"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.3, duration: 0.5 }}
							>
								<p className="text-lg sm:text-xl font-medium">
									11
								</p>
								<p className="text-xs text-[#666666] dark:text-[#999999]">
									Articles
								</p>
							</motion.div>
						</motion.div>
						<motion.div
							className="md:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-3xl p-4 sm:p-6 flex items-center"
							whileHover={{ scale: 1.02 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 10,
							}}
						>
							<div className="w-full">
								<h3 className="text-sm sm:text-base font-medium mb-2">
									Get in touch
								</h3>
								<p className="text-xs sm:text-sm text-[#666666] dark:text-[#999999] mb-4">
									contact@hoachnt.com
								</p>
								<div className="flex space-x-3">
									{(
										[
											{
												icon: <Github size={16} />,
												href: "https://github.com/hoachnt",
												label: "GitHub",
											},
											{
												icon: <Linkedin size={16} />,
												href: "https://www.linkedin.com/in/hoachnt/",
												label: "LinkedIn",
											},
											{
												icon: <Mail size={16} />,
												href: "mailto:contact@hoachnt.com",
												label: "Email",
											},
										] as SocialLink[]
									).map((social) => (
										<motion.div
											key={social.label}
											whileHover={{ y: -5 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link
												href={social.href}
												target="_blank"
												className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#e5e5e1] dark:bg-[#222222] flex items-center justify-center"
											>
												{social.icon}
												<span className="sr-only">
													{social.label}
												</span>
											</Link>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</motion.section>

				<motion.footer
					className="flex flex-col items-center mb-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<motion.div
						className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111111] dark:bg-[#f5f5f1] flex items-center justify-center mb-4"
						whileHover={{ rotate: 180 }}
						transition={{ duration: 0.8 }}
					>
						<div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f5f5f1] dark:bg-[#111111] rounded-xs"></div>
					</motion.div>
					<div className="text-center text-xs sm:text-sm text-[#666666] dark:text-[#999999]">
						<p>© {new Date().getFullYear()} • Hoachnt</p>
					</div>
				</motion.footer>
			</div>
		</main>
	);
}
