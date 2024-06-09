import React from "react";
import Routes from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes />
      </FavoritesProvider>
    </AuthProvider>
  );
}
