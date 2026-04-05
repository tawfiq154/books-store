import Keycloak from "keycloak-js";

// src/auth/keycloack.js
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "bookstore-realm",
  clientId: "bookstore-frontend",
});


export default keycloak;
