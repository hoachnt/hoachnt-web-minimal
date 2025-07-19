import type { APIRoute } from "astro"

export const GET: APIRoute = async () => {
    const token = import.meta.env.GITHUB_TOKEN

    if (!token) {
        return new Response(JSON.stringify({ error: "GitHub token not set" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    try {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        })

        if (!response.ok) {
            const text = await response.text()
            return new Response(JSON.stringify({ error: text }), {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        const user = await response.json()
        const totalRepos = user.public_repos + user.total_private_repos

        return new Response(JSON.stringify({ count: totalRepos }), {
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to fetch from GitHub" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}
