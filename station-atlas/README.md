# Station Atlas

Application React + TypeScript (Vite) pour consulter les quais d'amarrage d'une station orbitale.

## Lancer le projet

```bash
npm install
npm run dev
```

Vérifier les types : `npx tsc -b`

## Structure

- `public/api/docks.json` : la liste des quais, lue avec `fetch("/api/docks.json")`
- `src/types/` : `dock.ts` (union par `kind`) et `dto.ts` (format brut de l'API)
- `src/services/` : `docks.ts` (fetch) et `adaptDock.ts` (DTO vers modèle UI)
- `src/pages/` : une page par route
- `src/components/` : `AppLayout` (en-tête et navigation)

## Routes

`/docks`, `/docks/:dockId`, `/requests`, `/requests/new`, et une page 404 pour le reste.

## Fait

- Liste des quais avec recherche, filtre par statut et bouton Réinitialiser
- Chargement, erreur avec « Réessayer », liste vide
- Fiche d'un quai et message « Quai introuvable »

## Limites

- Le formulaire de demande et la liste des demandes ne sont pas terminés.
- Pas de Context ni de reducer pour les demandes.
- Pas de mise en forme CSS.
