import {getPrismaClient} from '../prisma';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';

export async function login(email: string, password: string): Promise<any> {
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    // Remove password from returned object
    const {password: _pw, ...userSafe} = user;

    const expires = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 jours en ms

    (await cookies()).set('session', JSON.stringify({ userId: user.id, expires }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(expires),
    });

    return userSafe;
}