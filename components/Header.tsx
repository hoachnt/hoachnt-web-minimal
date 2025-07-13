"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import clsx from "clsx";

interface HeaderProps {
	name: string;
	title: string;
}

export function Header({ name, title }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = useCallback(() => {
		setScrolled(window.scrollY > 10);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	const headerClasses = clsx(
		"sticky top-0 left-0 z-10 flex items-center justify-between transition-all duration-300 mb-8 sm:mb-12",
		{
			"backdrop-blur-sm bg-background/50 p-6 sm:p-8 rounded-3xl top-4":
				scrolled,
		}
	);

	return (
		<motion.header
			className={headerClasses}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Dialog>
				<DialogTrigger asChild>
					<motion.section
						className="flex items-center cursor-pointer"
						whileHover={{ scale: 1.05 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 10,
						}}
					>
						<Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111111] dark:bg-[#f5f5f1] flex items-center justify-center">
							<AvatarImage
								src="/me.jpg"
								alt="Me"
								className="object-cover"
							/>
							<AvatarFallback>{name}</AvatarFallback>
						</Avatar>
						<div className="ml-3">
							<h1 className="text-sm sm:text-base font-medium">
								{name}
							</h1>
							<p className="text-xs text-[#666666] dark:text-[#999999]">
								{title}
							</p>
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
					/>
				</DialogContent>
			</Dialog>
			<ThemeToggle />
		</motion.header>
	);
}
