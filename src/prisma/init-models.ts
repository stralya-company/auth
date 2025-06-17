#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SCHEMA_PATH = path.resolve("prisma/schema.prisma")
const MODELS_PATH = path.resolve(__dirname, "models.prisma")

if (!fs.existsSync(SCHEMA_PATH)) {
    console.error("❌ prisma/schema.prisma introuvable. Lance ce script à la racine de ton projet Next.js.")
    process.exit(1)
}

const schemaContent = fs.readFileSync(SCHEMA_PATH, "utf8")
const modelsContent = fs.readFileSync(MODELS_PATH, "utf8")

if (schemaContent.includes("model User")) {
    console.log("⚠️ Le modèle `User` existe déjà dans schema.prisma, rien n’a été ajouté.")
    process.exit(0)
}

fs.appendFileSync(SCHEMA_PATH, "\n\n// === Auth Models ===\n" + modelsContent)
console.log("✅ Modèles auth ajoutés à schema.prisma !")
console.log("N’oublie pas de lancer `npx prisma generate` pour mettre à jour le client Prisma. Puis, tu peux lancer `npx prisma migrate dev` pour créer la migration et mettre à jour ta base de données.")