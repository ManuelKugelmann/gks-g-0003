# Popup System Guide

The GKS Portal provides a robust `PopupManager` for displaying overlays, tutorials, level completion screens, etc.

## How to Use

1.  **Import**:
    ```javascript
    import PopupManager from '../../../platform/ui/PopupManager.js';
    ```

2.  **Initialize**:
    Create an instance in your Scene's `create` method.
    ```javascript
    this.popupManager = new PopupManager(this);
    ```

3.  **Show a Popup**:
    You can show a **Single Page** or **Multi-Page** popup.

### Simple (Single Page)
Good for simple alerts or info.

```javascript
this.popupManager.show({
    title: { en: "Level Complete", de: "Level Geschafft" },
    body: { en: "Great job!", de: "Gut gemacht!" },
    image: 'star_icon', // Texture key
    onClose: () => { console.log("Closed"); }
});
```

### Advanced (Multi-Page / JSON)
Good for tutorials. You can define the structure in a JSON file or a JS object.

```javascript
const tutorialConfig = {
    pages: [
        {
            title: { en: "Step 1", de: "Schritt 1" },
            body: { en: "Tap the screen.", de: "Tippe auf den Bildschirm." },
            slot1: 'hand_icon' // Animated sprite or image in left slot
        },
        {
            title: { en: "Step 2", de: "Schritt 2" },
            body: { en: "Win!", de: "Gewinne!" },
            video: 'assets/tutorial_video.mp4' // Optional video overlay
        }
    ]
};

this.popupManager.show(tutorialConfig);
```

## Features

*   **Localization**: `title`, `body`, `links.label` support `{ en: "...", de: "..." }` objects.
*   **Slots**: `slot1` (left) and `slot2` (right) can show images or animated sprites.
*   **Video**: `video` property accepts a URL to an MP4 file.
*   **Links**: `links: [{ label: "Wiki", url: "..." }]` adds buttons.
*   **Audio**: `audio: "sfx_key"` plays a sound when the page opens.
