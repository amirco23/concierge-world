# Concierge World

A 3D walkable space based on the concierge lobby. Move with **arrow keys** or **WASD**, look with the **mouse**. When you walk up to the reception desk, a voice and text conversation module opens with the concierge.

## Run locally

ES modules require a local server (no `file://`).

```bash
cd concierge-world
npx serve .
```

Then open **http://localhost:3000** (or the URL shown) and click the scene to lock the pointer and start moving.

## Controls

- **Mouse** — Look around
- **W / ↑** — Forward
- **S / ↓** — Backward
- **A / ←** — Strafe left
- **D / →** — Strafe right
- **Click** — Lock/unlock pointer

## Conversation module

When you get close to the concierge desk, the chat panel opens. You can:

- **Type** messages and press Enter or Send
- **Use the microphone** (if your browser supports Web Speech API) for voice input

Close the panel with the **×** button to return to walking.
