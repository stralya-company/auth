import {copyFileSync, mkdirSync, existsSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
    const src = join(__dirname, 'roles-seed.ts');
    const destDir = join(process.cwd(), 'prisma');
    const dest = join(destDir, 'roles-seed.ts');

    if (!existsSync(destDir)) {
        mkdirSync(destDir, {recursive: true});
    }

    copyFileSync(src, dest);
    console.log('✅ Fichier roles-seed.ts copié dans le dossier prisma.');
    console.log(`Pour initialiser les rôles, lancez : npx ts-node --compiler-options '{\\"module\\":\\"CommonJS\\"}' prisma/roles-seed.ts`);
}

main();

export {};