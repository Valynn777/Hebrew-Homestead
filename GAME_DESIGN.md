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
9. Read short journal entries.
10. Prepare for Sabbath on Preparation Day.
11. Enter Sabbath Rest, then begin the next work day with Shalom Rest.

## Current Mechanics

- The world is organized as illustrated homestead scenes.
- Scenes use local image paths with CSS placeholder fallback backgrounds.
- Hotspots are absolutely positioned buttons with percentage x, y, width, and height.
- Clicking a hotspot navigates, opens a modal, gathers resources, tends crops, cooks, crafts, orders supplies, rests, or completes Sabbath preparation.
- H toggles hotspot debug borders for placement tuning.
- The bedroom bed offers a nap or sleep-through-night option. Full sleep restores stamina and energy and grants a short rested boost.
- The kitchen uses a pantry doorway for dry storage and a separate Ice Box panel for clean dairy and refrigerated prepared foods.
- The barn scene supports grouped clean animals: chickens, sheep, goats, and cattle.
- Clicking an animal group shows how many are owned and offers care or harvest actions.
- Barn care includes adding feed to the trough, adding water to the trough, cleaning for manure, collecting eggs and feathers, milking with a bucket, shearing with shears, and clean meat/material harvesting.
- The shop allows immediate fictional buying and selling, including animals, feed, tools, supplies, and goods. Existing delayed supply orders remain available.
- The garden image has clickable crop beds, a watering can refill spot, compost, herbs, and a fence gate into Additional Fields.
- Crop beds support planting, watering from the filled watering can, weeding, fertilizing, inspecting, and harvesting.
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
- Additional Fields
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
- Tools: owned flags for hands, basket, watering can, basic axe, pickaxe, fishing pole, fishing net, bow, bucket, shears, hoe, drying rack, compost bin, garden bed, and Sabbath basket.
- Barn animals: grouped animal counts and daily care flags for fed, watered, cleaned, and product-collected status.
- Crops: crop bed states for barley, lentils, cucumbers, and expanded field beds, including watering, weeds, and fertilizer.
- Kitchen and room chores: flags for dishes, counters, floor, dust, books, crates, sawdust, and straw that drive visual objects and cleaning actions.
- Recipes: clean crafting and cooking recipes with ingredient maps.
- Shop: immediate fictional buy/sell entries for supplies, tools, animals, and goods.
- Orders: pending fictional supply orders with item id, amount, and arrival day.
- Sabbath preparation: task ids for water, clean food, herbs, cottage tidying, tools, and Sabbath basket.
- Journal entries: short title/body entries with unlock flags.
- Save data: current scene, day, time, season, weather, inventory, tools, crops, barn animals, orders, Sabbath prep, Shalom Rest, rested boost, journal unlocks, and messages.

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

- Add illustrated local scene assets.
- Tune hotspot coordinates per final artwork.
- Add richer crop states, pantry and ice box storage, cooking, compost, and weather effects.
- Add Firstfruits, gleaning portions, honest trade, appointed times, Sukkot, land rest, and prayer/reflection systems.
- Add carefully reviewed clean animals and animal products later.
- Add mobile layout polish, audio, accessibility improvements, and save migration.
