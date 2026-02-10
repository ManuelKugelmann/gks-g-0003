import LocalStorageSystem from '../../../platform/systems/LocalStorageSystem';

const SCHEMA_VERSION = 1;

export default class ProgressionManager {
    constructor() {
        this.prefix = 'gks_0003_';
        this.dataKey = `${this.prefix}data`;
        this.cache = {};
        this.isInitialized = false;
    }

    async init() {
        return new Promise((resolve) => {
            this.cache = LocalStorageSystem.load(this.dataKey, {}, SCHEMA_VERSION);
            this.isInitialized = true;
            console.log(`[ProgressionManager] Initialized. Version: ${SCHEMA_VERSION}`, this.cache);
            resolve();
        });
    }

    async set(key, value) {
        if (!this.isInitialized) await this.init();
        this.cache[key] = value;
        this._save();
    }

    get(key, defaultVal) {
        if (this.cache[key] !== undefined) return this.cache[key];
        return defaultVal;
    }

    resetProgress() {
        console.warn('[ProgressionManager] RESETTING PROGRESS...');
        LocalStorageSystem.wipe(this.prefix);
        this.cache = {};
        window.location.reload();
    }

    _save() {
        LocalStorageSystem.save(this.dataKey, this.cache, SCHEMA_VERSION);
    }
}
