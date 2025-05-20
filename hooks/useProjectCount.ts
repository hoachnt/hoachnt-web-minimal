import { useEffect, useState } from 'react';

interface ProjectCountState {
    count: number | null;
    loading: boolean;
    error: string | null;
}

export function useProjectCount(): ProjectCountState {
    const [state, setState] = useState<ProjectCountState>({ count: null, loading: true, error: null });

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch('/api/github/project-count');
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                const data = await res.json();
                setState({ count: data.count, loading: false, error: null });
            } catch (error) {
                console.error("Error fetching GitHub project count:", error);
                setState({
                    count: null,
                    loading: false,
                    error: error instanceof Error ? error.message : String(error),
                });
            }
        };

        fetchCount();
    }, []);

    return state;
}
