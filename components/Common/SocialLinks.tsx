// components/Common/SocialLinks.tsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SocialLink } from "@/types"; // Убедитесь, что путь верный
import { Github, Linkedin, Mail } from "lucide-react"; // Пример импорта иконок

// Пример данных (можно передавать извне)
const defaultSocialLinks: SocialLink[] = [
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
];

interface SocialLinksProps {
	links?: SocialLink[];
}

export function SocialLinks({ links = defaultSocialLinks }: SocialLinksProps) {
	return (
		<div className="flex space-x-3">
			{links.map((social) => (
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
						<span className="sr-only">{social.label}</span>
					</Link>
				</motion.div>
			))}
		</div>
	);
}
