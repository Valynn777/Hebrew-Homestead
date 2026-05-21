# Hebrew Homestead

Hebrew Homestead is a cozy click-based illustrated homestead management game about stewardship, clean food, gardening, crafting, Sabbath preparation, Sabbath rest, and journal-based learning.

The project is static and GitHub Pages friendly. It uses only HTML, CSS, JavaScript, localStorage, and local asset paths. There is no backend, database, login, npm dependency, build step, external API, or real online ordering.

## How to Run Locally

Open `index.html` directly in a modern browser.

## Publishing with GitHub Pages

1. Push the project folder to a GitHub repository.
2. In repository settings, open Pages.
3. Set the source to the main branch and root folder.
4. Save and wait for GitHub Pages to publish the static files.

## Controls

- Mouse/tap: click hotspots and buttons
- J: open or close journal
- I: open or close inventory
- C: open or close crafting
- K: open or close cooking
- S: save manually
- Save button: open Save Manager for save now, backup restore, export, and import
- R: rest when in Cabin Entry or Living Room
- H: toggle hotspot debug overlay
- Escape: close modal

## Current Features

- Click-based scene navigation with absolutely positioned hotspots
- Full Homestead Overview image with responsive percentage-based hotspots
- Placeholder scene backgrounds that still work if other image files are missing
- Scenes for Homestead Overview, Cabin Entry, Living Room, Bedroom, Kitchen, Pantry, Barn, Garden, Workshed, Forest, Well / Water Area, and Sabbath Area
- Pop-up Status panel for day, weekday, season, weather, time, stamina, energy, water, Sabbath status, Shalom Rest, rest buffs, daily rest uses, goals, and Sabbath prep
- Pop-up Areas panel for navigating without clicking the scene image
- Inventory, tools, crop beds, barn animals, crafting, cooking, fictional shop/ordering, journal, Sabbath preparation, Sabbath rest, save/load, backup, export/import, and reset
- Hotspot debug mode with visible boxes and labels
- Gentle scene animation layers for smoke, glow, drifting overlays, leaves, and well shimmer
- Visual cleaning objects for dishes, crumbs, dust, books, crates, sawdust, and straw after cooking or day changes
- Bedroom bed hotspot with limited nap and evening sleep-through-night recovery options; living room/cabin short rests are limited separately
- Kitchen pantry doorway plus a separate Ice Box panel for clean dairy and refrigerated prepared foods
- Clean-food-only starter recipes and ingredient rules
- Barn scene image with clickable animal groups for chickens, sheep, goats, and cattle
- Animal ownership counts, feed trough, water trough, barn cleaning for manure, eggs, feathers, milk, shearing, and clean meat harvesting
- Shop modal for buying supplies, tools, feed, hay, and animals, plus selling goods and animals for fictional coins
- Garden image with fifteen clickable beds, watering can refill, and a fence gate that opens a More Fields planning panel
- Crop beds can be renamed, hold multiple plantings, receive compost or fertilizer before planting, and support watering, weeding, inspecting, and harvesting
- Lightweight garden animations for planting, watering, crop sway, weeds, harvest, compost steam, soil quality, seasonal tinting, bees, butterflies, and dew shimmer
- Kitchen counter food prep can stage ingredients before stove cooking for higher-quality prepared food
- Produce, fish, meat, animal products, and prepared food track Standard, Good, or Excellent quality
- Crafting paths for cloth, fertilizer, feed, hay, and feathered arrows
- Forest scene image with hotspots for fallen branches, trees, stone pile, herb forage, pond/stream, and deer
- Forest tools and requirements: axe for trees, pickaxe for better stone gathering, fishing pole or net for clean fish, bow and arrows for deer
- Clean wild-game and fish items: venison, hide, fur, clean fish, clean fish meal, and venison stew
- Versioned localStorage save/load for scene, time, inventory, quality inventory, tools, crops, barn animals, kitchen and room chores, orders, Sabbath prep, Shalom Rest, rest buffs, prepped food, journal unlocks, and messages

## Save System

- Autosaves after normal play actions.
- Saves again when the page is hidden or closed.
- Keeps a backup copy before overwriting the main save.
- `S` performs an immediate manual save.
- The Save Manager can export save text, import pasted save text, and restore the backup copy.

## Scene Images

The game expects future local images at:

- `assets/images/scenes/homestead-overview.png`
- `assets/images/scenes/cabin-entry.png`
- `assets/images/scenes/living-room.png`
- `assets/images/scenes/bedroom.png`
- `assets/images/scenes/kitchen.png`
- `assets/images/scenes/pantry.png`
- `assets/images/scenes/barn.png`
- `assets/images/scenes/garden-animation-aligned.png` currently used for the garden scene
- `assets/images/scenes/garden.png` original garden image kept for reference
- `assets/images/scenes/workshed.png`
- `assets/images/scenes/forest.png`
- `assets/images/scenes/well.png`
- `assets/images/scenes/sabbath-area.png`

If an image is missing, the scene still displays a pleasant placeholder with title, description, and usable hotspots.

## Known Limitations

- Some scene art is still placeholder-only until local images are added.
- Hotspot placement is approximate and intended to be adjusted with the debug overlay.
- Gardening uses fifteen main crop beds plus a locked More Fields planning panel for future tractor-upgrade fields.
- Garden animations are CSS-based placeholders, so final custom overlay art and audio are still future polish.
- Orders are fictional in-game purchases only and arrive by day count.
- Deer, fishing, and stone harvesting are first-pass resource actions without seasonal population management yet.
- Barn animals are first-pass grouped counts rather than individually named animals.
- Animal harvest has no animation and is intentionally handled through text-only stewardship messaging.
- There is no audio, accessibility pass, or deep cooking/storage system yet.

## Future Plans

- Add illustrated local scene images and tune hotspot placement.
- Add richer pantry storage, cooking, crop feedback, and soil care.
- Add Firstfruits, gleaning, honest measures, land rest, appointed times, and Sukkot.
- Expand clean animal, wild-game, fishing, and crafting systems with stronger stewardship limits, breeding, housing upgrades, and richer care cycles.
- Add audio, polish, accessibility improvements, and mobile-specific layout refinements.
