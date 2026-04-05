# Présentation OIDC & Keycloak - Plan et Contenu

Ce fichier fournit un canevas détaillé, diapositive par diapositive, pour créer votre présentation PowerPoint finale.

---

## Slide 1 : Titre de la présentation
- **Titre** : Intégration de Keycloak pour l'Authentification et les Autorisations
- **Sous-titre** : Architecture OIDC et RBAC pour l'application Full-Stack
- **Intervenant** : TF154

---

## Slide 2 : Architecture d'Authentification (OIDC)
- **Contexte** : Besoin de sécuriser une application Web (React + Node.js) tout en externalisant et centralisant la gestion des mots de passe.
- **OpenID Connect (OIDC)** : Ce protocole basé sur OAuth 2.0 permet non seulement de s'authentifier mais aussi d'avoir l'identité de l'utilisateur.
- **Acteurs de l'architecture** :
  - **Keycloak** : Le serveur d'identité (Identity Provider - IdP).
  - **Frontend (Application React)** : Redirige vers Keycloak, récupère le token et l'ajoute dans chaque requête.
  - **Backend (API Node.js/Express)** : Valide le jeton et agit comme serveur de ressources sécurisé.

*(Ajouter un schéma visuel montrant les flux : React -> Keycloak -> React -> Backend)*

---

## Slide 3 : Configuration de Keycloak
- **Realm** (`bookstore-realm`) : Un espace isolé pour les utilisateurs, rôles et configurations de notre application.
- **Client OIDC** : Identifiant crée pour que l'application React puisse communiquer avec Keycloak.
- **Sécurité et CORS** :  Configuration obligatoire des _Valid Redirect URIs_ (redirection post-connexion) et des _Web Origins_ (communication inter-domaines).

*(Ajouter vos captures d'écran de l'interface Keycloak)*

---

## Slide 4 : Rôle-Based Access Control (RBAC)
- **Qu'est-ce que le RBAC ?** : Gérer la sécurité de l'application en limitant les accès du système selon les rôles attribués à l'utilisateur, plutôt que par identifiant direct.
- **Les Rôles clés du projet** :
  - `admin` : Peut modifier/supprimer des données sensibles.
  - `user` : Droit de lecture simple ou de création minimale.
- **Implémentation Backend** :
  - L'API extrait les rôles du token JWT (via JWK).
  - Middleware de blocage : Interdit l'accès si `req.user.roles` ne contient pas la valeur attendue.

---

## Slide 5 : Démonstration et Scénarios de tests
- **Tests obligatoires validés via DevTools (Network / Bearer Token) :**
  1. **Sans connexion** : Appel à `GET /api/books` et rejet propre (`401 Unauthorized`).
  2. **Register Keycloak** : L'utilisateur obtient son rôle `CLIENT` automatiquement à la création.
  3. **Connecté en CLIENT** : Droits en lecture/création accordés (`200 OK`). Restrictions sur la modification (`PUT/DELETE -> 403 Forbidden`).
  4. **Connecté en ADMIN** : Tous les droits applicatifs sont accordés (`PUT/DELETE -> 200 OK`).

*(Ajouter ici des captures DevTools ou présenter la démo en Live)*

---

## Slide 6 : Dépannage rapide (Troubleshooting)
- **Erreur CORS** :
  - *Problème :* Refus de communication entre le front et l'API.
  - *Solution :* Configurer le backend pour autoriser explicitement `http://localhost:5173`.
- **Redirect URI invalide** :
  - *Problème :* Blocage lors de l'authentification Keycloak.
  - *Solution :* Vérifier que `http://localhost:5173/*` est configuré sur le Client Keycloak.
- **Realm / Issuer incorrect** :
  - *Problème :* Le Token est rejeté par l'API backend.
  - *Solution :* Vérifier l'orthographe de la variable `REALM` dans le middleware Node (`requireKeycloakAuth`).
- **Rôle CLIENT non attribué** :
  - *Problème :* Les nouveaux inscrits reçoivent des erreurs `403`.
  - *Solution :* Contrôler les "Default groups" (`clients`) et s'assurer que le "Role mapping" assigne bien le rôle `CLIENT`.

---

## Slide 7 : Conclusion
- Défi relevé pour la mise en place d'un protocole moderne OIDC.
- Gain de temps en sécurité : Keycloak se charge de stocker de façon cryptée les mots de passe.
- Possibilité future : Ajouter de la connexion par réseaux sociaux (Google, Facebook) en un clic sans modifier le Backend.
- **Questions / Réponses**
