import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";

/**
 * Stubbed ThemeProvider
 * – Keeps legacy imports happy after the Astro migration.
 * – Does **not** do any real theming; adjust or replace if you need full
 *   dark-/light-mode handling inside React islands.
 */
export function ThemeProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return <>{children}</>;
}

export default ThemeProvider;
