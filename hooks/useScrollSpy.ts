// hooks/useScrollSpy.ts
import { useState, useEffect, useRef } from 'react';
import { SectionId } from '@/types'; // Убедитесь, что путь верный

// Определяем смещение, чтобы ссылка становилась активной до того, как секция достигнет самого верха
const SCROLL_OFFSET = 150;

export function useScrollSpy(sectionIds: SectionId[]): SectionId[] {
    const [visibleSections, setVisibleSections] = useState<SectionId[]>([]);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        sectionRefs.current = sectionIds.reduce((acc, id) => {
            acc[id] = document.getElementById(id);
            return acc;
        }, {} as { [key: string]: HTMLElement | null });

        const observer = new IntersectionObserver(
            (entries) => {
                const newlyVisible: SectionId[] = [];
                const hidden: SectionId[] = [];

                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id') as SectionId;
                    if (entry.isIntersecting) {
                        // Проверяем, насколько большая часть секции видна или находится чуть выше
                        const rect = entry.target.getBoundingClientRect();
                        // Активируем, если верхняя часть секции выше или в пределах SCROLL_OFFSET от верха вьюпорта
                        // И нижняя часть секции видна
                        if (rect.top <= SCROLL_OFFSET && rect.bottom > 0) {
                            newlyVisible.push(id);
                        }
                    } else {
                        hidden.push(id);
                    }
                });

                setVisibleSections(prevVisible => {
                    // Удаляем секции, которые перестали быть видимыми
                    const stillVisible = prevVisible.filter(id => !hidden.includes(id) || newlyVisible.includes(id));
                    // Добавляем новые видимые секции, избегая дубликатов
                    const nextVisible = Array.from(new Set([...stillVisible, ...newlyVisible]));

                    // Простая логика: если есть видимые секции, берем первую, которая полностью видна или ее верх близко к верху.
                    // Если нет видимых, или только нижние части видны, можно взять первую в списке или первую, которая только что появилась.
                    // Для простоты, возьмем первую из тех, что пересекаются или только что стали видимы в верхней части
                    const topVisible = sectionIds.find(id => {
                        const ref = sectionRefs.current[id];
                        if (ref) {
                            const rect = ref.getBoundingClientRect();
                            return rect.top <= SCROLL_OFFSET && rect.bottom > 0;
                        }
                        return false;
                    });

                    if (topVisible) {
                        return [topVisible]; // Активной считаем только одну секцию
                    } else if (nextVisible.length > 0) {
                        // Если ни одна не у верха, но есть видимые, берем первую из них
                        return [nextVisible[0]];
                    } else {
                        // Если вообще ничего не видно, можно оставить пустой массив или первую секцию по умолчанию
                        return []; // Или ['about'] если нужно всегда что-то показывать
                    }

                });

            },
            {
                root: null, // Вьюпорт браузера
                rootMargin: `-${SCROLL_OFFSET}px 0px 0px 0px`, // Верхний маржин для активации раньше
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Процент видимости для срабатывания
            }
        );

        // Начинаем наблюдение за всеми секциями
        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            // Прекращаем наблюдение при размонтировании
            observer.disconnect();
        };
    }, [sectionIds]); // Зависимость от списка ID секций

    return visibleSections;
}