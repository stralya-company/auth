import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '../auth/session';

export async function isCurrentUser(req: NextRequest, userId: string) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json(
            { error: 'Non authentifié' },
            { status: 401 }
        );
    }
    if (session.userId !== userId) {
        return NextResponse.json(
            { error: 'Accès interdit' },
            { status: 403 }
        );
    }
    return null;
}