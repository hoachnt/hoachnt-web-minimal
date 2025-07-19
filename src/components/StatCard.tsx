"use client";

import { useState, useEffect } from "react";

export default function StatCard() {
	const [count, setCount] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const res = await fetch("/api/github/project-count");
				if (res.ok) {
					const data = await res.json();
					setCount(data.count);
				}
			} catch (error) {
				console.error("Error fetching GitHub project count:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCount();
	}, []);

	return (
		<div className="bg-white dark:bg-[#1a1a1a] rounded-full aspect-square flex items-center justify-center hover:scale-105 transition-transform duration-300">
			<div className="text-center">
				<p className="text-lg sm:text-xl font-medium">
					{loading ? "..." : count || "0"}
				</p>
				<p className="text-xs text-[#666666] dark:text-[#999999]">
					Projects
				</p>
			</div>
		</div>
	);
}
