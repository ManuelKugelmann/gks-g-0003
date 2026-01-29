# Implementing Patreon Paywalls (Freemium Model)

The GKS Portal supports a "Freemium" model where the base game is free for everyone (Guests), but specific advanced features or levels are locked for Patreon supporters.

## Philosophy
*   **Base Game**: Should be fun, complete, and playable for everyone.
*   **Premium Features**: "Cheats", advanced modes, level editors, or cosmetic skins can be locked behind the `isMember` check.

## How to Check Membership

The portal injects a `user` object into your Phaser Scene's Registry. You can access it in your `create()` method:

```javascript
create() {
    // 1. Get User Data
    const user = this.registry.get('user') || { name: 'Guest', tier: 'Guest', isMember: false };
    
    this.isMember = user.isMember; // boolean: true if logged in & active patron
    this.userTier = user.tier;     // string: 'Free', 'Werkstatt-Supporter', etc.
}
```

## Example: Locking a Button

Here is a standard pattern for a locked feature button:

```javascript
const btn = this.add.rectangle(x, y, 200, 60, 0x333333).setInteractive();
const label = this.add.text(x, y, "Pro Feature", { color: '#ffffff' });

// Add Lock Icon if not a member
if (!this.isMember) {
    this.add.image(x + 80, y, 'lock_icon').setScale(0.5);
}

btn.on('pointerdown', () => {
    // CHECK LOCK
    if (!this.isMember) {
        // Show "Locked" Generic Popup or Console Message
        console.log("Locked! Please subscribe on Patreon.");
        return;
    }

    // EXECUTE FEATURE
    console.log("Pro Feature Activated!");
});
```

## Testing
To test this locally without a real login:
1.  Open `dev-test/main-dev.js`.
2.  Modify the mock registry data to simulate different users:
    ```javascript
    }
    ```

## Advanced: Tier-Based Unlocks

You can unlock features progressively based on specific tiers using the `user.tier` string.

**Pattern:**
*   **Guest**: Basic / Free version.
*   **Tier 1**: All Guest features + Special #1.
*   **Tier 2**: All Tier 1 features + Special #2.

```javascript
/* EXAMPLE TIER CHECK */
const tier = this.registry.get('user').tier; // 'Guest', 'Free', 'Werkstatt-Supporter'

// Helper (pseudo-code)
const getLevel = (t) => {
    if (t === 'Werkstatt-Supporter') return 2;
    if (t === 'Free') return 1;
    return 0; // Guest
}

const level = getLevel(tier);

if (level >= 1) {
    // Unlock Tier 1 Content
}
if (level >= 2) {
    // Unlock Tier 2 Content
}
```

> [!WARNING]
> **Work in Construction**
> The Tier names and hierarchy are subject to change. Please build your checks flexibly so they can be easily updated in the future. We are currently iterating on the best user experience.
