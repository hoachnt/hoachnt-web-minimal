"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SocialLink } from "@/types";

const defaultSocialLinks: SocialLink[] = [
	{
		icon: <Github size={18} />,
		href: "https://github.com/hoachnt",
		label: "GitHub",
	},
	{
		icon: <Linkedin size={18} />,
		href: "https://www.linkedin.com/in/hoachnt/",
		label: "LinkedIn",
	},
	{
		icon: <Mail size={18} />,
		href: "mailto:contact@hoachnt.com",
		label: "Email",
	},
];

interface SocialLinksProps {
	links?: SocialLink[];
	className?: string;
}

export function SocialLinks({
	links = defaultSocialLinks,
	className,
}: SocialLinksProps) {
	return (
		<div className={cn("flex gap-3", className)}>
			{links.map((social) => (
				<motion.div
					key={social.label}
					whileHover={{ y: -3 }}
					whileTap={{ scale: 0.97 }}
				>
					<Link
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						className="w-9 h-9 rounded-full bg-muted flex items-center justify-center transition-colors hover:bg-accent"
					>
						{social.icon}
					</Link>
				</motion.div>
			))}
		</div>
	);
}
