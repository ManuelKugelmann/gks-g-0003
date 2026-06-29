import Phaser from 'phaser';
import BurgerMenu from '@gks/sdk/ui/BurgerMenu.js';
import cardImg from '../assets/card_preview.png';
import MainScene from './MainScene';
import EndScene from './EndScene';
import { SCENE_KEYS } from './keys.js';

export const gameMeta = {
    sceneKey: SCENE_KEYS.INTRO,
    previewImage: cardImg,
    title: {
        en: "Matching Numbers",
        de: "Verliebte Zahlen"
    },
    description: {
        en: "Match the numbers that add up to ten.",
        de: "Finde die Zahlen, die zusammen zehn ergeben."
    },
    context: ["math"], // Options: 'math', 'language', 'knowledge'
    difficulty: 1
};

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.INTRO });
    }

    create() {
        const cw = this.cameras.main.width;
        const ch = this.cameras.main.height;
        const lang = this.registry.get('currentLanguage') || 'en';

        // --- 1. BOOTSTRAP SCENES ---
        if (!this.scene.get(SCENE_KEYS.MAIN)) {
            this.scene.add(SCENE_KEYS.MAIN, MainScene, false);
            this.scene.add(SCENE_KEYS.END, EndScene, false);
        }

        // --- 2. INTRO VISUALS ---
        this.add.rectangle(cw / 2, ch / 2, cw, ch, 0xE91E63); // Pinkish for hearts

        const welcomeText = lang === 'de' ? "Verliebte Zahlen" : "Matching Numbers";
        this.add.text(cw / 2, ch / 2, welcomeText, {
            fontSize: '48px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Burger Menu
        const isSmallScreen = cw < 1000;
        new BurgerMenu(this, isSmallScreen ? 40 : 60, isSmallScreen ? 40 : 60, [
            { label: lang === 'de' ? 'ZURÜCK' : 'EXIT', color: 0xd32f2f, callback: () => this.scene.start('MainMenuScene') }
        ]);

        // --- 3. TRANSITION ---
        const startText = this.add.text(cw / 2, ch - 150, lang === 'de' ? 'Tippen zum Starten' : 'Tap to Start', {
            fontSize: '32px', color: '#fff'
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({ targets: startText, alpha: 1, duration: 800, yoyo: true, repeat: -1 });

        // Tap anywhere to start — but ignore taps that land on UI (e.g. the burger
        // menu), otherwise opening the menu would also jump straight into the game.
        this.input.on('pointerdown', (pointer, currentlyOver) => {
            if (currentlyOver.length > 0) return;
            this.scene.start(SCENE_KEYS.MAIN);
        });
    }
}
