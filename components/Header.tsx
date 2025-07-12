// components/Header.tsx
import React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle"; // Убедитесь, что путь верный
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

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
						{/* Профиль лого/инициалы */}
						<Avatar className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111111] dark:bg-[#f5f5f1] flex items-center justify-center">
							<AvatarImage src="/me.jpg" alt="Me" />
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
						priority={false}
						sizes="(max-width: 768px) 100vw, 600px"
						style={{ aspectRatio: "1 / 1" }}
					/>
				</DialogContent>
			</Dialog>
			<ThemeToggle />
		</motion.header>
	);
}
