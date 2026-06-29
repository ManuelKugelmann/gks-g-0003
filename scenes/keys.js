import { makeSceneKeys } from '@gks/sdk/host/sceneKeys.js';

// INTRO is the PUBLIC sceneKey (coupled to gamecard_config.json + the portal
// launch flow), here the legacy 'VerliebteZahlen'; MAIN/END derive from NAME.
export const SCENE_KEYS = makeSceneKeys('Verliebte', { intro: 'VerliebteZahlen' });
