// hooks/useProjectCount.ts
import { useState, useEffect } from 'react';

interface ProjectCountState {
    count: number | null;
    loading: boolean;
    error: string | null;
}

export function useProjectCount(username: string): ProjectCountState {
    const [state, setState] = useState<ProjectCountState>({ count: null, loading: true, error: null });

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch GitHub repositories: ${response.statusText}`);
                }
                const repos = await response.json();
                setState({ count: repos.length, loading: false, error: null });
            } catch (error) {
                console.error("Error fetching project count:", error);
                setState({ count: null, loading: false, error: error instanceof Error ? error.message : String(error) });
            }
        };

        fetchCount();
    }, [username]); // Зависимость от username

    return state;
}