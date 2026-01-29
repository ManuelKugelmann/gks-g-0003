# Contributing

1.  **Scene Structure**: Use `IntroScene`, `MainScene`, and `EndScene` as a baseline.
2.  **Logic**: Keep game logic contained within your `scenes` and `objects`.
3.  **UI**: Use `@gks/ui` for shared UI components (e.g., `BurgerMenu`).
4.  **Meta**: Ensure your `IntroScene` exports `gameMeta` correctly.
5.  **Localization**: Support for **English (en)** and **German (de)** is MANDATORY.
    - Check `this.registry.get('currentLanguage')` ('en' or 'de').
    - Provide text/audio for both languages.
6.  **Testing**: Test your game in isolation using `npm run dev` or within the portal.
