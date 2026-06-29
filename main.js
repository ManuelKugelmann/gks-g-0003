import Phaser from 'phaser';
import IntroScene from './scenes/IntroScene.js';

/**
 * STANDALONE HOST HARNESS
 * ------------------------
 * When this game runs inside the GKS Portal, the portal provides the runtime
 * context: it injects `user` / `currentLanguage` into the Phaser registry and
 * owns the real `MainMenuScene` that the game's EXIT button returns to.
 *
 * Standalone, this file plays that role — the "plug". It is the dev/deploy
 * entry point for the game on its own (local Vite server or a static GitHub
 * Pages build). It will later be replaced by the SDK's shared DefaultHost.
 */

// Stand-in for the portal's main menu so `scene.start('MainMenuScene')` works.
class DevMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }
    create() {
        // EXIT returns here; in standalone we just relaunch the game.
        this.scene.start('VerliebteZahlen');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#000000',
    // IntroScene bootstraps its own Main/End scenes in create().
    scene: [DevMenuScene, IntroScene]
};

const game = new Phaser.Game(config);

// --- MOCK HOST CONTEXT (what the portal normally injects) ---
// Change these to simulate different languages / membership tiers locally.
game.registry.set('currentLanguage', 'de'); // 'de' | 'en'
game.registry.set('user', { name: 'DevUser', tier: 'Werkstatt-Supporter', isMember: true });
