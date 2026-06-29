import { defineConfig } from 'vite';
import { gameViteConfig } from '@gks/sdk/host/viteGameConfig.js';

// Standalone build/dev config. The shared preset lives in the SDK so every game
// stays DRY; pass overrides to gameViteConfig() for per-game tweaks. Inside the
// portal this file is ignored — the portal's own vite.config governs.
export default defineConfig(gameViteConfig());
