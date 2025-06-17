import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '../auth/session';

export async function isAuthenticatedGuard(req: NextRequest) {
    const session = await getSessionUser();
    if (!session) {
        return NextResponse.json(
            { error: 'Non authentifié' },
            { status: 401 }
        );
    }
    return null;
}