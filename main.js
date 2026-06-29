import IntroScene from './scenes/IntroScene.js';
import { SCENE_KEYS } from './scenes/keys.js';
import { bootStandalone } from '@gks/sdk/host/bootStandalone.js';

// Standalone entry. The shared host harness lives in the SDK so every game's
// "plug" stays identical and DRY. Tweak language / tier here to test locally
// (see bootStandalone's `user` and `language` options).
bootStandalone({ IntroScene, introKey: SCENE_KEYS.INTRO });
