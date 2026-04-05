# Rapport Technique : Intégration de Keycloak (OIDC & RBAC)

## 1. Architecture OIDC et Rôle de Keycloak

L'application suit une architecture OIDC (OpenID Connect) pour la gestion sécurisée de l'authentification et des autorisations.
- **Frontend (React)** : Utilise l'adaptateur Keycloak pour rediriger l'utilisateur vers la page de connexion de Keycloak et récupérer un jeton JWT après authentification réussie.
- **Backend (Node.js/Express)** : Agit comme un Resource Server. Il vérifie les signatures des jetons JWT entrants à l'aide de l'endpoint JWKS (JSON Web Key Set) fourni par Keycloak.
- **Keycloak** : Le serveur d'Autorisation/Authentification. Il gère l'identité des utilisateurs, la définition des rôles et l'émission des jetons via le standard OIDC (OAuth 2.0).

## 2. Configuration Keycloak

### Captures d'écran requises :
*Veuillez insérer les captures d'écran suivantes dans ce document ou votre rapport final en format Word/PDF.*

- **[Capture 1 : Configuration du Realm]** - Montrant le Realm `bookstore-realm` configuré.
- **[Capture 2 : Configuration du Client]** - Montrant le client configuré avec les *Valid Redirect URIs* (http://localhost:5173/*) et les *Web Origins* (http://localhost:5173).
- **[Capture 3 : Définition des Rôles]** - Montrant les rôles créés (ex: `admin`, `user`).
- **[Capture 4 : Utilisateurs]** - Montrant au moins deux utilisateurs créés avec leurs rôles respectifs (Role Mappings) assignés.

## 3. Mise en œuvre du RBAC (Role-Based Access Control)

Le contrôle d'accès basé sur les rôles est défini de la façon suivante :
- **Middleware `requireKeycloakAuth`** : Intercepte toutes les requêtes sécurisées de l'API. Il extrait le token JWT de l'en-tête (Header) `Authorization` et valide sa conformité ainsi que l'expiration en vérifiant la signature depuis le JWKS de Keycloak avec la librairie `jose`.
- **Middleware `requireRole(role)`** : Se déclenche après l'authentification. Il extrait les rôles de l'utilisateur depuis la charge utile du token (`req.user.realm_access.roles`) et s'assure que le rôle requis pour la route est bien présent.

## 4. Scénarios de Tests Obligatoires (DevTools)

Afin de valider la sécurité, nous avons testé les différents cas de figure visés par les exigences du projet. Pour valider l'impact sur l'API, nous vérifions dans les DevTools (onglet Network) la présence de l'en-tête `Authorization: Bearer <token>`.

### Scénario 1 : Sans connexion (401)
- **Action** : Appeler la route `GET /api/books` sans être authentifié.
- **Résultat attendu** : Le backend rejette la requête.
- **Capture Requise** : `[Capture 5 : Status HTTP "401 Unauthorized" suite au GET /api/books]`

### Scénario 2 : Register et Rôle Automatique
- **Action** : Créer un compte client via la fonction de Register de Keycloak.
- **Résultat attendu** : L'utilisateur obtient automatiquement le rôle `CLIENT`.
- **Capture Requise** : `[Capture 6 : Utilisateur récemment créé et ses "Role Mappings" dans Keycloak montrant le rôle CLIENT]`

### Scénario 3 : Connecté en CLIENT (200 OK et 403 Forbidden)
- **Action** : L'utilisateur connecté en `CLIENT` appelle l'API (`GET/POST`). Puis il tente de modifier/supprimer une ressource (`PUT/DELETE`).
- **Résultat attendu** : Succès (`200 OK`) pour les requêtes de lecture ou d'ajout autorisé. Accès refusé par le RBAC (`403 Forbidden`) pour les tentatives de PUT/DELETE car il n'est pas Admin.
- **Capture Requise** : `[Capture 7 : Status HTTP "200 OK" pour GET/POST, et "403 Forbidden" pour PUT/DELETE avec le header Authorization visible]`

### Scénario 4 : Connecté en ADMIN (200 OK)
- **Action** : L'utilisateur connecté en `ADMIN` tente de modifier/supprimer une ressource (`PUT/DELETE`).
- **Résultat attendu** : Succès total (`200 OK`) car l'admin a l'autorisation.
- **Capture Requise** : `[Capture 8 : Status HTTP "200 OK" pour une requête PUT/DELETE avec le header Authorization: Bearer <token> visible]`

## 5. Dépannage Rapide (Troubleshooting)

Nous avons identifié et résolu plusieurs problèmes classiques lors de la mise en place de Keycloak et CORS :
- **CORS (Cross-Origin Resource Sharing)** : Le frontend React ne pouvait pas communiquer avec l'API. *Solution* : Configurer le middleware CORS du backend pour autoriser explicitement l'origine `http://localhost:5173`.
- **Erreur "Invalid Redirect URI"** : L'application affichait une erreur sur la mire de connexion Keycloak. *Solution* : Vérifier que l'URI `http://localhost:5173/*` est déclarée dans les *Valid Redirect URIs* du composant Client de Keycloak.
- **Realm / Issuer Incorrect** : Le backend n'arrivait pas à vérifier la signature ou rejetait le token. *Solution* : S'assurer que le nom du `REALM` configuré dans le middleware d'authentification correspond au nom réel (ex: `bookstore-realm`).
- **Rôle CLIENT non attribué** : Après l'enregistrement, l'utilisateur n'avait pas le rôle automatiquement et provoquait des 403 de partout. *Solution* : Vérifier l'onglet "Default groups", créer un groupe "clients" par défaut, et assigner le fonctionnement *Role mapping* avec le rôle `CLIENT`.

## 6. Bilan

L'intégration a permis de déléguer efficacement et de manière sécurisée la gestion d'identités complexes. Keycloak offre la possibilité d'ajouter de l'authentification à doubles facteurs (2FA), de l'authentification sociale, tout en laissant le code du backend API propre et centré sur sa fonctionnalité métier principale avec de simple vérifications de tokens JWT par middlewares.
