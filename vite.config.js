import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        games: resolve(import.meta.dirname, "games.html"),
        favorites: resolve(import.meta.dirname, "favorites.html"),
        prototypefps: resolve(import.meta.dirname, "prototypefps.html")
      }
    }
  }
});
