import Phaser from 'phaser';
import BurgerMenu from '@gks/sdk/ui/BurgerMenu.js';
import cardImg from '../assets/card_preview.png';
import MainScene from './MainScene';
import EndScene from './EndScene';

export const gameMeta = {
    sceneKey: 'VerliebteZahlen',
    previewImage: cardImg,
    title: {
        en: "Matching Numbers",
        de: "Verliebte Zahlen"
    },
    description: {
        en: "Find the matching hearts.",
        de: "Finde die zueinander passenden Herzen."
    },
    context: ["math"], // Options: 'math', 'language', 'knowledge'
    difficulty: 1
};

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VerliebteZahlen' });
    }

    create() {
        const cw = this.cameras.main.width;
        const ch = this.cameras.main.height;
        const lang = this.registry.get('currentLanguage') || 'en';

        // --- 1. BOOTSTRAP SCENES ---
        if (!this.scene.get('Verliebte_Main')) {
            this.scene.add('Verliebte_Main', MainScene, false);
            this.scene.add('Verliebte_End', EndScene, false);
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

        this.input.on('pointerdown', () => this.scene.start('Verliebte_Main'));
    }
}
