# Hebrew Homestead Game Design

## Game Summary

Hebrew Homestead is a cozy click-based illustrated homestead management game about gardening, clean food, crafting, Sabbath rhythm, biblical stewardship, and peaceful learning.

The player navigates between illustrated homestead scenes by clicking hotspots. Each scene represents a place such as the cabin, living room, bedroom, kitchen, pantry, barn, garden, workshed, forest, well, or Sabbath resting area.

## Core Gameplay Loop

1. Start at the Homestead Overview.
2. Click a scene hotspot to visit an area.
3. Gather clean resources, water, herbs, wood, and stone.
4. Buy or sell supplies, tools, animals, and goods using fictional in-game coins.
5. Craft tools that unlock better forest stewardship, fishing, animal care, and clean wild-game gathering.
6. Tend crop beds in the garden.
7. Care for clean barn animals.
8. Cook clean foods in the kitchen.
9. Grow practical skills through repeated work rather than formal level-up menus.
10. Review character stats and improve clothing at the bedroom dresser.
11. Read short journal entries.
12. Prepare for Sabbath on Preparation Day.
13. Enter Sabbath Rest, then begin the next work day with Shalom Rest.

## Current Mechanics

- The world is organized as illustrated homestead scenes.
- Scenes use local image paths with CSS placeholder fallback backgrounds.
- Hotspots are absolutely positioned buttons with percentage x, y, width, and height.
- Clicking a hotspot navigates, opens a modal, gathers resources, tends crops, cooks, crafts, orders supplies, rests, or completes Sabbath preparation.
- H toggles hotspot debug borders for placement tuning.
- The bedroom bed offers a once-per-day nap or evening sleep-through-night option. Full sleep restores stamina and energy and grants a work-day rested boost; living room/cabin short rests are smaller and limited.
- The bedroom dresser opens Character & Clothing, where the player can see practical skill growth and choose clothing.
- Skills grow quietly through use: gardening, animal care, cooking, crafting, and gathering improve quality for related produce, animal harvests, cooked food, crafted materials, fish, meat, and gathered herbs.
- Clothing options focus on different kinds of work and can be improved with cloth. Matching clothing helps practice build more quickly, and high-rank clothing can support quality gains.
- The bathroom is reached from the living room and offers bathing, hand washing, and teeth brushing.
- Bathing grants a Relaxed buff and a small stamina recovery. Washing hands grants a Clean Hands buff for cooking quality. Brushing teeth grants a Fresh Start buff for upcoming harvest and production yields.
- The kitchen uses a pantry doorway for dry storage and a separate Ice Box panel for clean dairy and refrigerated prepared foods.
- The kitchen counter can prep ingredients before stove cooking. Counter-prepped food cooks one quality tier higher than direct stove cooking.
- The well draw fills general household water and tops off the garden watering can in one visit.
- The well area includes a laundry wash basin. Clean laundry creates a temporary buff for upcoming harvest and production yields.
- Active buffs are shown as small colored emblems in the upper-right of the scene image, and their effects are listed in the Status panel.
- The barn scene supports grouped clean animals: chickens, sheep, goats, and cattle.
- Clicking an animal group shows how many are owned and offers care or harvest actions.
- Barn care includes adding feed to the trough, adding water to the trough, cleaning for manure, collecting eggs and feathers, milking with a bucket, shearing with shears, and clean meat/material harvesting.
- The shop allows immediate fictional buying and selling, including animals, feed, tools, supplies, and goods. Existing delayed supply orders remain available.
- The garden image has fifteen clickable crop beds, a watering can refill spot, and a fence gate that opens a More Fields planning panel.
- Crop beds are generic garden spaces rather than crop-specific beds. The player can rename each bed, add more than one planting, work in compost or fertilizer before planting, water from the filled watering can, weed, inspect, and harvest.
- Garden feedback uses lightweight CSS animation layers for seed placement, hand/tool motion, dirt puffs, water pouring, soil darkening, crop sway, weed growth, weed pulling, harvest motion, compost steam, seasonal tinting, and tiny ambient insects/dew.
- Produce, clean fish, meat, animal products, and prepared foods can carry Standard, Good, or Excellent quality.
- The forest scene supports fallen branch gathering, tree harvesting with an axe, stone gathering by hand or with a pickaxe, clean fishing with a pole or net, and deer hunting with a bow and arrows.
- Deer are treated as reviewed clean wild game. Venison is clean only within the project rule that it is prepared without blood and framed as stewardship, not combat.
- Fish rewards use `cleanFish` to represent fish with fins and scales rather than unreviewed generic fish.
- Time advances through actions and the Next Day button.
- Crops advance each day only if watered.
- Rooms can show periodic visual cleaning objects such as dishes, crumbs, dust, book stacks, crates, sawdust, and straw.
- Pending fictional orders arrive after one or two in-game days.
- localStorage saves the homestead state.

