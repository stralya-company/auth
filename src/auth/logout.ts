import { cookies } from 'next/headers';

export async function logout() {
    (await cookies()).set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
        expires: new Date(0), // Date passée pour forcer la suppression
    });
}