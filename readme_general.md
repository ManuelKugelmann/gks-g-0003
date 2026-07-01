# GKS Game Template

This is the standard template for creating new games for the Gute Kinder Spiele Portal.

## Structure
- `scenes/IntroScene.js`: Entry scene. Exports the Phaser Scene and `gameMeta`; bootstraps `MainScene`/`EndScene`.
- `scenes/MainScene.js`, `scenes/EndScene.js`: gameplay and end screen.
- `scenes/keys.js`: the game's scene keys via `makeSceneKeys()` from the SDK.
- `main.js`: standalone entry — calls `bootStandalone()` from `@gks/sdk/host` (the portal stand-in).
- `index.html`, `vite.config.js`: standalone dev/build harness (`vite.config.js` uses the SDK preset).
- `systems/ProgressionManager.js`: subclass of the SDK progression shell (sets this game's key prefix).
- `assets/`: game assets.

## Metadata
Edit `gameMeta` in `scenes/IntroScene.js` to define your game's appearance in the portal:
- `title`: Localized title.
- `description`: Localized description.
- `context`: Categories (math, language, knowledge).
- `previewImage`: Import and assign a 600x450px image.

## Monetization (Patreon)
We encourage a Freemium model. See [PATREON_GUIDE.md](./PATREON_GUIDE.md) for details on how to lock features for supporters.

## Development

This game runs **standalone** — it does not need the portal. The shared boilerplate
(host harness, scene keys, vite preset, progression shell) comes from `@gks/sdk`, which
is fetched as a git dependency by `npm install` (no separate checkout needed).

Prerequisites: Node 20+, and git access to the SDK repo (`@gks/sdk` is a GitHub dependency).

```bash
npm install        # installs deps + fetches @gks/sdk from github:ManuelKugelmann/gks_sdk#main
npm run dev        # Vite dev server → http://localhost:8080
npm run build      # static production build → dist/
npm run preview    # serve the built bundle
```

Standalone, `main.js` calls the SDK host (`@gks/sdk/host/bootStandalone.js`), which stands
in for the portal: it provides a mock `MainMenuScene` (the EXIT target) and injects
`user` / `currentLanguage` into the registry. Edit those in `main.js` to simulate a
different language or membership tier locally.

### Updating the SDK
The SDK is a git dependency, so a plain `npm install` won't pick up new SDK commits. Force a refetch:
```bash
npm install @gks/sdk@github:ManuelKugelmann/gks_sdk#main
```

### GitHub Codespaces
A `.devcontainer/` is included. Create a codespace, then `npm run dev`; Vite is forwarded
over HTTPS at `https://<name>-8080.app.github.dev`. To open it on a phone, set port 8080 to
**Public** in the Ports tab (forwarded ports are private by default).
