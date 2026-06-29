import Phaser from 'phaser';
import BurgerMenu from '@gks/sdk/ui/BurgerMenu.js';
import PopupManager from '@gks/sdk/ui/PopupManager.js';
import ProgressionManager from '../systems/ProgressionManager.js';
import { SCENE_KEYS } from './keys.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.MAIN });
    }

    create() {
        const cw = this.cameras.main.width;
        const ch = this.cameras.main.height;

        // --- 0. SYSTEMS ---
        this.popupManager = new PopupManager(this);
        this.progression = new ProgressionManager();
        this.progression.init();

        // --- LOCALIZATION CHECK ---
        // Games MUST support 'en' and 'de'.
        // Get the current language from the registry (defaults to 'en').
        const lang = this.registry.get('currentLanguage') || 'en';

        // 1. Background
        this.add.rectangle(cw / 2, ch / 2, cw, ch, 0x81C784); // Lighter Green

        // 2. Burger Menu
        const menuItems = [
            {
                label: lang === 'de' ? 'ZURÜCK' : 'EXIT',
                color: 0xd32f2f,
                callback: () => {
                    this.scene.start('MainMenuScene')
                }
            }
        ];
        const isSmallScreen = cw < 1000;
        new BurgerMenu(this, isSmallScreen ? 40 : 60, isSmallScreen ? 40 : 60, menuItems);

        // 3. Gameplay Placeholder
        this.add.text(cw / 2, ch / 2, "Main Gameplay Scene", { fontSize: '48px', color: '#000' }).setOrigin(0.5);

        // 4. Win Condition (Click to Win)
        const winBtn = this.add.text(cw / 2, ch * 0.8, lang === 'de' ? 'GEWINNEN' : 'WIN GAME', {
            fontSize: '32px',
            backgroundColor: '#fff',
            color: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

        winBtn.on('pointerdown', () => {
            this.scene.start(SCENE_KEYS.END);
        });
    }
}
