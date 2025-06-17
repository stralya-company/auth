import type { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

/**
 * Sets the PrismaClient instance to be used globally.
 */
export function setPrismaClient(client: PrismaClient) {
    prisma = client;
}

/**
 * Returns the initialized PrismaClient instance.
 * Throws an error if not initialized.
 */
export function getPrismaClient(): PrismaClient {
    if (!prisma) {
        throw new Error('PrismaClient not initialized. Use setPrismaClient first.');
    }
    return prisma;
}