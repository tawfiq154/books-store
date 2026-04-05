import { NavLink } from "react-router-dom";
import { keycloak } from "../auth/KeycloakProvider";

function Header() {
  const isAuth = keycloak.authenticated;
  return (
    <header>
      <strong>E-commerce</strong>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/books">Livres</NavLink>
        <NavLink to="/about">A propos</NavLink>

        {!isAuth ? (
          <>
            <button onClick={() => keycloak.login()}>Login</button>
            <button onClick={() => keycloak.register()}>Register</button>
          </>
        ) : (
          <button onClick={() => keycloak.logout({ redirectUri: "http://localhost:5173/" })}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
