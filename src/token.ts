import { cookies } from 'next/headers';
import { getPrismaClient } from './prisma';

export async function verifyToken(): Promise<any | null> {
    let cookieStore, session, userId, expires, prisma, user;
    try {
        cookieStore = await cookies();
        session = cookieStore.get('session');
        if (!session) throw new Error('Aucun cookie de session trouvé');

        let sessionData;
        try {
            sessionData = JSON.parse(session.value);
            ({ userId, expires } = sessionData);
        } catch {
            throw new Error('Le cookie de session est invalide (JSON.parse échoué)');
        }
        if (!userId) throw new Error('Aucun userId trouvé dans le cookie de session');
        if (!expires) throw new Error('Aucune date d\'expiration trouvée dans le cookie de session');
        if (Date.now() > Number(expires)) throw new Error('Le cookie de session est expiré');

        prisma = getPrismaClient();
        user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('Utilisateur introuvable en base de données');

        const { password: _pw, ...userSafe } = user;
        return userSafe;
    } catch (error) {
        throw new Error(
            'Erreur lors de la vérification du token : ' +
            (error instanceof Error ? error.message : String(error))
        );
    }
}