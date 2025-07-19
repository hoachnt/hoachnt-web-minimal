"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
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

export default function SocialLinks() {
	return (
		<div className="flex gap-3">
			{socialLinks.map((social) => (
				<motion.div
					key={social.label}
					whileHover={{ y: -3 }}
					whileTap={{ scale: 0.97 }}
				>
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						className="w-9 h-9 rounded-full bg-muted flex items-center justify-center transition-colors hover:bg-accent"
					>
						{social.icon}
					</a>
				</motion.div>
			))}
		</div>
	);
}
