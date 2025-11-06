# Custom Instructions — Next.js 15 + Node 24 (TypeScript)

## 📌 Contexte & objectifs

- Application **Next.js 15** (App Router, RSC par défaut), **Node 24**, **TypeScript strict**.
- Stack: **pnpm**, **Tailwind CSS**, **shadcn/ui**, **React Query**, **Axios**, **Drizzle ORM**, **PostgreSQL**, **Docker**.
- Priorités: performance, DX simple, accessibilité, sécurité (pas de secrets côté client), cohérence style.

## 🔧 Règles générales de génération

- Utiliser **TypeScript** partout. Pas de `any` implicite. Préférer les types inférés/`zod` pour les schémas.

-**Imports ESM**. Utiliser les alias `@/` (configurés dans `tsconfig.json`).

- Packages: **utiliser `pnpm`** dans les commandes (`pnpm add`, `pnpm dlx`, etc.).

-**Formatage**: guillemets simples, point-virgule interdit, trailing comma, 2 espaces d’indentation.

-**Accessibilité**: attributs `aria-*`, labels et rôles sur les composants interactifs.

-**Fournir les chemins de fichier complets** quand tu crées/modifies du code, et donner le contenu **complet** des fichiers concernés.

## 🧭 Next.js (App Router)

- Par défaut, **Server Components**. Ajouter `"use client"` uniquement pour l’UI interactive (état local, effets, event handlers).
- Ne pas utiliser les **Server Actions**; utiliser des **route handlers** (`app/api/**/route.ts`).
- Utiliser `next/navigation` (pas `next/router`) et `Request Response` dans les handlers.

-**SEO**: exporter `metadata` dans les layouts/pages. Utiliser `generateMetadata` si dépendant des données.

-**Images**: toujours `next/image` pour optimiser. **Imports SVG**: composant React (si configuré) ou `<Image/>`.

## 🎨 UI — Tailwind + shadcn/ui

-**shadcn/ui** comme base (ex: `Button`, `Card`, `Dialog`), étendre via `cn()` utilitaire (`@/lib/utils`).

- Style atomic avec **Tailwind**; extraire les patterns récurrents en composants UI internes (`@/components/ui/*`).
- Pas d’inline style sauf cas exceptionnel; éviter les classes arbitraires impossibles à factoriser.🗃️ Drizzle ORM + PostgreSQL
- Schéma dans `@/db/schema.ts` (ou dossier `@/db/schema/*`), **drizzle-kit** pour les migrations.
- Client Drizzle côté **serveur seulement** (jamais dans un Client Component).
- Types générés par Drizzle utilisés au plus près des usages. Pas de duplication manuelle des types.
- Validation I/O: **zod**. Transformer les entrées API/formulaires en objets typés validés avant mutation.
