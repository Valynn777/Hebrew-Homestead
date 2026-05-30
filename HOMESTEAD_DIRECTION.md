# Hebrew Homestead Direction

This document captures the current direction for turning Hebrew Homestead from a mostly scene-based click prototype into a more visual homestead life and management game.

## Core Direction

The game should feel like a cozy illustrated homestead map that grows over time. The player begins with a simple tent camp and gradually builds a full homestead with a cabin, garden, barn, animal housing, worker homes, workshop, market area, well, Sabbath rest area, and other unlockable spaces.

The main overview should become the central game board:

- A full illustrated map of the homestead and surrounding area.
- Clear clickable hotspots for each area.
- Buildings and areas that visually upgrade as the player invests resources.
- Small worker profile markers moving between locations to suggest daily work.
- Panels that open for each area instead of making every system feel like a separate flat menu.

The goal is not to make a full WASD movement game. The player should still be able to tap/click around comfortably on phone. The map should provide the feeling of a living place while the deeper gameplay happens through area panels.

## Player Movement On The Map

The player should also have a small round profile picture or emblem on the main homestead map, similar to the worker portrait markers.

The intended feel:

- The player taps/clicks an area on the map.
- The player's profile marker moves toward that location.
- After the marker arrives, the game opens that area's panel, or shows a clear button to enter/open the panel.
- This should feel like "click to go there" without requiring WASD, arrow keys, or direct character steering.
- The movement can be simple CSS animation between percentage positions. It does not need full pathfinding.

This gives the map more life while keeping the game phone-friendly. The player marker should be presentation and feedback, not a complex movement system.

## Main Overview Map

The main overview should eventually show the whole homestead and nearby land in one illustrated scene. It should include:

- Tent/camp starting area.
- Future cabin site.
- Garden and future field space.
- Well or water area.
- Workshed/workshop site.
- Barn site.
- Chicken coop site.
- Goat, sheep, and cattle pen areas.
- Worker housing area.
- Market stall or trade road.
- Forest path.
- Sabbath rest/gathering area.

Each location should be a clickable hotspot. Clicking a hotspot should open a focused panel for that area, similar in spirit to the current People panel.

The map should remain visible around panels when possible. Area panels should be larger and more immersive than the current small modals, but leave a little of the homestead map showing around the edges. This keeps the player oriented: the map is still the world, and panels are focused views into parts of that world.

Panel direction:

- Large centered panel over the map.
- Slight map border visible around the panel.
- Panel header with area name, current level, and key status.
- One main area image that changes with upgrades.
- Resource cards, action buttons, and progress details below or beside the image.
- Mobile layout should still keep buttons easy to tap and text readable.

## Area Panels

Each major area should have its own visual management panel. The panel should usually start with one main image representing the current state of that area, then upgrade over time.

Examples:

- Cabin panel: tent -> simple shelter -> cabin -> upgraded cabin.
- Garden panel: starter plot -> raised beds -> expanded garden -> fields.
- Barn panel: no barn -> basic barn -> larger barn.
- Chicken coop panel: no coop -> small coop -> upgraded coop.
- Worker homes panel: worker tent -> hut -> cabin -> lodge.
- Workshed panel: stump/workbench -> shed -> expanded workshop.
- Market panel: blanket stall -> wooden stall -> busy trading spot.

The current People/Workers panel is the model for this direction:

- A strong image anchor.
- Clear status cards.
- Upgrade buttons.
- Resource requirements.
- Worker portraits.
- Progression that changes both mechanics and presentation.

## Camp And Cabin Progression

The home area should begin as a small camp rather than a finished cabin.

Starting camp:

- Small tent.
- Fire pit or fireplace.
- Simple storage baskets.
- Basic sleeping/resting option.
- Basic cooking option, if the fire is lit.
- View should feel like the player is sitting in camp: inside or just outside the tent, with the fire visible.

The fire should be a meaningful interactive object:

- Unlit fire pit at first.
- Lit fire animation when the player lights it.
- Cooking becomes possible when fire is lit.
- Game or fish can be cooked at the fire.
- Later, the fireplace/fire pit can be upgraded to hold a pot once a pot is purchased, crafted, or found.
- Some fire upgrades can be represented with image overlays instead of generating a completely new background image for every small change.

Cabin upgrades should eventually replace or expand the camp:

- Tent camp.
- Simple shelter.
- Small cabin.
- Improved cabin.
- Later cabin rooms or furniture upgrades.

The cabin/camp panel should use one strong current-state image, with smaller overlays or animations for states like lit fire, cooking steam, pot upgrade, and nighttime glow.

## Scavenging And Sightseeing Tasks

The camp phase can introduce timed off-map tasks before the full homestead is built.

Possible actions:

- Go scavenging.
- Go sightseeing.
- Search nearby land.
- Forage around camp.
- Scout for building sites.

These actions should send the player character away for a duration. The player marker can move toward the forest/path edge, disappear or idle at the edge, then return with a result.

Possible rewards:

- Wood.
- Stone.
- Herbs.
- Plant matter.
- Seeds.
- Fish or clean game, if tools and rules allow.
- Small found objects such as a pot, cloth, basket, or tool part.

This can create early-game activity before the cabin, barn, and worker systems are fully established.

## Building Progression

New games should start small. The player should not begin with the whole homestead already built.

Suggested starting state:

- Tent camp.
- Fire pit.
- Simple storage baskets.
- Starter garden patch.
- Forest path.
- Basic water gathering.
- Sabbath/rest spot.

Buildings should unlock features:

