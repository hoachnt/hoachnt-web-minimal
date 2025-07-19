import { type JSX } from "react";

// types/index.ts
export type SectionId = "about" | "skills" | "projects" | "blog" | "contact";

export type SocialLink = {
    icon: JSX.Element;
    href: string;
    label: string;
};

export type SkillCategory = {
    title: string;
    skills: string[];
};
