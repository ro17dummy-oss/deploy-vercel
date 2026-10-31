# Nox Aion 4.8 Portal — Original Signature Design System (`nox-custom-theme.css`)

> Implements `MASTER.md` UI/UX Pro Max Gaming Dark Mode tokens with 3 live-switchable presets (`aether`, `sanctum`, `balaur`).

## 1. Signature Color Palettes
### Preset 1 (Default): `aether` — Abyssal Aether & Celestial Gold
- `--bg`: `#060711` (Abyssal Midnight Base)
- `--bg-1`: `#0b0d1e` (Elevated Astral Indigo Surface)
- `--bg-2`: `#11152c` (Glassmorphic Card Surface)
- `--accent`: `#8b5cf6` (Aether Violet Glow)
- `--accent-grad`: `linear-gradient(135deg, #7c3aed 0%, #c026d3 55%, #e11d48 100%)`
- `--gold`: `#f5c451` (Radiant Atreian Gold)

### Preset 2: `sanctum` — Elyos Celestial Cyan & Imperial Gold
- `--bg`: `#040914`, `--accent`: `#0ea5e9`, `--accent-grad`: `linear-gradient(135deg, #0284c7 0%, #2563eb 55%, #7c3aed 100%)`

### Preset 3: `balaur` — Balaurea Crimson & Obsidian
- `--bg`: `#09060a`, `--accent`: `#f43f5e`, `--accent-grad`: `linear-gradient(135deg, #e11d48 0%, #db2777 55%, #9333ea 100%)`

## 2. Typography Stack
- `--display`: `"Cinzel", "Forum", serif` (Engraved Dark Fantasy Uppercase Headings)
- `--body`: `"Chakra Petch", "Hanken Grotesk", system-ui, sans-serif` (Geometric Gaming HUD Controls & Cards)
- `--mono`: `"Spline Sans Mono", ui-monospace, monospace` (Telemetry, GP/AP Ranks, Credit Wallet)

## 3. Architectural Components
1. **Floating HUD Capsule Navbar** (`.site-header .wrap.nav`) with glassmorphic blur & illuminated active menu pill.
2. **Ambient Aether Mesh + Tactical Grid Overlay** (`body::before`) for depth without heavy GPU cost.
3. **Floating Style Switcher** (`#noxThemeSwitcher`) at bottom-left for instant switching between `Aether`, `Sanctum`, and `Balaur`.
