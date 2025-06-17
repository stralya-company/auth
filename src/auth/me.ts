// src/auth/me.ts
import {verifyToken} from '../token';

export async function me() {
    try {
        const user = await verifyToken();
        if (!user) throw new Error('User not authenticated');
        return user;
    } catch (error) {
        throw new Error('Invalid or expired token' + (error instanceof Error ? `: ${error.message}` : ''));
    }
}