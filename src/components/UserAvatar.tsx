"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import MyImage from "@/images/me.jpg";

interface UserAvatarProps {
	name: string;
	title: string;
}

export default function UserAvatar({ name, title }: UserAvatarProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<motion.div
					className="flex items-center cursor-pointer select-none"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				>
					<Avatar className="w-10 h-10 sm:w-12 sm:h-12">
						<AvatarImage
							src={MyImage.src}
							alt={name}
							loading="lazy"
							className="object-cover"
						/>
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div className="ml-3 text-left">
						<p className="text-sm sm:text-base font-medium leading-none">
							{name}
						</p>
						<p className="text-xs text-muted-foreground">{title}</p>
					</div>
				</motion.div>
			</DialogTrigger>

			<DialogContent className="max-w-xl p-0 overflow-hidden bg-transparent shadow-none border-0">
				<div className="relative w-full">
					<img
						src={MyImage.src}
						alt={name}
						loading="lazy"
						className="w-full h-auto rounded-3xl object-cover aspect-square"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
