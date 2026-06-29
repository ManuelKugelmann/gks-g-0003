import { defineConfig } from 'vite';

// Standalone build/dev config for the game when developed OUTSIDE the portal.
// Inside the portal, the portal's own vite.config.js governs resolution instead
// (its `@gks/sdk` alias points at the vendored SDK), and this file is ignored.
export default defineConfig({
    // Relative base so the static build works when served from any sub-path
    // (e.g. GitHub Pages project site: https://user.github.io/gks-g-0003/).
    base: './',
    server: {
        open: true,
        port: 8080,
        fs: {
            // Allow serving the `file:../gks_sdk` linked package, which resolves
            // to a sibling folder outside this project root.
            allow: ['..']
        }
    },
    resolve: {
        // Single Phaser instance across the game and the linked SDK.
        dedupe: ['phaser']
    }
    // No `@gks/sdk` alias needed: it resolves as a real package via its
    // exports map (node_modules/@gks/sdk) once `npm install` has run.
});