## Scene Data Structure

Each scene has:

- `id`
- `title`
- `description`
- `background`
- `hotspots`

Each hotspot has:

- `id`
- `label`
- `x`, `y`, `w`, `h` as percentages
- `action`
- optional `target`
- optional `requirement`
- optional message or action data

## Main Scenes

- Homestead Overview
- Cabin Entry
- Living Room
- Bedroom
- Kitchen
- Pantry
- Barn
- Garden
- More Fields panel
- Workshed
- Forest
- Well / Water Area
- Sabbath Area

## Preserved Systems

- Inventory
- Crop catalog and crop growth
- Clean food data
- Crafting recipes
- Cooking recipes
- Journal entries
- Sabbath preparation checklist
- Sabbath rest rules
- Time, day, week, season, and weather
- Shalom Rest boost
- Save/load

## Data Structures

- Scenes: scene objects with hotspot arrays.
- Inventory: item counts, including water, watering can water, wood, stone, herbs, crops, prepared food, plant matter, coins, seeds, clean dairy, refrigerated foods, clean fish, venison, eggs, milk, wool, feathers, manure, fertilizer, flax, hay, feed, clean meats, hides, fur, arrows, and supplies.
- Quality inventory: Standard, Good, and Excellent counts for tracked clean food and crafted material items.
- Skills: practice points for gardening, animal care, cooking, crafting, and gathering.
- Clothing: active outfit plus clothing rank for everyday clothes and focused work clothing.
- Buffs: active emblem-backed boosts such as Shalom Rest, Well Rested, Refreshed, Settled, Clean Laundry, Relaxed, Clean Hands, and Fresh Start.
- Tools: owned flags for hands, basket, watering can, basic axe, pickaxe, fishing pole, fishing net, bow, bucket, shears, hoe, drying rack, compost bin, garden bed, and Sabbath basket.
- Barn animals: grouped animal counts and daily care flags for fed, watered, cleaned, and product-collected status.
- Crops: named crop bed states with multiple plantings, watered state, weeds, compost, fertilizer, growth stages, harvest readiness, and locked expanded field beds for future upgrades.
- Kitchen and room chores: flags for dishes, counters, floor, dust, books, crates, sawdust, and straw that drive visual objects and cleaning actions.
- Recipes: clean crafting and cooking recipes with ingredient maps.
- Shop: immediate fictional buy/sell entries for supplies, tools, animals, and goods.
- Orders: pending fictional supply orders with item id, amount, and arrival day.
- Sabbath preparation: task ids for water, clean food, herbs, cottage tidying, tools, and Sabbath basket.
- Journal entries: short title/body entries with unlock flags.
- Save data: current scene, day, time, season, weather, inventory, quality inventory, skills, clothing, tools, crops, barn animals, orders, Sabbath prep, rest buffs, active buffs, prepped food, journal unlocks, and messages.

## Version 1 Crops

- Barley
- Lentils
- Cucumbers

## Version 1 Clean Cooking

- Barley Flatbread
- Lentil Stew
- Cucumber Herb Salad
- Herb Tea
- Simple Sabbath Meal
- Clean Fish Meal
- Venison Stew
- Egg Breakfast
- Chicken Soup
- Mutton Stew
- Goat Stew
- Beef Stew

## Version 1 Crafting

- Basic Axe
- Pickaxe
- Fishing Pole
- Fishing Net
- Bow
- Arrow Bundle
- Feathered Arrow Bundle
- Bucket
- Shears
- Feed Mix
- Hay Bundle
- Woven Cloth
- Linen Cloth
- Fertilizer
- Hoe
- Drying Rack
- Compost Bin
- Garden Bed
- Sabbath Basket

## Controls

- Mouse/tap: click hotspots and buttons
- J: journal
- I: inventory
- C: crafting
- K: cooking
- S: save
- R: rest in Cabin Entry or Living Room
- H: hotspot debug overlay
- Escape: close modal

## Future Expansion Notes

- Add and refine illustrated local scene assets. The garden currently uses `assets/images/scenes/garden-animation-aligned.png` so bed overlays and animations line up cleanly.
- Tune hotspot coordinates per final artwork.
- Add richer crop states, final overlay art, pantry and ice box storage, cooking, compost, weather effects, and tractor-upgrade field progression.
- Add Firstfruits, gleaning portions, honest trade, appointed times, Sukkot, land rest, and prayer/reflection systems.
- Add carefully reviewed clean animals and animal products later.
- Add mobile layout polish, audio, accessibility improvements, and save migration.
