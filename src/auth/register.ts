import { getPrismaClient } from '../prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function register(email: string, password: string): Promise<any> {
    const prisma = getPrismaClient();

    // Vérifie si l'utilisateur existe déjà
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email déjà enregistré');

    // Récupère le rôle "user"
    const userRole = await prisma.role.findUnique({ where: { name: 'user' } });
    if (!userRole) throw new Error('Rôle "user" introuvable');

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Création de l'utilisateur avec le roleId
    const user = await prisma.user.create({
        data: { email, password: hashed, roleId: userRole.id }
    });

    // Retire le mot de passe de l'objet retourné
    const { password: _pw, ...userSafe } = user;

    // Création du cookie de session
    (await cookies()).set('session', JSON.stringify({ userId: user.id }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return userSafe;
}