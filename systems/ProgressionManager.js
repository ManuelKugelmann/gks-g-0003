import ProgressionManager from '@gks/sdk/systems/ProgressionManager.js';

/**
 * Game progression. Extends the SDK shell (init/get/set/resetProgress); this
 * subclass just sets the unique key prefix. Add game-specific helpers here.
 */
export default class extends ProgressionManager {
    constructor() {
        super('gks_0003_');
    }
}
