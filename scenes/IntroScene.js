import Phaser from 'phaser';
import BurgerMenu from '@gks/ui/BurgerMenu.js';
import cardImg from '../assets/card_preview.png';
import MainScene from './MainScene';
import EndScene from './EndScene';

export const gameMeta = {
    sceneKey: 'Template_Intro',
    previewImage: cardImg,
    title: {
        en: "Template Game",
        de: "Spiel Vorlage"
    },
    description: {
        en: "A clean starting point for new games.",
        de: "Ein sauberer Startpunkt für neue Spiele."
    },
    context: ["knowledge"], // Options: 'math', 'language', 'knowledge'
    difficulty: 1
};

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Template_Intro' });
    }

    create() {
        const cw = this.cameras.main.width;
        const ch = this.cameras.main.height;
        const lang = this.registry.get('currentLanguage') || 'en';

        // --- 1. BOOTSTRAP SCENES ---
        if (!this.scene.get('Template_Main')) {
            this.scene.add('Template_Main', MainScene, false);
            this.scene.add('Template_End', EndScene, false);
        }

        // --- 2. INTRO VISUALS ---
        this.add.rectangle(cw / 2, ch / 2, cw, ch, 0x4CAF50); // Green

        const welcomeText = lang === 'de' ? "Willkommen!" : "Welcome!";
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

        this.input.on('pointerdown', () => this.scene.start('Template_Main'));
    }
}
