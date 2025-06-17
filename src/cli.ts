#!/usr/bin/env node
const [,, cmd] = process.argv;

export async function main() {
    if (cmd === 'init-roles') {
        await import('./prisma/init-roles.js');
    } else if (cmd === 'init-models') {
        await import('./prisma/init-models.js');
    } else {
        console.log('Usage: npx @stralya/auth <init-roles|init-models>');
        process.exit(1);
    }
}

main();