// hooks/useCurrentTime.ts
import { useState, useEffect } from 'react';

export function useCurrentTime(timeZone = "Asia/Ho_Chi_Minh"): string {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: timeZone,
            };
            setCurrentTime(now.toLocaleTimeString("en-US", options) + " ICT");
        };

        updateTime(); // Устанавливаем время сразу
        const interval = setInterval(updateTime, 1000); // Обновляем каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, [timeZone]); // Зависимость от timeZone, хотя здесь она статична

    return currentTime;
}