- Cabin unlocks kitchen, bedroom rest, household rooms, and deeper family/home systems.
- Workshed unlocks better crafting and tool progression.
- Barn unlocks feed storage, animal care, and larger animal systems.
- Chicken coop unlocks chickens and eggs.
- Goat pen unlocks goats and goat milk.
- Sheep pen unlocks sheep and wool.
- Cattle shelter unlocks cattle and cow milk.
- Worker homes unlock additional resident workers.
- Market stall unlocks selling, named NPC orders, and trade progression.

Each building should have:

- Current level.
- Upgrade image.
- Resource cost.
- Gameplay unlocks.
- Clear reason to upgrade beyond just visuals.

## Worker Movement On The Map

Workers do not need full walking animation or pathfinding. The goal is to make the homestead feel alive without making the project much harder.

Use small round portrait markers on the main map:

- Each worker marker uses that worker's portrait.
- Markers appear near their assigned job location.
- When a worker assignment changes, the marker can slide or drift toward the new location.
- During the day, markers can gently idle, bob, or move along a simple line.
- On Sabbath, worker markers should stay near home/rest areas and not show work movement.

This can be done with CSS and percentage positions on the map rather than a full navigation engine.

Example worker destinations:

- Garden job -> garden area.
- Animals job -> barn/animal area.
- Forest job -> forest path.
- Kitchen job -> cabin/kitchen area.
- Market job -> market stall.
- Homes job -> worker housing.
- Rest/Sabbath -> worker home or Sabbath/rest area.

The worker markers should be decorative feedback first. They should not be required for the worker system to function.

Worker movement should visually coordinate with the player's own marker:

- Workers use round portrait markers.
- The player uses a distinct profile/emblem marker.
- Markers should avoid covering important buttons when possible.
- On Sabbath, both workers and player movement should visually settle toward rest/gathering locations rather than work areas.

## Sabbath Area Direction

The Sabbath area should be simpler and more intentional than the current broad activity area.

Preferred layout:

- A flower garden area.
- A peaceful seating area under a canopy.
- A Sabbath basket place/set-aside spot.
- A gathering, reading, and worship space.

The Sabbath area should have only two primary hotspots:

- Set Aside Sabbath Basket.
- Enter Sabbath Rest.

The "Set Aside Sabbath Basket" action should be used during Preparation Day. It represents setting apart the basket and final Sabbath supplies before rest begins.

The "Enter Sabbath Rest" action should begin a special Sabbath sequence. Instead of ordinary labor, entering Sabbath should:

- Play a worship/rest animation or illustrated sequence.
- Show a special series of pictures representing Sabbath from sundown to sundown.
- Communicate evening-to-evening day rhythm.
- Move the game to the next day at sundown when Sabbath is complete.
- Keep workers off work during Sabbath.
- Keep worker and player markers in rest/gathering positions.

The Sabbath sequence can be implemented as a modal or full-screen panel with several illustrated slides:

1. Sundown begins.
2. Basket and table set aside.
3. Reading/worship under the canopy.
4. Peaceful rest through the day.
5. Sundown closes Sabbath and the next work day begins.

The Sabbath area should feel set apart: fewer buttons, slower pacing, warm light, flowers, canopy seating, and a clear sense of rest.

## Animation Direction

Animations should remain lightweight and state-based.

Persistent animations:

- Lit campfire flame.
- Hearth/chimney smoke after cabin upgrade.
- Water shimmer at well.
- Garden crop sway.
- Animal idle movement.
- Workshop sparks or sawdust.
- Market cloth flutter.
- Bees near apiary.

Action animations:

- Build hammer/construction effect.
- Cooking steam.
- Watering crops.
- Planting seeds.
- Feeding animals.
- Gathering wood.
- Collecting eggs or milk.

The current overlay approach should continue: illustrated backgrounds underneath, HTML/CSS effects on top.

Image overlays should be used where they save work and improve clarity. For example, the camp fire pit can keep the same background image while overlays add:

- Flame.
- Smoke.
- Cooking pot.
- Steam.
- Night glow.

This allows upgrades and animations without needing a brand-new background image for every small state.

## NPC And Order Direction

Orders should eventually become character-driven rather than generic.

Future NPC order panels should include:

- Named NPC portrait.
- Relationship level.
- Requested items.
- Due day.
- Reward.
- Short dialogue.
- History of fulfilled requests.

This will make the world feel more personal and alive.

## Visual Asset Direction

Generated art can be used to build the first visual pass quickly. Assets should be saved under project folders, for example:

- `assets/images/scenes/progression/`
- `assets/images/people/`
- `assets/images/housing/`
- `assets/images/buildings/`
- `assets/images/npcs/`
- `assets/images/panels/`

Art should stay consistent:

- Warm hand-painted 2D game style.
- Cozy rural ancient homestead feeling.
- No modern materials.
- No logos or text baked into images.
- Clear silhouettes for small UI use.
- Enough open space for hotspots and overlays.

## Implementation Approach

Build this in small safe layers:

1. Main overview becomes a full homestead map with clear clickable areas.
2. New games start at tent camp, but the map should be designed to show where future areas will grow.
3. Build Homestead panel controls building unlocks.
4. Replace area navigation with larger area panels where appropriate.
5. Add upgraded images for each building/area.
6. Add the player profile/emblem marker to the main overview map.
7. Add worker portrait markers on the main overview map.
8. Add simple marker movement from one map location to another.
9. Add state-based animations like campfire, smoke, cooking steam, and construction effects.
10. Redesign the Sabbath area as a focused flower garden/canopy rest space with only two primary hotspots.
11. Convert generic orders into named NPC order cards.
12. Refine mobile layout and touch ergonomics.

The important principle: keep the existing management systems, but make them feel visual, progressive, and alive.

## Current Commit Preference

The worker invite persistence fix is a safe checkpoint to keep and push.

The tent camp homestead progression commit is more experimental because the main overview direction is changing toward a full homestead map with area panels, player marker movement, and worker markers. It can be revised before pushing if needed.
