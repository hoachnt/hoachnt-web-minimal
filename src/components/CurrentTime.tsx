import { useState, useEffect } from "react";

export default function CurrentTime() {
	const [currentTime, setCurrentTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const options: Intl.DateTimeFormatOptions = {
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "Asia/Ho_Chi_Minh",
			};
			setCurrentTime(now.toLocaleTimeString("en-US", options) + " ICT");
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return <span>{currentTime}</span>;
}
