"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import clsx from "clsx";

interface HeaderProps {
	name: string;
	title: string;
}

export function Header({ name, title }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const headerClasses = clsx(
		"sticky top-0 left-0 z-10 flex items-center justify-between transition-all duration-300 mb-8 sm:mb-12",
		scrolled &&
			"backdrop-blur-sm bg-background/50 p-6 sm:p-8 rounded-3xl top-4"
	);

	return (
		<motion.header
			className={headerClasses}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<UserAvatar name={name} title={title} />
			<ThemeToggle />
		</motion.header>
	);
}

function UserAvatar({ name, title }: HeaderProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.section
					className="flex items-center cursor-pointer"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
				>
					<Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center">
						<AvatarImage
							src="/me.jpg"
							alt="Me"
							className="object-cover"
						/>
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div className="ml-3">
						<h1 className="text-sm sm:text-base font-medium">
							{name}
						</h1>
						<p className="text-xs text-muted-foreground">{title}</p>
					</div>
				</motion.section>
			</DialogTrigger>
			<DialogContent className="rounded-4xl border-none p-0">
				<Image
					src="/me.jpg"
					alt="Me"
					width={600}
					height={600}
					className="w-full h-auto max-w-2xl rounded-4xl object-cover"
					sizes="(max-width: 768px) 100vw, 600px"
					style={{ aspectRatio: "1 / 1" }}
					priority
				/>
			</DialogContent>
		</Dialog>
	);
}
