"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface UserAvatarProps {
	name: string;
	title: string;
}

export default function UserAvatar({ name, title }: UserAvatarProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<motion.section
				className="flex items-center cursor-pointer"
				whileHover={{ scale: 1.05 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				onClick={() => setIsDialogOpen(true)}
			>
				<div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full overflow-hidden">
					<img
						src="/me.jpg"
						alt={name}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="ml-3">
					<h1 className="text-sm sm:text-base font-medium">{name}</h1>
					<p className="text-xs text-muted-foreground">{title}</p>
				</div>
			</motion.section>

			{isDialogOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={() => setIsDialogOpen(false)}
				>
					<div className="relative max-w-2xl w-full">
						<img
							src="/me.jpg"
							alt={name}
							className="w-full h-auto rounded-3xl object-cover"
							style={{ aspectRatio: "1 / 1" }}
						/>
						<button
							onClick={() => setIsDialogOpen(false)}
							className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-300/30 dark:bg-stone-600/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-stone-300/50 dark:hover:bg-stone-600/80 transition-colors"
						>
							×
						</button>
					</div>
				</div>
			)}
		</>
	);
}
