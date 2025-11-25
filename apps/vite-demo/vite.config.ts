import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Allow overriding the base at build time via environment variable.
// For GitHub Pages set VITE_BASE='/pico-piano/demo/', for Vercel leave default '/'.
const base = process.env.VITE_BASE ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5174
  }
});
