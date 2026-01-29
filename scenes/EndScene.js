import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Template_End' });
    }

    create() {
        const cw = this.cameras.main.width;
        const ch = this.cameras.main.height;
        const lang = this.registry.get('currentLanguage') || 'en';

        // Background
        this.add.rectangle(cw / 2, ch / 2, cw, ch, 0x4CAF50); // Green

        // Success Text
        this.add.text(cw / 2, ch / 2 - 50, lang === 'de' ? 'Gut gemacht!' : 'Well Done!', {
            fontSize: '48px',
            color: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Restart Button
        const btn = this.add.rectangle(cw / 2, ch / 2 + 50, 200, 60, 0xffffff)
            .setInteractive({ cursor: 'pointer' });

        this.add.text(cw / 2, ch / 2 + 50, lang === 'de' ? 'NEUSTART' : 'RESTART', {
            fontSize: '24px',
            color: '#000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
            this.scene.start('Template_Main');
        });
    }
}
