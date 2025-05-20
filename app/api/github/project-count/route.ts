import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json({ error: 'GitHub token not set' }, { status: 500 });
    }

    try {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
            cache: 'no-store', // опционально — чтобы избежать кэширования
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json({ error: text }, { status: response.status });
        }

        const user = await response.json();
        const totalRepos = user.public_repos + user.total_private_repos;

        return NextResponse.json({ count: totalRepos });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch from GitHub' }, { status: 500 });
    }
}
