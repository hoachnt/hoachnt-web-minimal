import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

// Font configuration
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

// App-wide metadata
export const metadata: Metadata = {
	title: "Nguyen Tien Hoach – Fullstack Developer",
	description:
		"Fullstack engineer specializing in scalable web apps and clean system architecture.",
	icons: {
		icon: "/favicon.ico",
	},
	metadataBase: new URL("https://hoachnt.com"),
	openGraph: {
		title: "Nguyen Tien Hoach",
		description:
			"Fullstack engineer specializing in scalable web apps and system architecture.",
		url: "https://hoachnt.com",
		siteName: "HoachNT",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nguyen Tien Hoach",
		description:
			"Fullstack engineer specializing in scalable web apps and system architecture.",
	},
};

// Layout props type
interface RootLayoutProps {
	children: ReactNode;
}

// Layout component
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
