"use client";

import { useMemo } from "react";

import { PageWrapper } from "@/components/Layout/PageWrapper";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useProjectCount } from "@/hooks/useProjectCount";

import type { SectionId, SkillCategory } from "@/types";
import GithubSection from "@/components/Sections/GithubSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { SkillsSection } from "@/components/Sections/SkillsSection";
import { ContactSection } from "@/components/Sections/ContactSection";

export default function Home() {
	const currentTime = useCurrentTime();

	const {
		count: projectCount,
		loading: projectLoading,
		error: projectError,
	} = useProjectCount();

	const currentYear = useMemo(() => new Date().getFullYear(), []);

	const skillCategories: SkillCategory[] = [
		{
			title: "Frontend",
			skills: ["TypeScript", "React", "Vue", "Astro", "Angular"],
		},
		{
			title: "Backend",
			skills: ["Golang", "PostgreSQL", "Redis", "GCS", "Caddy"],
		},
		{
			title: "DevOps",
			skills: ["Docker", "Kubernetes"],
		},
		{
			title: "Systems",
			skills: ["Linux", "NixOS", "Ubuntu", "Fedora"],
		},
	];

	const about = {
		description:
			"Software engineer specializing in developing scalable web applications and system architectures.",
		location: "Vietnam",
	};

	const contact = {
		email: "contact@hoachnt.com",
		articlesCount: 11,
	};

	return (
		<PageWrapper>
			<Header name="Nguyen Tien Hoach" title="Developer" />

			<GithubSection id="github" />

			<AboutSection
				id="about"
				description={about.description}
				location={about.location}
				currentTime={currentTime}
			/>

			<SkillsSection id="skills" skillCategories={skillCategories} />

			<ContactSection
				id="contact"
				projectCount={projectCount}
				articlesCount={contact.articlesCount}
				email={contact.email}
			/>

			<Footer year={currentYear} author="Hoachnt" />
		</PageWrapper>
	);
}
