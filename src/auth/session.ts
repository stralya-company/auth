import { cookies } from 'next/headers';

export async function getSessionUser() {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) return null;

    try {
        const session = JSON.parse(sessionCookie);
        if (!session.expires || Date.now() > session.expires) return null;
        return session;
    } catch {
        return null;
    }
}