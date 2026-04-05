import { useEffect, useState } from "react";
import keycloak from "./keycloack";

export default function KeycloakProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false, pkceMethod: "S256" })
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  if (!ready) return <p>Chargement sécurité...</p>;
  return children;
}

export { keycloak };
