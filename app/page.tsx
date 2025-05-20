// app/page.tsx
"use client";

import { SectionId, SkillCategory } from "@/types"; // Убедитесь, что пути верны
import { PageWrapper } from "@/components/Layout/PageWrapper"; // Убедитесь, что пути верны
import { Header } from "@/components/Header"; // Убедитесь, что пути верны
import { Nav } from "@/components/Navigation/Nav"; // Убедитесь, что пути верны
import { AboutSection } from "@/components/Sections/AboutSection"; // Убедитесь, что пути верны
import { SkillsSection } from "@/components/Sections/SkillsSection"; // Убедитесь, что пути верны
import { ContactSection } from "@/components/Sections/ContactSection"; // Убедитесь, что пути верны
import { Footer } from "@/components/Footer"; // Убедитесь, что пути верны

import { useCurrentTime } from "@/hooks/useCurrentTime"; // Убедитесь, что пути верны
import { useProjectCount } from "@/hooks/useProjectCount"; // Убедитесь, что пути верны
import { useScrollSpy } from "@/hooks/useScrollSpy"; // Убедитесь, что пути верны

// Данные для секций (вынесены, чтобы их было легко менять или получать из API)
const sections: SectionId[] = ["about", "skills", "contact"]; // 'projects' and 'blog' were not full sections in original HTML

const skillCategoriesData: SkillCategory[] = [
	{
		title: "Frontend",
		skills: ["TypeScript", "React", "Vue", "Astro", "Angular"],
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
];

const aboutData = {
	description:
		"Software engineer specializing in developing scalable web applications and system architectures.",
	location: "Vietnam",
	// currentTime будет браться из хука
};

const contactData = {
	email: "contact@hoachnt.com",
	articlesCount: 11, // Статичное число из оригинала
	// projectCount будет браться из хука
	// socialLinksData уже в SocialLinks, но можно передавать отсюда
};

export default function Home() {
	// Используем хуки для получения данных и состояния
	const currentTime = useCurrentTime();
	const {
		count: projectCount,
		loading: projectsLoading,
		error: projectsError,
	} = useProjectCount();
	const visibleSections = useScrollSpy(sections); // Отслеживаем видимость секций

	// Функция для плавного скролла (можно было бы вставить в useScrollSpy, но здесь она управляется страницей)
	const scrollToSection = (sectionId: SectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			window.scrollTo({
				top: section.offsetTop - 100, // Небольшое смещение
				behavior: "smooth",
			});
		}
	};

	// Определяем единственную активную секцию для навигации
	// Берем первую видимую секцию или null, если ничего не видно
	const activeSection =
		visibleSections.length > 0 ? visibleSections[0] : null;
	// В более сложной логике useScrollSpy может сам возвращать активную секцию

	return (
		<PageWrapper>
			<Header name="Nguyen Tien Hoach" title="Developer" />

			<Nav
				sections={sections}
				activeSection={activeSection}
				onSelectSection={scrollToSection} // Передаем функцию скролла
			/>

			<AboutSection
				id="about"
				description={aboutData.description}
				location={aboutData.location}
				currentTime={currentTime}
			/>

			<SkillsSection id="skills" skillCategories={skillCategoriesData} />

			<ContactSection
				id="contact"
				projectCount={projectCount}
				articlesCount={contactData.articlesCount}
				email={contactData.email}
			/>

			<Footer year={new Date().getFullYear()} author="Hoachnt" />
		</PageWrapper>
	);
}
