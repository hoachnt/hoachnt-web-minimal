import React, { ReactNode } from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

// Configure the Inter font with subsets and CSS variable
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

// Define metadata for the application
export const metadata = {
	title: "Nguyen Tien Hoach - Software Developer",
	description:
		"Software engineer specializing in developing scalable web applications and system architectures.",
};

// Define props type for the RootLayout component
interface RootLayoutProps {
	children: ReactNode;
}

// RootLayout component
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans`}>
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
};

export default RootLayout;
