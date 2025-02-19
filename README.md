# arcadia

Ce projet est sur la base du monorepo JS suivant l'architecture React-Express-MySQL de la Wild Code School (v7.1.7).

## Table des Matières

- [arcadia](#name)
  - [Utilisateurs Windows](#utilisateurs-windows)
  - [Installation \& visualisation du projet Arcadia](#installation--utilisation)


## ARCADIA
Site de jeu d'arcade permettant de cumuler des scores en jeu puis de les échanges contre des parties chez Arcadia Playstore en physique.
le site est partiel en format mobiel et complet en format desktop. Les jeux ne peuvent se jouer en format mobile et l'accès à la gamelist n'est pas autorisé. 
En desktop, on pourra également avoir l'accès à la page Admin qui pourra avoir accès à la BDD des tous les utilisateurs.

## Utilisateurs Windows

Assurez-vous de lancer ces commandes dans un terminal Git pour éviter [les problèmes de formats de nouvelles lignes](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats) :

```sh
git config --global core.eol lf
git config --global core.autocrlf false
```

## Installation & visualisation du projet Arcadia

1. Clonez ce dépôt, puis accédez au répertoire cloné.
2. Exécutez la commande `npm install`.
3. Créez des fichiers d'environnement (`.env`) dans les répertoires `server` et `client` : vous pouvez copier les fichiers `.env.sample` comme modèles (**ne les supprimez pas**).
4. Lancer le projet avec la commande npm run dev
