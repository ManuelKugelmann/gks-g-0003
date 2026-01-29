# GKS Game Template

This is the standard template for creating new games for the Gute Kinder Spiele Portal.

## Structure
- `scenes/GameScene.js`: The main entry point. Exports the Phaser Scene and `gameMeta`.
- `assets/`: Place your game assets here.
- `dev-test/`: Standalone development harness.

## Metadata
Edit `gameMeta` in `scenes/GameScene.js` to define your game's appearance in the portal:
- `title`: Localized title.
- `description`: Localized description.
- `context`: Categories (math, language, knowledge).
- `previewImage`: Import and assign a 600x450px image.

## Monetization (Patreon)
We encourage a Freemium model. See [PATREON_GUIDE.md](./PATREON_GUIDE.md) for details on how to lock features for supporters.

## Development
Run `npm run dev` to start the standalone development server.
