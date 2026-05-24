"use strict";

const SAVE_VERSION = 10;
const SAVE_KEY = "hebrew-homestead-click-v1";
const SAVE_BACKUP_KEY = `${SAVE_KEY}-backup`;
const NAMED_SAVE_PREFIX = `${SAVE_KEY}-save-`;
const MAX_NAMED_SAVES = 5;

const weekdays = ["Day One", "Day Two", "Day Three", "Day Four", "Day Five", "Preparation Day", "Sabbath"];
const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const weatherCycle = ["Clear", "Gentle Clouds", "Light Rain", "Warm Breeze", "Still Evening", "Soft Rain"];

const OUTDOOR_SCENES = new Set([
  "overview", "cabin", "barn", "chickenCoop", "cowPasture", "goatPen",
  "sheepPasture", "garden", "apiary", "workshed", "forest", "treeFarm",
  "rockQuarry", "marketplace", "well", "sabbath"
]);

const sceneImages = {
  overview: "assets/images/scenes/homestead-overview.png",
  cabin: "assets/images/scenes/cabin/cabin-entry.png",
  kitchen: "assets/images/scenes/cabin/kitchen.png",
  livingRoom: "assets/images/scenes/cabin/living-room.png",
  bedroom: "assets/images/scenes/cabin/bedroom.png",
  bathroom: "assets/images/scenes/cabin/bathroom.png",
  pantry: "assets/images/scenes/pantry.png",
  barn: "assets/images/scenes/barn/barn.png",
  chickenCoop: "assets/images/scenes/barn/chicken-coop.png",
  cowPasture: "assets/images/scenes/barn/cows.png",
  goatPen: "assets/images/scenes/barn/goats.png",
  sheepPasture: "assets/images/scenes/barn/sheep.png",
  garden: "assets/images/scenes/garden/garden.png",
  apiary: "assets/images/scenes/garden/apiary.png",
  workshed: "assets/images/scenes/workshed/workshed.png",
  forest: "assets/images/scenes/forest/forest.png",
  treeFarm: "assets/images/scenes/forest/trees.png",
  rockQuarry: "assets/images/scenes/forest/rock quarry.png",
  marketplace: "assets/images/scenes/homestead market.png",
  well: "assets/images/scenes/well.png",
  sabbath: "assets/images/scenes/sabbath-area.png"
};

const imageStatus = {};

const scenes = {
  overview: {
    id: "overview",
    title: "Homestead Overview",
    description: "The cabin, garden, workshed, forest path, well, and Sabbath resting place sit within easy reach.",
    background: sceneImages.overview,
    hotspots: [
      hs("cabin", "Cabin", 18, 14, 45, 49, "navigate", { target: "cabin" }),
      hs("barn", "Barn", 6, 29, 12, 16, "navigate", { target: "barn" }),
      hs("garden", "Garden", 0, 60, 48, 38, "navigate", { target: "garden" }),
      hs("workshed", "Workshed", 67, 30, 25, 29, "navigate", { target: "workshed" }),
      hs("forest", "Forest Path", 56, 10, 33, 27, "navigate", { target: "forest" }),
      hs("well", "Well / Water Area", 57, 62, 16, 23, "navigate", { target: "well" }),
      hs("marketplace", "Marketplace", 8, 9, 15, 17, "navigate", { target: "marketplace" }),
      hs("sabbath", "Sabbath Area", 77, 61, 21, 30, "navigate", { target: "sabbath" })
    ]
  },
  cabin: {
    id: "cabin",
    title: "Cabin Entry",
    description: "A quiet homestead cabin with four rooms — each visible from above.",
    background: sceneImages.cabin,
    hotspots: [
      hs("kitchen", "Kitchen", 18, 4, 5, 5, "navigate", { target: "kitchen" }),
      hs("livingRoom", "Living Room", 66, 4, 5, 5, "navigate", { target: "livingRoom" }),
      hs("bedroom", "Bedroom", 17, 50, 5, 5, "navigate", { target: "bedroom" }),
      hs("bathroom", "Bathroom", 70, 50, 5, 5, "navigate", { target: "bathroom" }),
      hs("outside", "Back Outside", 44, 86, 5, 5, "navigate", { target: "overview" }),
      hs("journal", "Journal", 52, 68, 5, 5, "modal", { modal: "journal" }),
      hs("dustBench", "Sweep Dust", 34, 74, 5, 5, "cleanRoomChore", { room: "cabin", chore: "dust", effect: "tidy", message: "The entry bench is swept clean." }),
      hs("putAwayBooks", "Put Books Away", 58, 74, 5, 5, "cleanRoomChore", { room: "cabin", chore: "books", effect: "tidy", message: "The books are set neatly in place." })
    ]
  },
  livingRoom: {
    id: "livingRoom",
    title: "Living Room",
    description: "A warm sitting room for quiet rest, reflection, and simple household care.",
    background: sceneImages.livingRoom,
    hotspots: [
      hs("rest", "Rest", 30, 42, 25, 22, "rest"),
      hs("bedroom", "Bedroom", 0, 8, 14, 48, "navigate", { target: "bedroom" }),
      hs("bathroom", "Bathroom", 14, 8, 13, 40, "navigate", { target: "bathroom" }),
      hs("dustBunnies", "Sweep Dust Bunnies", 18, 62, 26, 21, "cleanRoomChore", { room: "livingRoom", chore: "dust", effect: "tidy", message: "The dust bunnies are swept away." }),
      hs("books", "Put Books Away", 56, 42, 22, 20, "cleanRoomChore", { room: "livingRoom", chore: "books", effect: "tidy", message: "The living room books are put away." }),
      hs("journal", "Read Journal", 42, 66, 18, 14, "modal", { modal: "journal" }),
      hs("back", "Back to Cabin", 4, 8, 17, 13, "navigate", { target: "cabin" })
    ]
  },
  bedroom: {
    id: "bedroom",
    title: "Bedroom",
    description: "A quiet room for sleep, recovery, and a gentle restart after a long day.",
    background: sceneImages.bedroom,
    hotspots: [
      hs("bed", "Bed", 26, 35, 48, 34, "modal", { modal: "bedRest" }),
      hs("dresser", "Dresser", 80, 36, 15, 26, "modal", { modal: "character" }),
      hs("back", "Back to Living Room", 0, 13, 14, 48, "navigate", { target: "livingRoom" })
    ]
  },
  bathroom: {
    id: "bathroom",
    title: "Bathroom",
    description: "A clean washroom for bathing, brushing teeth, washing hands, and renewing strength.",
    background: sceneImages.bathroom,
    hotspots: [
      hs("bathtub", "Bathe", 66, 51, 31, 36, "bathe"),
      hs("sink", "Wash Hands", 18, 39, 30, 24, "washHands"),
      hs("drinkSink", "Drink Water", 18, 59, 30, 10, "drinkWater", { source: "sink" }),
      hs("mirror", "Brush Teeth", 17, 12, 25, 26, "brushTeeth"),
      hs("back", "Back to Living Room", 0, 11, 12, 61, "navigate", { target: "livingRoom" })
    ]
  },
  kitchen: {
    id: "kitchen",
    title: "Kitchen",
    description: "Clean food is prepared here with simple ingredients, water, and gratitude.",
    background: sceneImages.kitchen,
    hotspots: [
      hs("sink", "Wash Dishes", 4, 38, 15, 24, "washDishes"),
      hs("drinkSink", "Drink Water", 4, 62, 15, 10, "drinkWater", { source: "sink" }),
      hs("stove", "Stove / Cooking", 25, 40, 17, 27, "modal", { modal: "cooking" }),
      hs("iceBox", "Ice Box", 64, 21, 18, 53, "modal", { modal: "iceBox" }),
      hs("pantryDoor", "Pantry", 82, 18, 14, 35, "navigate", { target: "pantry" }),
      hs("counters", "Clean Counters", 45, 42, 19, 19, "cleanCounters"),
      hs("foodPrep", "Food Prep Area", 47, 56, 17, 27, "modal", { modal: "foodPrep" }),
      hs("floor", "Sweep Kitchen", 24, 73, 36, 17, "sweepKitchen"),
      hs("back", "Back to Cabin", 82, 56, 13, 25, "navigate", { target: "cabin" })
    ]
  },
  pantry: {
    id: "pantry",
    title: "Pantry",
    description: "Stored harvests, prepared food, jars, cloth, and other household supplies are kept here.",
    background: sceneImages.pantry,
    hotspots: [
      hs("ingredients", "View Ingredients", 10, 31, 22, 20, "modal", { modal: "inventory" }),
      hs("storeHarvest", "Store Harvest", 38, 34, 19, 19, "storeHarvest"),
      hs("preparedShelf", "Prepared Food Shelf", 64, 33, 22, 21, "modal", { modal: "cooking" }),
      hs("dustShelves", "Dust Shelves", 62, 27, 25, 24, "cleanRoomChore", { room: "pantry", chore: "dust", effect: "tidy", message: "The pantry shelves are dusted." }),
      hs("sortCrates", "Sort Crates", 32, 55, 30, 24, "cleanRoomChore", { room: "pantry", chore: "crates", effect: "tidy", message: "The pantry crates are sorted." }),
      hs("back", "Back to Kitchen", 5, 8, 17, 13, "navigate", { target: "kitchen" })
    ]
  },
  barn: {
    id: "barn",
    title: "Barn",
    description: "Clean animals, feed, eggs, milk, wool, and careful stewardship are managed here.",
    background: sceneImages.barn,
    hotspots: [
      hs("cattle",            "Cows",               3, 18, 11,  9, "navigate", { target: "cowPasture" }),
      hs("sheep",             "Sheep",             16, 18,  9,  9, "navigate", { target: "sheepPasture" }),
      hs("chickens",          "Chickens",          27, 18, 11,  9, "navigate", { target: "chickenCoop" }),
      hs("goats",             "Goats",             70, 18, 10,  9, "navigate", { target: "goatPen" }),
      hs("storage",           "Extra Animals",     82, 18, 10,  9, "modal",    { modal: "inventory" }),
      hs("feedArea",          "Feed Area",          1, 78, 10, 12, "addFeedTrough"),
      hs("waterTrough",       "Water Trough",      39, 63, 11, 12, "addWaterTrough"),
      hs("shop",              "Animal Market",     87, 18, 10, 11, "modal",    { modal: "shop" }),
      hs("animalMaintenance", "Animal Maintenance",86, 41, 11, 12, "modal",    { modal: "animalMaintenance" }),
      hs("cleanBarn",         "Clean Barn",        43, 50, 11, 12, "cleanBarn"),
      hs("sweepHay",          "Sweep Loose Straw", 27, 62, 10, 10, "cleanRoomChore", { room: "barn", chore: "straw", effect: "tidy", message: "Loose straw is swept into a neat pile." }),
      hs("outside",           "Back Outside",      38, 13, 13, 12, "navigate", { target: "overview" })
    ]
  },
  chickenCoop: {
    id: "chickenCoop",
    title: "Chicken Coop",
    description: "A warm coop where your chickens roost, scratch, and lay their eggs.",
    background: sceneImages.chickenCoop,
    hotspots: [
      hs("chickens", "Chickens", 24, 42, 5, 5, "animal", { animal: "chickens" }),
      hs("eggBasket", "Egg Basket", 72, 65, 5, 5, "animal", { animal: "chickens" }),
      hs("back", "Back to Barn", 44, 87, 5, 5, "navigate", { target: "barn" })
    ]
  },
  cowPasture: {
    id: "cowPasture",
    title: "Cow Pasture",
    description: "Sturdy dairy cattle rest and graze in their stall.",
    background: sceneImages.cowPasture,
    hotspots: [
      hs("cattle", "Cattle", 36, 36, 5, 5, "animal", { animal: "cattle" }),
      hs("milkPail", "Milk Pail", 79, 58, 5, 5, "animal", { animal: "cattle" }),
      hs("back", "Back to Barn", 43, 87, 5, 5, "navigate", { target: "barn" })
    ]
  },
  goatPen: {
    id: "goatPen",
    title: "Goat Pen",
    description: "Nimble goats browse their pen, producing rich milk for the household.",
    background: sceneImages.goatPen,
    hotspots: [
      hs("goats", "Goats", 29, 40, 5, 5, "animal", { animal: "goats" }),
      hs("milkBasket", "Milk Supplies", 78, 53, 5, 5, "animal", { animal: "goats" }),
      hs("back", "Back to Barn", 79, 40, 5, 5, "navigate", { target: "barn" })
    ]
  },
  sheepPasture: {
    id: "sheepPasture",
    title: "Sheep Pasture",
    description: "Gentle sheep rest in the hay, ready for shearing and care.",
    background: sceneImages.sheepPasture,
    hotspots: [
      hs("sheep", "Sheep", 35, 38, 5, 5, "animal", { animal: "sheep" }),
      hs("woolBasket", "Wool Basket", 76, 62, 5, 5, "animal", { animal: "sheep" }),
      hs("back", "Back to Barn", 79, 41, 5, 5, "navigate", { target: "barn" })
    ]
  },
  garden: {
    id: "garden",
    title: "Garden",
    description: "Clean crop beds, herbs, compost, and a watering can provide steady lessons in patience.",
    background: sceneImages.garden,
    hotspots: [
      hs("wateringCan", "Refill Watering Can", 3, 57, 16, 20, "refillWateringCan"),
      // Row 1 — hotspot centered on each bed (left = x-5, top = y-7, w=10, h=14)
      hs("bed1",  "Garden Bed 1",  17, 24, 10, 14, "crop", { crop: "bed1" }),
      hs("bed2",  "Garden Bed 2",  30, 24, 10, 14, "crop", { crop: "bed2" }),
      hs("bed3",  "Garden Bed 3",  43, 24, 10, 14, "crop", { crop: "bed3" }),
      hs("bed4",  "Garden Bed 4",  56, 24, 10, 14, "crop", { crop: "bed4" }),
      hs("bed5",  "Garden Bed 5",  69, 24, 10, 14, "crop", { crop: "bed5" }),
      // Row 2 — same columns, middle row
      hs("bed6",  "Garden Bed 6",  17, 43, 10, 14, "crop", { crop: "bed6" }),
      hs("bed7",  "Garden Bed 7",  30, 43, 10, 14, "crop", { crop: "bed7" }),
      hs("bed8",  "Garden Bed 8",  43, 43, 10, 14, "crop", { crop: "bed8" }),
      hs("bed9",  "Garden Bed 9",  56, 43, 10, 14, "crop", { crop: "bed9" }),
      hs("bed10", "Garden Bed 10", 69, 43, 10, 14, "crop", { crop: "bed10" }),
      // Row 3 — same columns, bottom row
      hs("bed11", "Garden Bed 11", 17, 62, 10, 14, "crop", { crop: "bed11" }),
      hs("bed12", "Garden Bed 12", 30, 62, 10, 14, "crop", { crop: "bed12" }),
      hs("bed13", "Garden Bed 13", 43, 62, 10, 14, "crop", { crop: "bed13" }),
      hs("bed14", "Garden Bed 14", 56, 62, 10, 14, "crop", { crop: "bed14" }),
      hs("bed15", "Garden Bed 15", 69, 62, 10, 14, "crop", { crop: "bed15" }),
      hs("fieldsGate", "More Fields", 33, 4, 22, 16, "fieldsPanel"),
      hs("apiary", "Apiary", 78, 52, 13, 17, "navigate", { target: "apiary" }),
      hs("rakeGarden", "Rake Garden Path", 4, 62, 14, 22, "gatherHay", { amount: 1, stamina: 3, source: "garden path" }),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  apiary: {
    id: "apiary",
    title: "Apiary",
    description: "Beehives hum at the garden edge, ready for careful honey and beeswax harvests.",
    background: sceneImages.apiary,
    hotspots: [
      hs("hiveLeft", "Harvest Hive", 22, 38, 15, 23, "harvestHive"),
      hs("hiveCenter", "Harvest Hive", 43, 34, 15, 24, "harvestHive"),
      hs("hiveRight", "Harvest Hive", 65, 39, 15, 23, "harvestHive"),
      hs("backGarden", "Back to Garden", 4, 8, 17, 13, "navigate", { target: "garden" })
    ]
  },
  fields: {
    id: "fields",
    title: "More Fields",
    description: "Locked future fields beyond the fence will give the homestead room to grow more clean food after upgrades.",
    background: sceneImages.garden,
    hotspots: [
      hs("field1", "Field 1", 31, 34, 25, 18, "crop", { crop: "field1" }),
      hs("field2", "Field 2", 54, 39, 25, 17, "crop", { crop: "field2" }),
      hs("field3", "Field 3", 66, 55, 25, 17, "crop", { crop: "field3" }),
      hs("gatherStraw", "Gather Loose Straw", 5, 38, 16, 24, "gatherHay", { amount: 2, stamina: 4, source: "field edges" }),
      hs("wateringCan", "Refill Watering Can", 15, 69, 14, 16, "refillWateringCan"),
      hs("backGarden", "Back to Garden", 46, 12, 18, 19, "navigate", { target: "garden" })
    ]
  },
  workshed: {
    id: "workshed",
    title: "Workshed",
    description: "Tools, supplies, crafting projects, and fictional in-game orders are managed here.",
    background: sceneImages.workshed,
    hotspots: [
      hs("workbench", "Workbench / Crafting", 12, 43, 24, 23, "modal", { modal: "crafting" }),
      hs("toolRack", "Tool Rack", 40, 28, 17, 24, "modal", { modal: "tools" }),
      hs("storageBins", "Storage Bins", 62, 44, 20, 20, "modal", { modal: "inventory" }),
      hs("catalog", "Shop / Supply Catalog", 76, 21, 16, 16, "modal", { modal: "shop" }),
      hs("putAway", "Put Tools Away", 39, 66, 23, 15, "putToolsAway"),
      hs("sweepSawdust", "Sweep Sawdust", 18, 66, 22, 15, "cleanRoomChore", { room: "workshed", chore: "sawdust", effect: "tidy", message: "The sawdust is swept from the workshed floor." }),
      hs("delivery", "Delivery Crate", 68, 68, 20, 14, "collectOrders"),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  forest: {
    id: "forest",
    title: "Forest",
    description: "A serene clearing with fallen wood, stones, herbs, water, trees, and clean wild game for careful stewardship.",
    background: sceneImages.forest,
    hotspots: [
      hs("branches", "Fallen Branches", 3, 56, 30, 25, "forestGather", { resource: "wood", amount: 2, stamina: 5 }),
      hs("treeFarm", "Tree Farm", 4, 19, 22, 34, "navigate", { target: "treeFarm" }),
      hs("rockQuarry", "Rock Quarry", 58, 63, 27, 24, "navigate", { target: "rockQuarry" }),
      hs("herbs", "Herb Forage", 74, 51, 20, 30, "forestGather", { resource: "herbs", amount: 2, stamina: 4, prep: "gatherHerbs" }),
      hs("pond", "Pond / Stream", 43, 33, 24, 16, "fishPond"),
      hs("deer", "Deer", 52, 26, 24, 18, "huntDeer"),
      hs("home", "Back Home", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  treeFarm: {
    id: "treeFarm",
    title: "Tree Farm",
    description: "Managed trees provide wood and logs when harvested with a sound axe.",
    background: sceneImages.treeFarm,
    hotspots: [
      hs("treeLeft", "Harvest Tree", 12, 19, 14, 46, "treeHarvestPanel"),
      hs("treeCenter", "Harvest Tree", 42, 11, 17, 56, "treeHarvestPanel"),
      hs("treeRight", "Harvest Tree", 70, 19, 16, 47, "treeHarvestPanel"),
      hs("backForest", "Back to Forest", 4, 8, 17, 13, "navigate", { target: "forest" })
    ]
  },
  rockQuarry: {
    id: "rockQuarry",
    title: "Rock Quarry",
    description: "Stone outcrops can be worked with a pickaxe for building and crafting supplies.",
    background: sceneImages.rockQuarry,
    hotspots: [
      hs("quarryLeft", "Harvest Stone", 13, 45, 19, 23, "stoneHarvestPanel"),
      hs("quarryCenter", "Harvest Stone", 38, 38, 22, 28, "stoneHarvestPanel"),
      hs("quarryRight", "Harvest Stone", 64, 48, 21, 24, "stoneHarvestPanel"),
      hs("looseStone", "Loose Stone", 37, 69, 24, 16, "stonePile"),
      hs("backForest", "Back to Forest", 4, 8, 17, 13, "navigate", { target: "forest" })
    ]
  },
  marketplace: {
    id: "marketplace",
    title: "Marketplace",
    description: "A homestead market space for trade, orders, and future passive selling.",
    background: sceneImages.marketplace,
    hotspots: [
      hs("marketStall", "Market Stall", 29, 34, 38, 36, "modal", { modal: "marketStall" }),
      hs("orders", "Community Orders", 64, 28, 23, 33, "modal", { modal: "orders" }),
      hs("backHome", "Back to Homestead", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  well: {
    id: "well",
    title: "Well / Water Area",
    description: "Water for the home, garden, cooking, and Sabbath preparation is gathered here.",
    background: sceneImages.well,
    hotspots: [
      hs("drinkWell", "Drink Water", 25, 35, 18, 10, "drinkWater", { source: "well" }),
      hs("gatherWater", "Gather Water", 31, 45, 22, 25, "gatherWater"),
      hs("fillJar", "Fill Water Jar", 58, 46, 20, 21, "fillWaterJar"),
      hs("laundry", "Wash Laundry", 5, 62, 31, 27, "washLaundry"),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  sabbath: {
    id: "sabbath",
    title: "Sabbath Area",
    description: "A prepared place for stopping ordinary labor, reading, reflecting, and receiving rest with delight.",
    background: sceneImages.sabbath,
    hotspots: [
      hs("prep", "View Sabbath Preparation", 10, 38, 25, 19, "modal", { modal: "sabbathPrep" }),
      hs("basket", "Set Aside Sabbath Basket", 39, 41, 23, 20, "setSabbathBasket"),
      hs("enter", "Enter Sabbath Rest", 66, 38, 23, 20, "enterSabbath", { prepOnly: true }),

      hs("reflection", "Read Sabbath Reflection", 34, 67, 30, 17, "sabbathReflection"),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" }),
      hs("worship", "Worship and Celebrate", 10, 62, 22, 16, "sabbathWorship"),
      hs("gathering", "Host a Gathering", 38, 62, 22, 16, "sabbathGathering"),
      hs("stroll", "Take a Sabbath Stroll", 67, 62, 22, 16, "sabbathStroll"),
      hs("endSabbath", "End Sabbath Rest", 66, 38, 23, 20, "endSabbath", { sabbathOnly: true })
    ]
  }
};

function hs(id, label, x, y, w, h, action, options = {}) {
  return { id, label, x, y, w, h, action, ...options };
}

const itemLabels = {
  water: "Water",
  wood: "Wood",
  logs: "Logs",
  stone: "Stone",
  herbs: "Herbs",
  hyssop: "Hyssop",
  mint: "Mint",
  cumin: "Cumin",
  coriander: "Coriander",
  dill: "Dill",
  hyssopSeeds: "Hyssop Seed",
  mintSeeds: "Mint Seed",
  cuminSeeds: "Cumin Seed",
  corianderSeeds: "Coriander Seed",
  dillSeeds: "Dill Seed",
  hyssopRemedy: "Hyssop Remedy",
  mintTonic: "Mint Tonic",
  cuminPoultice: "Cumin Poultice",
  corianderSalve: "Coriander Salve",
  dillTonic: "Dill Tonic",
  barley: "Barley",
  lentils: "Lentils",
  cucumbers: "Cucumbers",
  preparedFood: "Prepared Food",
  plantMatter: "Plant Matter",
  coins: "Coins",
  barleySeeds: "Barley Seed",
  lentilSeeds: "Lentil Seed",
  cucumberSeeds: "Cucumber Seed",
  jars: "Jars",
  lampOil: "Lamp Oil",
  cloth: "Cloth",
  ironToolHead: "Iron Tool Head",
  extraBasket: "Extra Basket",
  milk: "Milk",
  cheese: "Cheese",
  refrigeratedFood: "Refrigerated Food",
  barleyFlatbread: "Barley Flatbread",
  lentilStew: "Lentil Stew",
  cucumberHerbSalad: "Cucumber Herb Salad",
  herbTea: "Herb Tea",
  simpleSabbathMeal: "Simple Sabbath Meal",
  cleanFish: "Clean Fish",
  venison: "Venison",
  eggs: "Eggs",
  wool: "Wool",
  feathers: "Feathers",
  manure: "Manure",
  fertilizer: "Fertilizer",
  flax: "Flax",
  hay: "Hay",
  feed: "Feed",
  wateringCanWater: "Watering Can",
  chickenMeat: "Chicken Meat",
  mutton: "Mutton",
  goatMeat: "Goat Meat",
  beef: "Beef",
  hide: "Hide",
  fur: "Fur",
  arrows: "Arrows",
  cleanFishMeal: "Clean Fish Meal",
  venisonStew: "Venison Stew",
  eggBreakfast: "Egg Breakfast",
  chickenSoup: "Chicken Soup",
  muttonStew: "Mutton Stew",
  goatStew: "Goat Stew",
  beefStew: "Beef Stew",
  wheat: "Wheat",
  onions: "Onions",
  garlic: "Garlic",
  figs: "Figs",
  grapes: "Grapes",
  leeks: "Leeks",
  wheatSeeds: "Wheat Seed",
  onionSeeds: "Onion Seed",
  garlicSeeds: "Garlic Clove",
  figSeedlings: "Fig Cutting",
  grapeSeedlings: "Grape Cutting",
  leekSeeds: "Leek Seed",
  trout: "Trout",
  salmon: "Salmon",
  honey: "Honey",
  beeswax: "Beeswax",
  honeyFlatbread: "Honey Flatbread",
  honeyedFigs: "Honeyed Figs",
  honeyGrapeDrink: "Honey Grape Drink",
  honeyHerbSyrup: "Honey Herb Syrup",
  beeswaxSalve: "Beeswax Salve",
  wheatBread: "Wheat Bread",
  stuffedFlatbread: "Stuffed Flatbread",
  onionLentilSoup: "Onion Lentil Soup",
  gardenSalad: "Garden Salad",
  garlicHerbSoup: "Garlic Herb Soup",
  leekSoup: "Leek Soup",
  harvestStew: "Harvest Stew",
  figPreserve: "Fig Preserve",
  grapeJuice: "Grape Juice",
  troutMeal: "Trout Meal",
  salmonMeal: "Salmon Meal"
};

const starterInventory = {
  water: 6,
  wood: 0,
  logs: 0,
  stone: 0,
  herbs: 5,
  hyssop: 0,
  mint: 0,
  cumin: 0,
  coriander: 0,
  dill: 0,
  hyssopSeeds: 0,
  mintSeeds: 0,
  cuminSeeds: 0,
  corianderSeeds: 0,
  dillSeeds: 0,
  hyssopRemedy: 0,
  mintTonic: 0,
  cuminPoultice: 0,
  corianderSalve: 0,
  dillTonic: 0,
  barley: 3,
  lentils: 3,
  cucumbers: 3,
  preparedFood: 2,
  plantMatter: 0,
  coins: 10,
  barleySeeds: 0,
  lentilSeeds: 0,
  cucumberSeeds: 0,
  jars: 0,
  lampOil: 0,
  cloth: 0,
  ironToolHead: 0,
  extraBasket: 0,
  milk: 0,
  cheese: 0,
  refrigeratedFood: 0,
  barleyFlatbread: 0,
  lentilStew: 0,
  cucumberHerbSalad: 0,
  herbTea: 0,
  simpleSabbathMeal: 0,
  cleanFish: 0,
  venison: 0,
  eggs: 0,
  wool: 0,
  feathers: 0,
  manure: 0,
  fertilizer: 0,
  flax: 0,
  hay: 0,
  feed: 0,
  wateringCanWater: 0,
  chickenMeat: 0,
  mutton: 0,
  goatMeat: 0,
  beef: 0,
  hide: 0,
  fur: 0,
  arrows: 0,
  cleanFishMeal: 0,
  venisonStew: 0,
  eggBreakfast: 0,
  chickenSoup: 0,
  muttonStew: 0,
  goatStew: 0,
  beefStew: 0,
  wheat: 0,
  onions: 0,
  garlic: 0,
  figs: 0,
  grapes: 0,
  leeks: 0,
  wheatSeeds: 0,
  onionSeeds: 0,
  garlicSeeds: 0,
  figSeedlings: 0,
  grapeSeedlings: 0,
  leekSeeds: 0,
  trout: 0,
  salmon: 0,
  honey: 0,
  beeswax: 0,
  honeyFlatbread: 0,
  honeyedFigs: 0,
  honeyGrapeDrink: 0,
  honeyHerbSyrup: 0,
  beeswaxSalve: 0,
  wheatBread: 0,
  stuffedFlatbread: 0,
  onionLentilSoup: 0,
  gardenSalad: 0,
  garlicHerbSoup: 0,
  leekSoup: 0,
  harvestStew: 0,
  figPreserve: 0,
  grapeJuice: 0,
  troutMeal: 0,
  salmonMeal: 0
};

const toolLabels = {
  hands: "Hands",
  basket: "Basket",
  basicAxe: "Basic Axe",
  pickaxe: "Pickaxe",
  fishingPole: "Fishing Pole",
  fishingNet: "Fishing Net",
  bow: "Bow",
  bucket: "Bucket",
  shears: "Shears",
  wateringCan: "Watering Can",
  hoe: "Hoe",
  dryingRack: "Drying Rack",
  compostBin: "Compost Bin",
  gardenBed: "Garden Bed",
  sabbathBasket: "Sabbath Basket"
};

const starterTools = {
  hands: true,
  basket: true,
  basicAxe: false,
  pickaxe: false,
  fishingPole: false,
  fishingNet: false,
  bow: false,
  bucket: false,
  shears: false,
  wateringCan: true,
  hoe: false,
  dryingRack: false,
  compostBin: false,
  gardenBed: false,
  sabbathBasket: false
};

const toolDurabilityMax = {
  basicAxe: 12,
  pickaxe: 14
};

const cropTypes = {
  barley: {
    name: "Barley",
    cleanStatus: "clean",
    category: "grain",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Water once each growing day.",
    seedItem: "barleySeeds",
    harvestItem: "barley",
    seedYield: 8,
    gardeningNote: "Barley is a hardy clean grain that prefers cool spring weather and well-drained soil."
  },
  lentils: {
    name: "Lentils",
    cleanStatus: "clean",
    category: "legume",
    season: "Spring",
    daysToMature: 4,
    waterNeeds: "Keep evenly watered while sprouting.",
    seedItem: "lentilSeeds",
    harvestItem: "lentils",
    seedYield: 6,
    gardeningNote: "Lentils are clean legumes that grow best in loose soil without soggy roots."
  },
  cucumbers: {
    name: "Cucumbers",
    cleanStatus: "clean",
    category: "vegetable",
    season: "Summer",
    daysToMature: 3,
    waterNeeds: "Needs steady moisture for crisp fruit.",
    seedItem: "cucumberSeeds",
    harvestItem: "cucumbers",
    seedYield: 10,
    gardeningNote: "Cucumbers grow quickly in warmth and appreciate regular watering."
  },
  wheat: {
    name: "Wheat",
    cleanStatus: "clean",
    category: "grain",
    season: "Spring",
    daysToMature: 4,
    waterNeeds: "Water regularly while establishing. Reduce as stalks ripen.",
    seedItem: "wheatSeeds",
    harvestItem: "wheat",
    seedYield: 8,
    gardeningNote: "Wheat is a clean grain sown in spring. It ripens in early summer and can be ground into flour or used whole."
  },
  onions: {
    name: "Onions",
    cleanStatus: "clean",
    category: "vegetable",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Keep moist while bulbs are forming.",
    seedItem: "onionSeeds",
    harvestItem: "onions",
    seedYield: 6,
    gardeningNote: "Onions are clean vegetables that grow well in cool spring soil. They are a staple of the homestead table."
  },
  garlic: {
    name: "Garlic",
    cleanStatus: "clean",
    category: "vegetable",
    season: "Autumn",
    daysToMature: 4,
    waterNeeds: "Water moderately; avoid waterlogged roots.",
    seedItem: "garlicSeeds",
    harvestItem: "garlic",
    seedYield: 8,
    gardeningNote: "Garlic is planted in autumn and matures slowly through cooler weather. It is a clean, nourishing crop valued for flavour."
  },
  figs: {
    name: "Figs",
    cleanStatus: "clean",
    category: "fruit",
    season: "Summer",
    daysToMature: 5,
    waterNeeds: "Deep watering every few days is better than shallow daily watering.",
    seedItem: "figSeedlings",
    harvestItem: "figs",
    seedYield: 4,
    gardeningNote: "Figs are a clean summer fruit mentioned throughout Scripture as a symbol of blessing and abundance."
  },
  grapes: {
    name: "Grapes",
    cleanStatus: "clean",
    category: "fruit",
    season: "Summer",
    daysToMature: 5,
    waterNeeds: "Water deeply once established; grapes dislike wet feet.",
    seedItem: "grapeSeedlings",
    harvestItem: "grapes",
    seedYield: 4,
    gardeningNote: "Grapes are a clean summer fruit central to biblical harvest celebrations. They can be eaten fresh or pressed for juice."
  },
  leeks: {
    name: "Leeks",
    cleanStatus: "clean",
    category: "vegetable",
    season: "Autumn",
    daysToMature: 3,
    waterNeeds: "Keep soil consistently moist around the base.",
    seedItem: "leekSeeds",
    harvestItem: "leeks",
    seedYield: 8,
    gardeningNote: "Leeks are a clean autumn vegetable with a mild flavour, good for soups and stews as the weather cools."
  },
  hyssop: {
    name: "Hyssop",
    cleanStatus: "clean",
    category: "herb",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Water moderately; hyssop prefers well-drained soil and does not like soggy roots.",
    seedItem: "hyssopSeeds",
    harvestItem: "hyssop",
    seedYield: 10,
    gardeningNote: "Hyssop is mentioned in Scripture for purification rites (Psalm 51:7, Exodus 12:22). It grows well in spring with light watering and produces small bundles of aromatic leaves."
  },
  mint: {
    name: "Mint",
    cleanStatus: "clean",
    category: "herb",
    season: "Summer",
    daysToMature: 3,
    waterNeeds: "Mint enjoys consistent moisture; keep soil evenly damp.",
    seedItem: "mintSeeds",
    harvestItem: "mint",
    seedYield: 10,
    gardeningNote: "Mint is mentioned in Matthew 23:23 as a tithe herb. It spreads readily in summer warmth and produces fragrant leaves useful in cooking and animal care."
  },
  cumin: {
    name: "Cumin",
    cleanStatus: "clean",
    category: "herb",
    season: "Summer",
    daysToMature: 4,
    waterNeeds: "Water sparingly once established; cumin tolerates drier soil.",
    seedItem: "cuminSeeds",
    harvestItem: "cumin",
    seedYield: 10,
    gardeningNote: "Cumin is mentioned in Isaiah 28:25-27 and Matthew 23:23. It grows slowly in summer heat and produces aromatic seeds valued for flavour and animal care."
  },
  coriander: {
    name: "Coriander",
    cleanStatus: "clean",
    category: "herb",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Keep soil moist while germinating; reduce water once established.",
    seedItem: "corianderSeeds",
    harvestItem: "coriander",
    seedYield: 10,
    gardeningNote: "Coriander seed is mentioned in Exodus 16:31 and Numbers 11:7, compared to manna in appearance. It grows quickly in cool spring soil and produces seeds used in cooking and remedy-making."
  },
  dill: {
    name: "Dill",
    cleanStatus: "clean",
    category: "herb",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Water regularly while young; dill is sensitive to drought at seedling stage.",
    seedItem: "dillSeeds",
    harvestItem: "dill",
    seedYield: 10,
    gardeningNote: "Dill is mentioned in Matthew 23:23 among the tithe herbs of the Pharisees' gardens. It grows tall and feathery in spring and produces fragrant leaves and seeds good for calming animals."
  }
};

const cropCatalog = cropTypes;

const cropChoices = ["barley", "lentils", "cucumbers", "wheat", "onions", "garlic", "figs", "grapes", "leeks", "hyssop", "mint", "cumin", "coriander", "dill"];

const gardenBeds = {
  // Row 1 (y≈31%) — top of rectangular dirt area, 5 evenly spaced square plots
  bed1:  { defaultName: "Garden Bed 1",  scene: "garden", x: 22, y: 31, w: 8, h: 12, angle: 0 },
  bed2:  { defaultName: "Garden Bed 2",  scene: "garden", x: 35, y: 31, w: 8, h: 12, angle: 0 },
  bed3:  { defaultName: "Garden Bed 3",  scene: "garden", x: 48, y: 31, w: 8, h: 12, angle: 0 },
  bed4:  { defaultName: "Garden Bed 4",  scene: "garden", x: 61, y: 31, w: 8, h: 12, angle: 0 },
  bed5:  { defaultName: "Garden Bed 5",  scene: "garden", x: 74, y: 31, w: 8, h: 12, angle: 0 },
  // Row 2 (y≈50%) — middle row, same columns
  bed6:  { defaultName: "Garden Bed 6",  scene: "garden", x: 22, y: 50, w: 8, h: 12, angle: 0 },
  bed7:  { defaultName: "Garden Bed 7",  scene: "garden", x: 35, y: 50, w: 8, h: 12, angle: 0 },
  bed8:  { defaultName: "Garden Bed 8",  scene: "garden", x: 48, y: 50, w: 8, h: 12, angle: 0 },
  bed9:  { defaultName: "Garden Bed 9",  scene: "garden", x: 61, y: 50, w: 8, h: 12, angle: 0 },
  bed10: { defaultName: "Garden Bed 10", scene: "garden", x: 74, y: 50, w: 8, h: 12, angle: 0 },
  // Row 3 (y≈69%) — bottom row, same columns
  bed11: { defaultName: "Garden Bed 11", scene: "garden", x: 22, y: 69, w: 8, h: 12, angle: 0 },
  bed12: { defaultName: "Garden Bed 12", scene: "garden", x: 35, y: 69, w: 8, h: 12, angle: 0 },
  bed13: { defaultName: "Garden Bed 13", scene: "garden", x: 48, y: 69, w: 8, h: 12, angle: 0 },
  bed14: { defaultName: "Garden Bed 14", scene: "garden", x: 61, y: 69, w: 8, h: 12, angle: 0 },
  bed15: { defaultName: "Garden Bed 15", scene: "garden", x: 74, y: 69, w: 8, h: 12, angle: 0 },
  field1: { defaultName: "Field 1", scene: "fields", x: 43, y: 43, w: 28, h: 16, angle: -1, clip: "polygon(8% 18%, 92% 9%, 98% 78%, 6% 94%)", requiresUpgrade: "tractor" },
  field2: { defaultName: "Field 2", scene: "fields", x: 66, y: 48, w: 28, h: 16, angle: 1, clip: "polygon(8% 18%, 92% 9%, 98% 78%, 6% 94%)", requiresUpgrade: "tractor" },
  field3: { defaultName: "Field 3", scene: "fields", x: 78, y: 63, w: 28, h: 16, angle: 1, clip: "polygon(8% 18%, 92% 9%, 98% 78%, 6% 94%)", requiresUpgrade: "tractor" }
};

const edibleItems = {
  barley: { cleanStatus: "clean", category: "grain" },
  lentils: { cleanStatus: "clean", category: "legume" },
  cucumbers: { cleanStatus: "clean", category: "vegetable" },
  herbs: { cleanStatus: "clean", category: "herb" },
  milk: { cleanStatus: "clean", category: "dairy" },
  cheese: { cleanStatus: "clean", category: "dairy" },
  refrigeratedFood: { cleanStatus: "clean", category: "prepared clean food" },
  preparedFood: { cleanStatus: "clean", category: "prepared clean food" },
  barleyFlatbread: { cleanStatus: "clean", category: "prepared clean food" },
  lentilStew: { cleanStatus: "clean", category: "prepared clean food" },
  cucumberHerbSalad: { cleanStatus: "clean", category: "prepared clean food" },
  herbTea: { cleanStatus: "clean", category: "prepared clean drink" },
  simpleSabbathMeal: { cleanStatus: "clean", category: "prepared clean food" },
  cleanFish: { cleanStatus: "clean", category: "fish with fins and scales" },
  venison: { cleanStatus: "clean", category: "clean wild game" },
  eggs: { cleanStatus: "clean", category: "egg" },
  chickenMeat: { cleanStatus: "clean", category: "clean bird meat" },
  mutton: { cleanStatus: "clean", category: "clean livestock meat" },
  goatMeat: { cleanStatus: "clean", category: "clean livestock meat" },
  beef: { cleanStatus: "clean", category: "clean livestock meat" },
  cleanFishMeal: { cleanStatus: "clean", category: "prepared clean food" },
  venisonStew: { cleanStatus: "clean", category: "prepared clean food" },
  eggBreakfast: { cleanStatus: "clean", category: "prepared clean food" },
  chickenSoup: { cleanStatus: "clean", category: "prepared clean food" },
  muttonStew: { cleanStatus: "clean", category: "prepared clean food" },
  goatStew: { cleanStatus: "clean", category: "prepared clean food" },
  beefStew: { cleanStatus: "clean", category: "prepared clean food" },
  wheat: { cleanStatus: "clean", category: "grain" },
  onions: { cleanStatus: "clean", category: "vegetable" },
  garlic: { cleanStatus: "clean", category: "vegetable" },
  figs: { cleanStatus: "clean", category: "fruit" },
  grapes: { cleanStatus: "clean", category: "fruit" },
  leeks: { cleanStatus: "clean", category: "vegetable" },
  trout: { cleanStatus: "clean", category: "fish with fins and scales" },
  salmon: { cleanStatus: "clean", category: "fish with fins and scales" },
  honey: { cleanStatus: "clean", category: "sweetener" },
  honeyFlatbread: { cleanStatus: "clean", category: "prepared clean food" },
  honeyedFigs: { cleanStatus: "clean", category: "prepared clean food" },
  honeyGrapeDrink: { cleanStatus: "clean", category: "prepared clean drink" },
  wheatBread: { cleanStatus: "clean", category: "prepared clean food" },
  stuffedFlatbread: { cleanStatus: "clean", category: "prepared clean food" },
  onionLentilSoup: { cleanStatus: "clean", category: "prepared clean food" },
  gardenSalad: { cleanStatus: "clean", category: "prepared clean food" },
  garlicHerbSoup: { cleanStatus: "clean", category: "prepared clean food" },
  leekSoup: { cleanStatus: "clean", category: "prepared clean food" },
  harvestStew: { cleanStatus: "clean", category: "prepared clean food" },
  figPreserve: { cleanStatus: "clean", category: "prepared clean food" },
  grapeJuice: { cleanStatus: "clean", category: "prepared clean drink" },
  troutMeal: { cleanStatus: "clean", category: "prepared clean food" },
  salmonMeal: { cleanStatus: "clean", category: "prepared clean food" }
};

const craftingRecipes = [
  recipe("basicAxe", "Basic Axe", { wood: 3, stone: 2, herbs: 1 }, "A simple axe for small trees.", "tool"),
  recipe("pickaxe", "Pickaxe", { wood: 2, stone: 4 }, "A sturdy tool for gathering more stone from the forest clearing.", "tool"),
  recipe("fishingPole", "Fishing Pole", { wood: 2, cloth: 1 }, "A quiet tool for catching reviewed clean fish from the pond.", "tool"),
  recipe("fishingNet", "Fishing Net", { cloth: 2, wood: 1 }, "A simple net for clean fish with fins and scales.", "tool"),
  recipe("bow", "Bow", { wood: 3, cloth: 1 }, "A simple bow for careful clean wild-game hunting.", "tool"),
  recipe("arrows", "Arrow Bundle", { wood: 1, stone: 1 }, "Five arrows for future bow use.", "material", { arrows: 5 }),
  recipe("featheredArrows", "Feathered Arrow Bundle", { wood: 1, stone: 1, feathers: 1 }, "Eight arrows made stronger with gathered feathers.", "material", { arrows: 8 }),
  recipe("bucket", "Bucket", { wood: 2, ironToolHead: 1 }, "A sturdy bucket for milking clean livestock.", "tool"),
  recipe("shears", "Shears", { ironToolHead: 1, wood: 1 }, "Hand shears for gathering wool from sheep.", "tool"),
  recipe("feed", "Feed Mix", { barley: 1, lentils: 1 }, "A simple clean feed mix for barn animals.", "material", { feed: 3 }),
  recipe("hay", "Hay Bundle", { plantMatter: 2 }, "A small hay bundle for barn animals.", "material", { hay: 2 }),
  recipe("cloth", "Woven Cloth", { wool: 1 }, "Simple cloth woven from clean sheep wool.", "material", { cloth: 2 }),
  recipe("flaxCloth", "Linen Cloth", { flax: 2 }, "Simple cloth made from flax gathered through homestead trade.", "material", { cloth: 1 }),
  recipe("fertilizer", "Fertilizer", { manure: 1, plantMatter: 1 }, "Useful soil amendment made from barn manure and plant matter.", "material", { fertilizer: 2 }),
  recipe("hoe", "Hoe", { wood: 2, stone: 2 }, "A garden tool for future expanded soil work.", "tool"),
  recipe("dryingRack", "Drying Rack", { wood: 3, herbs: 1 }, "A small rack for clean herbs and produce.", "tool"),
  recipe("compostBin", "Compost Bin", { wood: 3, plantMatter: 2 }, "A bin for future soil care.", "tool"),
  recipe("gardenBed", "Garden Bed", { wood: 4, stone: 2 }, "A framed bed for expanded gardening.", "tool"),
  recipe("sabbathBasket", "Sabbath Basket", { wood: 1, herbs: 1, preparedFood: 1, water: 1 }, "A basket set aside before Sabbath.", "tool"),
  recipe("hyssopRemedy", "Hyssop Remedy", { hyssop: 2, water: 1 }, "A cleansing hyssop preparation. Used historically for respiratory complaints in people and animals alike. Helps chickens and goats with respiratory distress, and fills community orders for coughs and chest ailments.", "material", { hyssopRemedy: 1 }),
  recipe("mintTonic", "Mint Tonic", { mint: 2, water: 1 }, "A soothing mint preparation. Used historically for digestive complaints in people and animals. Helps goats and cattle with bloating and digestive upset, and fills community orders for stomach ailments.", "material", { mintTonic: 1 }),
  recipe("cuminPoultice", "Cumin Poultice", { cumin: 2, cloth: 1 }, "A warm herbal poultice made with cumin. Used historically for skin inflammation in people and animals. Helps sheep with skin irritation and fills community orders for skin complaints.", "material", { cuminPoultice: 1 }),
  recipe("corianderSalve", "Coriander Salve", { coriander: 2, plantMatter: 1 }, "A gentle coriander preparation. Used historically for digestive complaints and mild infections in people and animals. Helps chickens with digestive upset and fills community orders for elders and neighbors.", "material", { corianderSalve: 1 }),
  recipe("dillTonic", "Dill Tonic", { dill: 2, water: 1 }, "A calming dill preparation. Used historically for sleeplessness and anxiety in people, and to settle restless animals. Helps stressed sheep and cattle, and fills community orders for tired or troubled households.", "material", { dillTonic: 1 }),
  recipe("honeyHerbSyrup", "Honey Herb Syrup", { honey: 1, herbs: 2, water: 1 }, "A sweet herbal syrup for household remedy shelves and future community requests.", "material", { honeyHerbSyrup: 1 }),
  recipe("beeswaxSalve", "Beeswax Salve", { beeswax: 1, honey: 1, hyssop: 1 }, "A simple beeswax and honey salve for future remedy recipes and trade.", "material", { beeswaxSalve: 1 })
];

const cookingRecipes = [
  recipe("barleyFlatbread", "Barley Flatbread", { barley: 1, water: 1 }, "A simple clean bread for the table.", "food", { preparedFood: 1 }),
  recipe("lentilStew", "Lentil Stew", { lentils: 1, water: 1, herbs: 1 }, "A warm clean stew with herbs.", "food", { preparedFood: 1 }),
  recipe("cucumberHerbSalad", "Cucumber Herb Salad", { cucumbers: 1, herbs: 1 }, "A fresh clean salad.", "food", { preparedFood: 1 }),
  recipe("herbTea", "Herb Tea", { herbs: 1, water: 1 }, "Herbs historically prepared as a gentle drink. Use caution with herbal learning.", "food", { preparedFood: 1 }),
  recipe("simpleSabbathMeal", "Simple Sabbath Meal", { preparedFood: 2, herbs: 1, water: 1 }, "A clean meal set aside for Sabbath preparation.", "food", { preparedFood: 1 }),
  recipe("cleanFishMeal", "Clean Fish Meal", { cleanFish: 1, herbs: 1, water: 1 }, "A simple meal from fish reviewed as clean, with fins and scales.", "food", { preparedFood: 1 }),
  recipe("venisonStew", "Venison Stew", { venison: 1, herbs: 1, water: 1 }, "Clean wild-game stew prepared with care and without blood.", "food", { preparedFood: 1 }),
  recipe("eggBreakfast", "Egg Breakfast", { eggs: 2, herbs: 1 }, "A simple clean egg meal.", "food", { preparedFood: 1 }),
  recipe("chickenSoup", "Chicken Soup", { chickenMeat: 1, herbs: 1, water: 1 }, "Clean bird meat prepared with care and without blood.", "food", { preparedFood: 1 }),
  recipe("muttonStew", "Mutton Stew", { mutton: 1, herbs: 1, water: 1 }, "Clean sheep meat prepared with care and without blood.", "food", { preparedFood: 1 }),
  recipe("goatStew", "Goat Stew", { goatMeat: 1, herbs: 1, water: 1 }, "Clean goat meat prepared with care and without blood.", "food", { preparedFood: 1 }),
  recipe("beefStew", "Beef Stew", { beef: 1, herbs: 1, water: 1 }, "Clean cattle meat prepared with care and without blood.", "food", { preparedFood: 1 }),
  recipe("wheatBread", "Wheat Bread", { wheat: 1, water: 1 }, "A clean loaf of wheat bread, nourishing and simple.", "food", { preparedFood: 1 }),
  recipe("stuffedFlatbread", "Stuffed Flatbread", { wheat: 1, onions: 1, herbs: 1 }, "A wheat flatbread filled with onions and herbs. A satisfying clean meal.", "food", { preparedFood: 2 }),
  recipe("onionLentilSoup", "Onion Lentil Soup", { lentils: 1, onions: 1, herbs: 1, water: 1 }, "A hearty clean soup with lentils and onions.", "food", { preparedFood: 1 }),
  recipe("gardenSalad", "Garden Salad", { cucumbers: 1, onions: 1, herbs: 1 }, "A fresh clean salad from the garden.", "food", { preparedFood: 1 }),
  recipe("honeyFlatbread", "Honey Flatbread", { barley: 1, honey: 1, water: 1 }, "A sweet clean flatbread with honey from the apiary.", "food", { preparedFood: 1 }),
  recipe("honeyedFigs", "Honeyed Figs", { figs: 1, honey: 1, jars: 1 }, "Figs preserved with honey for a stronger, sweeter table food.", "food", { preparedFood: 1 }),
  recipe("honeyGrapeDrink", "Honey Grape Drink", { grapes: 1, honey: 1, water: 1, jars: 1 }, "A clean grape drink sweetened with honey.", "food", { preparedFood: 1 }),
  recipe("garlicHerbSoup", "Garlic Herb Soup", { garlic: 1, herbs: 2, water: 1 }, "A warming clean soup made with garlic and herbs.", "food", { preparedFood: 1 }),
  recipe("leekSoup", "Leek Soup", { leeks: 1, herbs: 1, water: 1 }, "A gentle clean soup made with autumn leeks.", "food", { preparedFood: 1 }),
  recipe("harvestStew", "Harvest Stew", { wheat: 1, lentils: 1, garlic: 1, water: 1 }, "A filling clean stew made from the season's harvest.", "food", { preparedFood: 2 }),
  recipe("figPreserve", "Fig Preserve", { figs: 2, water: 1, jars: 1 }, "Sweet clean figs preserved in a jar for the days ahead.", "food", { preparedFood: 2 }),
  recipe("grapeJuice", "Grape Juice", { grapes: 2, water: 1, jars: 1 }, "Fresh pressed juice from clean grapes, stored in a jar.", "food", { preparedFood: 1 }),
  recipe("troutMeal", "Trout Meal", { trout: 1, herbs: 1, water: 1 }, "Autumn trout with fins and scales, prepared as a clean meal.", "food", { preparedFood: 1 }),
  recipe("salmonMeal", "Salmon Meal", { salmon: 1, herbs: 1, water: 1 }, "Winter salmon with fins and scales, prepared as a clean meal.", "food", { preparedFood: 1 })
];

const FOOD_EAT_VALUES = {
  preparedFood: { hunger: 34, thirst: 2,  relaxation: 4, nourished: 3 },
  eggs:         { hunger: 16, thirst: 0,  relaxation: 1, nourished: 0 },
  milk:         { hunger: 12, thirst: 18, relaxation: 2, nourished: 0 },
  honey:        { hunger: 14, thirst: 0,  relaxation: 2, nourished: 1 },
  honeyFlatbread: { hunger: 42, thirst: 2,  relaxation: 6, nourished: 3 },
  honeyedFigs:    { hunger: 28, thirst: 5,  relaxation: 5, nourished: 2 },
  honeyGrapeDrink:{ hunger: 12, thirst: 34, relaxation: 4, nourished: 2 },
  figs:         { hunger: 12, thirst: 4,  relaxation: 1, nourished: 0 },
  grapes:       { hunger: 9,  thirst: 8,  relaxation: 1, nourished: 0 },
  cucumbers:    { hunger: 6,  thirst: 10, relaxation: 0, nourished: 0 },
};

function recipe(id, name, ingredients, description, type, bonus = {}) {
  return { id, name, ingredients, description, type, cleanStatus: "clean", bonus };
}

const catalogItems = [
  orderItem("barleySeeds", "Barley Seeds", 2, 1),
  orderItem("lentilSeeds", "Lentil Seeds", 2, 1),
  orderItem("cucumberSeeds", "Cucumber Seeds", 2, 1),
  orderItem("jars", "Jars", 2, 1),
  orderItem("lampOil", "Lamp Oil", 3, 2),
  orderItem("cloth", "Cloth", 3, 2),
  orderItem("ironToolHead", "Iron Tool Head", 5, 2),
  orderItem("extraBasket", "Extra Basket", 4, 2)
];

function orderItem(id, name, cost, days) {
  return { id, name, cost, days, amount: 1 };
}

const animalCatalog = {
  chickens: {
    name: "Chickens",
    singular: "Chicken",
    buyCost: 8,
    feedNeed: 1,
    product: "eggs",
    productLabel: "Collect Eggs",
    productTool: null,
    productAmount: 1,
    meatItem: "chickenMeat",
    meatAmount: 1,
    secondaryItem: "feathers",
    secondaryAmount: 1,
    cleanNote: "Chickens are handled here as reviewed clean birds. Meat is prepared without blood.",
    gestationDays: 3
  },
  sheep: {
    name: "Sheep",
    singular: "Sheep",
    buyCost: 18,
    feedNeed: 2,
    product: "wool",
    productLabel: "Shear Wool",
    productTool: "shears",
    productAmount: 2,
    meatItem: "mutton",
    meatAmount: 2,
    secondaryItem: "hide",
    secondaryAmount: 1,
    cleanNote: "Sheep are clean livestock. Wool can be gathered with shears.",
    gestationDays: 5
  },
  goats: {
    name: "Goats",
    singular: "Goat",
    buyCost: 16,
    feedNeed: 2,
    product: "milk",
    productLabel: "Milk",
    productTool: "bucket",
    productAmount: 2,
    meatItem: "goatMeat",
    meatAmount: 2,
    secondaryItem: "hide",
    secondaryAmount: 1,
    cleanNote: "Goats are clean livestock. Milk requires a bucket.",
    gestationDays: 4
  },
  cattle: {
    name: "Cattle",
    singular: "Cow",
    buyCost: 28,
    feedNeed: 3,
    product: "milk",
    productLabel: "Milk",
    productTool: "bucket",
    productAmount: 4,
    meatItem: "beef",
    meatAmount: 4,
    secondaryItem: "hide",
    secondaryAmount: 2,
    cleanNote: "Cattle are clean livestock. Milk requires a bucket.",
    gestationDays: 7
  }
};

const ANIMAL_AILMENTS = {
  chickens: [
    { id: "respiratory", label: "Respiratory distress", remedy: "hyssopRemedy", note: "Hyssop remedy may help clear respiratory symptoms." },
    { id: "digestive", label: "Digestive upset", remedy: "corianderSalve", note: "Coriander salve may ease digestive discomfort." }
  ],
  sheep: [
    { id: "skinIrritation", label: "Skin irritation", remedy: "cuminPoultice", note: "Cumin poultice may soothe skin and wool irritation." },
    { id: "stress", label: "Stress and restlessness", remedy: "dillTonic", note: "Dill tonic may help them settle." }
  ],
  goats: [
    { id: "bloating", label: "Bloating", remedy: "mintTonic", note: "Mint tonic may ease bloating and digestive discomfort." },
    { id: "respiratory", label: "Respiratory distress", remedy: "hyssopRemedy", note: "Hyssop remedy may help clear respiratory symptoms." }
  ],
  cattle: [
    { id: "digestive", label: "Digestive upset", remedy: "mintTonic", note: "Mint tonic may ease digestive discomfort." },
    { id: "stress", label: "Stress and low production", remedy: "dillTonic", note: "Dill tonic may help them settle and produce better." }
  ]
};

const shopBuyItems = [
  shopItem("hay", "Hay", 2, "item", 3),
  shopItem("feed", "Feed", 3, "item", 3),
  shopItem("fertilizer", "Fertilizer", 4, "item", 1),
  shopItem("flax", "Flax", 2, "item", 2),
  shopItem("barleySeeds", "Barley Seeds", 2, "item", 1),
  shopItem("lentilSeeds", "Lentil Seeds", 2, "item", 1),
  shopItem("cucumberSeeds", "Cucumber Seeds", 2, "item", 1),
  shopItem("wheatSeeds", "Wheat Seeds", 2, "item", 1),
  shopItem("onionSeeds", "Onion Seeds", 2, "item", 1),
  shopItem("garlicSeeds", "Garlic Seeds", 2, "item", 1),
  shopItem("figSeedlings", "Fig Seedlings", 3, "item", 1),
  shopItem("grapeSeedlings", "Grape Seedlings", 3, "item", 1),
  shopItem("leekSeeds", "Leek Seeds", 2, "item", 1),
  shopItem("hyssopSeeds", "Hyssop Seeds", 2, "item", 1),
  shopItem("mintSeeds", "Mint Seeds", 2, "item", 1),
  shopItem("cuminSeeds", "Cumin Seeds", 2, "item", 1),
  shopItem("corianderSeeds", "Coriander Seeds", 2, "item", 1),
  shopItem("dillSeeds", "Dill Seeds", 2, "item", 1),
  shopItem("cloth", "Cloth", 3, "item", 1),
  shopItem("ironToolHead", "Iron Tool Head", 5, "item", 1),
  shopItem("wateringCan", "Watering Can", 6, "tool", 1),
  shopItem("bucket", "Bucket", 7, "tool", 1),
  shopItem("shears", "Shears", 7, "tool", 1),
  shopItem("chickens", "Chicken", animalCatalog.chickens.buyCost, "animal", 1),
  shopItem("sheep", "Sheep", animalCatalog.sheep.buyCost, "animal", 1),
  shopItem("goats", "Goat", animalCatalog.goats.buyCost, "animal", 1),
  shopItem("cattle", "Cow", animalCatalog.cattle.buyCost, "animal", 1),
  shopItem("tractor", "Tractor", 40, "upgrade", 1),
  shopItem("irrigation", "Irrigation System", 45, "upgrade", 1),
  shopItem("plumbing", "Well Pump & Plumbing", 55, "upgrade", 1)
];

const shopSellItems = [
  sellItem("eggs", 2),
  sellItem("milk", 2),
  sellItem("wool", 4),
  sellItem("hide", 5),
  sellItem("fur", 4),
  sellItem("feathers", 2),
  sellItem("manure", 1),
  sellItem("fertilizer", 4),
  sellItem("flax", 1),
  sellItem("cloth", 3),
  sellItem("cleanFish", 4),
  sellItem("venison", 6),
  sellItem("chickenMeat", 5),
  sellItem("mutton", 7),
  sellItem("goatMeat", 7),
  sellItem("beef", 9),
  sellItem("barley", 2),
  sellItem("lentils", 2),
  sellItem("cucumbers", 2),
  sellItem("wheat", 2),
  sellItem("onions", 2),
  sellItem("garlic", 3),
  sellItem("figs", 3),
  sellItem("grapes", 3),
  sellItem("leeks", 2),
  sellItem("trout", 5),
  sellItem("salmon", 5),
  sellItem("herbs", 2),
  sellItem("hyssop", 3),
  sellItem("mint", 3),
  sellItem("cumin", 3),
  sellItem("coriander", 3),
  sellItem("dill", 3),
  sellItem("honey", 4),
  sellItem("beeswax", 3),
  sellItem("hyssopRemedy", 6),
  sellItem("mintTonic", 6),
  sellItem("cuminPoultice", 6),
  sellItem("corianderSalve", 6),
  sellItem("dillTonic", 6),
  sellItem("honeyHerbSyrup", 8),
  sellItem("beeswaxSalve", 9),
  sellItem("honeyFlatbread", 7),
  sellItem("honeyedFigs", 8),
  sellItem("honeyGrapeDrink", 8),
  sellItem("wood", 1),
  sellItem("stone", 1),
  sellItem("barleySeeds", 3),
  sellItem("lentilSeeds", 3),
  sellItem("cucumberSeeds", 4),
  sellItem("wheatSeeds", 3),
  sellItem("onionSeeds", 4),
  sellItem("garlicSeeds", 4),
  sellItem("figSeedlings", 6),
  sellItem("grapeSeedlings", 6),
  sellItem("leekSeeds", 4),
  sellItem("hyssopSeeds", 5),
  sellItem("mintSeeds", 5),
  sellItem("cuminSeeds", 5),
  sellItem("corianderSeeds", 5),
  sellItem("dillSeeds", 5)
];

function shopItem(id, name, cost, type, amount) {
  return { id, name, cost, type, amount };
}

function sellItem(id, price) {
  return { id, price };
}

const MAX_COMMUNITY_ORDERS = 3;

const ORDER_POOL = [
  { tpl: "barleyBag",      label: "Bag of Barley",           items: { barley: 3 },                      reward: 8,  days: 3 },
  { tpl: "lentilBag",      label: "Bag of Lentils",          items: { lentils: 3 },                     reward: 8,  days: 3 },
  { tpl: "wheatBag",       label: "Bag of Wheat",            items: { wheat: 3 },                       reward: 9,  days: 3 },
  { tpl: "herbBundle",     label: "Bundle of Herbs",         items: { herbs: 3 },                       reward: 8,  days: 4 },
  { tpl: "freshFish",      label: "Fresh Clean Fish",        items: { cleanFish: 2 },                   reward: 12, days: 2 },
  { tpl: "troutOrder",     label: "Fresh Trout",             items: { trout: 2 },                       reward: 14, days: 3 },
  { tpl: "salmonOrder",    label: "Fresh Salmon",            items: { salmon: 2 },                      reward: 14, days: 3 },
  { tpl: "eggBasket",      label: "Basket of Eggs",          items: { eggs: 4 },                        reward: 10, days: 3 },
  { tpl: "woolBundle",     label: "Bundle of Wool",          items: { wool: 3 },                        reward: 16, days: 4 },
  { tpl: "milkJug",        label: "Fresh Milk",              items: { milk: 3 },                        reward: 9,  days: 2 },
  { tpl: "cheesePortion",  label: "Portion of Cheese",       items: { cheese: 2 },                      reward: 10, days: 3 },
  { tpl: "vegBasket",      label: "Garden Vegetables",       items: { cucumbers: 2, onions: 2 },        reward: 12, days: 3 },
  { tpl: "garlicOrder",    label: "Garlic Cloves",           items: { garlic: 3 },                      reward: 12, days: 4 },
  { tpl: "figsOrder",      label: "Basket of Figs",          items: { figs: 2 },                        reward: 10, days: 3 },
  { tpl: "grapeOrder",     label: "Bunch of Grapes",         items: { grapes: 3 },                      reward: 11, days: 3 },
  { tpl: "honeyJar",       label: "Jar of Honey",             items: { honey: 2 },                       reward: 12, days: 3 },
  { tpl: "leekOrder",      label: "Leeks for the Table",     items: { leeks: 3 },                       reward: 9,  days: 3 },
  { tpl: "breadLoaves",    label: "Bread Loaves",            items: { wheatBread: 2 },                  reward: 14, days: 3 },
  { tpl: "flatbreadOrder", label: "Stuffed Flatbread",       items: { stuffedFlatbread: 2 },            reward: 16, days: 3 },
  { tpl: "stewPot",        label: "Pot of Lentil Stew",      items: { lentilStew: 2 },                  reward: 12, days: 3 },
  { tpl: "soupOrder",      label: "Pot of Soup",             items: { onionLentilSoup: 2 },             reward: 14, days: 3 },
  { tpl: "honeyBreadOrder", label: "Honey Flatbread",         items: { honeyFlatbread: 2 },              reward: 18, days: 3 },
  { tpl: "honeyPreserveOrder", label: "Honeyed Figs",        items: { honeyedFigs: 1 },                 reward: 14, days: 4 },
  { tpl: "chickenOrder",   label: "Prepared Chicken",        items: { chickenMeat: 2 },                 reward: 14, days: 3 },
  { tpl: "muttonOrder",    label: "Portion of Mutton",       items: { mutton: 2 },                      reward: 16, days: 4 },
  { tpl: "harvestBundle",  label: "Harvest Bundle",          items: { wheat: 2, barley: 2, herbs: 1 },  reward: 18, days: 4 },
  { tpl: "fishMealOrder",  label: "Clean Fish Meal",         items: { cleanFishMeal: 1, cleanFish: 1 }, reward: 16, days: 3 },
  { tpl: "sabbathBasket",  label: "Sabbath Meal Basket",     items: { simpleSabbathMeal: 1, herbs: 1 },             reward: 16, days: 6 },
  { tpl: "hyssopBundle",  label: "Bundle of Hyssop",        items: { hyssop: 2 },                                  reward: 10, days: 4 },
  { tpl: "mintBundle",    label: "Fresh Mint",               items: { mint: 2 },                                    reward: 10, days: 4 },
  { tpl: "cuminBundle",   label: "Cumin Seeds",              items: { cumin: 2 },                                   reward: 12, days: 5 },
  { tpl: "corianderBundle", label: "Coriander Seed",         items: { coriander: 2 },                               reward: 10, days: 4 },
  { tpl: "dillBundle",    label: "Dill Herb",                items: { dill: 2 },                                    reward: 10, days: 4 },
  { tpl: "remedyKit",     label: "Herbal Remedy Kit",        items: { hyssopRemedy: 1, mintTonic: 1 },              reward: 20, days: 5 },
  { tpl: "honeySyrupOrder", label: "Honey Herb Syrup",       items: { honeyHerbSyrup: 1 },                          reward: 18, days: 4 },
  { tpl: "beeswaxSalveOrder", label: "Beeswax Salve",        items: { beeswaxSalve: 1 },                            reward: 20, days: 4 },
  { tpl: "remedyBox",     label: "Animal Remedy Box",        items: { cuminPoultice: 1, corianderSalve: 1, dillTonic: 1 }, reward: 28, days: 6 },
  { tpl: "herbGarden",       label: "Mixed Herb Bundle",                  items: { hyssop: 1, mint: 1, coriander: 1, dill: 1 },                  reward: 22, days: 5 },
  { tpl: "neighborCough",    label: "Remedy for a Neighbor's Cough",      items: { hyssopRemedy: 1 },                                            reward: 14, days: 4 },
  { tpl: "weaverStomach",    label: "Stomach Tonic for the Weaver",       items: { mintTonic: 1 },                                               reward: 14, days: 4 },
  { tpl: "potterSkin",       label: "Skin Salve for the Potter",          items: { cuminPoultice: 1 },                                           reward: 14, days: 4 },
  { tpl: "elderDigestive",   label: "Digestive Remedy for an Elder",      items: { corianderSalve: 1 },                                          reward: 14, days: 4 },
  { tpl: "calmingHousehold", label: "Calming Tonic for a Tired Household", items: { dillTonic: 1 },                                              reward: 14, days: 4 },
  { tpl: "healerBundle",     label: "Healer's Bundle",                    items: { hyssopRemedy: 1, dillTonic: 1 },                              reward: 26, days: 5 },
  { tpl: "communityRemedyBasket", label: "Community Remedy Basket",       items: { hyssopRemedy: 1, mintTonic: 1, corianderSalve: 1 },           reward: 36, days: 7 },
  { tpl: "grainSeeds",          label: "Grain Seeds",                   items: { barleySeeds: 5, wheatSeeds: 5 },                              reward: 22, days: 4 },
  { tpl: "vegSeeds",            label: "Vegetable Seed Pack",            items: { cucumberSeeds: 5, onionSeeds: 5 },                            reward: 26, days: 4 },
  { tpl: "herbSeeds",           label: "Herb Seed Bundle",               items: { dillSeeds: 5, corianderSeeds: 5 },                            reward: 28, days: 5 },
  { tpl: "spiceSeeds",          label: "Spice Seeds",                    items: { cuminSeeds: 5, hyssopSeeds: 5 },                              reward: 28, days: 5 },
  { tpl: "legumeSeed",          label: "Lentil Seeds",                   items: { lentilSeeds: 8 },                                             reward: 16, days: 3 },
  { tpl: "alliumSeed",          label: "Garlic and Leek Seeds",          items: { garlicSeeds: 5, leekSeeds: 5 },                              reward: 26, days: 4 },
  { tpl: "fruitCuttings",       label: "Fig and Grape Cuttings",         items: { figSeedlings: 3, grapeSeedlings: 3 },                        reward: 34, days: 6 },
  { tpl: "heirloomMintSeed",     label: "Fresh Mint Cuttings and Seed",  items: { mintSeeds: 8 },                                               reward: 24, days: 4 },
  { tpl: "fullSeedCollection",   label: "Full Seed Collection",          items: { barleySeeds: 3, cucumberSeeds: 3, dillSeeds: 3, mintSeeds: 3 }, reward: 48, days: 7 }
];

const sabbathTasks = [
  { id: "gatherWater", label: "Gather water", location: "Well / Water Area" },
  { id: "prepareFood", label: "Prepare clean food", location: "Kitchen" },
  { id: "gatherHerbs", label: "Gather herbs", location: "Garden or Forest" },
  { id: "tidyCottage", label: "Tidy the cottage", location: "Cabin Entry" },
  { id: "putToolsAway", label: "Put tools away", location: "Workshed" },
  { id: "sabbathBasket", label: "Set aside Sabbath basket", location: "Sabbath Area" }
];

const journalEntries = [
  entry("welcome", "Welcome to Hebrew Homestead", "This homestead is a place to work, rest, and learn with gratitude. Click scenes, tend clean crops, prepare for Sabbath, and notice how Yehovah's instructions bring order and delight."),
  entry("gardening", "Gardening Basics", "Plant clean seed, water faithfully, and give crops time. Growth is not rushed; the player waters, waits, and receives the increase with thanks."),
  entry("barley", "Barley", "Barley is a clean grain and an early crop in the land. It likes cooler weather and well-drained soil."),
  entry("lentils", "Lentils", "Lentils are clean legumes, simple and nourishing. They grow best in loose soil with steady moisture while sprouting."),
  entry("cucumbers", "Cucumbers", "Cucumbers are clean garden produce. They enjoy warmth and regular water."),
  entry("herbs", "Herbs on the Homestead", "Five herbs grow on this homestead: Hyssop, Mint, Cumin, Coriander, and Dill — all mentioned in Scripture. Each can be grown in garden beds or foraged in the forest. They are used in cooking, remedy-making for animals, Sabbath preparation, and community orders. See individual entries for each herb and the Animal Remedies entry for how to care for your animals with them."),
  entry("hyssop", "Hyssop", "Hyssop (Hyssopus officinalis) is mentioned throughout Scripture in purification rites (Psalm 51:7, Leviticus 14, Numbers 19). It was tied in a bundle to apply the blood of Passover to doorposts (Exodus 12:22). Hyssop has historically been noted for its support of respiratory health and its cleansing properties, owing to volatile oils including pinocamphone. On the homestead, two hyssop and water can be crafted into a Hyssop Remedy that helps chickens and goats recover from respiratory distress. Grows in Spring, ready in 3 days."),
  entry("mint", "Mint", "Mint is mentioned in Matthew 23:23 and Luke 11:42 as a garden herb subject to tithing, showing it was commonly cultivated in biblical households. Spearmint and peppermint have long been valued for easing digestive discomfort, calming bloating, and supporting the stomach. The menthol compounds in mint have a soothing effect on the digestive tract. On the homestead, two mint and water can be crafted into a Mint Tonic that helps goats with bloating and cattle with digestive upset. Grows in Summer, ready in 3 days."),
  entry("cumin", "Cumin", "Cumin (Cuminum cyminum) is mentioned in Isaiah 28:25-27, where its careful hand-harvest method is described by the prophet, and in Matthew 23:23 as a tithe herb. Cumin has a long history of use for digestive health and skin conditions, and is rich in thymoquinone and other active compounds with antimicrobial properties. On the homestead, two cumin and a cloth can be crafted into a Cumin Poultice that helps sheep with skin irritation and wool problems. Grows in Summer, ready in 4 days."),
  entry("coriander", "Coriander", "Coriander seed (Coriandrum sativum) is mentioned in Exodus 16:31 and Numbers 11:7, where the appearance of manna is compared to coriander seed. It has a long history of use for digestive complaints, as a gentle antimicrobial herb, and to support healthy appetite. Its seeds contain linalool and other beneficial compounds. On the homestead, two coriander and plant matter can be crafted into a Coriander Salve that helps chickens with digestive upset. Grows in Spring, ready in 3 days."),
  entry("dill", "Dill", "Dill (Anethum graveolens) is mentioned in Matthew 23:23 among the herbs subject to tithing in the Pharisees' carefully tended gardens. It has a long tradition of use as a calming herb, valued for easing nervousness and helping animals settle. Its gentle volatile oils, including carvone and limonene, are thought to support a calm disposition. On the homestead, two dill and water can be crafted into a Dill Tonic that helps stressed sheep and cattle, encouraging them to settle and maintain production. Grows in Spring, ready in 3 days."),
  entry("animalRemedies", "Animal Remedies", "When an animal group shows signs of ailment, a prepared herbal remedy may help them recover. Ailments can develop when animals are not consistently fed and watered, or occasionally even under good care. An unwell group cannot provide their daily product until treated. Hyssop Remedy (hyssop + water) helps chickens and goats with respiratory distress. Mint Tonic (mint + water) helps goats with bloating and cattle with digestive upset. Cumin Poultice (cumin + cloth) helps sheep with skin irritation. Coriander Salve (coriander + plant matter) helps chickens with digestive complaints. Dill Tonic (dill + water) calms stressed sheep and cattle. Remedies are crafted at the worktable and applied from the barn animal modal. Prevention through faithful daily care is always better than treatment."),
  entry("humanRemedies", "Herbal Remedies for the Community", "The same remedies that care for animals have long been used by people as well. Neighbors and community members may send orders for specific preparations when ailments arise. Hyssop Remedy has historically been used for respiratory complaints — coughs, chest tightness, and congestion. Its volatile oils have expectorant properties that may help loosen phlegm and support breathing. Mint Tonic has been used for digestive complaints including nausea, indigestion, bloating, and cramping. Menthol compounds in mint soothe the digestive tract and ease discomfort after heavy meals. Cumin Poultice has been used for skin inflammation, rashes, and irritated wounds. Cumin's thymoquinone content has historically been valued for its antimicrobial and anti-inflammatory properties. Coriander Salve has been used for digestive complaints, loss of appetite, and mild infections. Its linalool content was known in ancient medicine for its calming and antimicrobial effects. Dill Tonic has been used for sleeplessness, anxiety, restlessness, and digestive discomfort. It has a long tradition as a calming herb for both adults and children. Note: this journal records historical and educational information. Seek appropriate care for serious ailments."),
  entry("cleanFood", "Clean Food and Faithful Stewardship", "Food systems begin with clean grains, legumes, vegetables, fruits, and herbs. Questionable or unclassified foods are not edible until reviewed."),
  entry("sabbathPrep", "Sabbath Preparation and Rest", "Preparation Day invites water, clean food, herbs, tidying, tools put away, and a Sabbath basket. Sabbath rest is blessing, not punishment."),
  entry("sixDays", "Six Days You Shall Labor", "Six days are for ordinary work. The rhythm gives work dignity and keeps it from swallowing the whole life of the homestead."),
  entry("firstfruits", "Firstfruits and Gratitude", "Future versions can set apart the first and best harvest as a lesson in gratitude. The harvest is received, not merely produced."),
  entry("gleaning", "Gleaning and Generosity", "Future fields may leave a portion for gleaning, teaching that abundance makes room for neighborly care."),
  entry("measures", "Honest Measures", "Honest weights and measures can shape future trading systems. Fair dealing belongs in the marketplace as surely as seed belongs in soil."),
  entry("landRest", "Rest for the Land", "Soil rest can become a later farming system. The land is not an endless machine; it is stewarded with patience."),
  entry("appointedTimes", "Appointed Times", "A future calendar can teach appointed times through preparation, harvest, rejoicing, remembrance, and rest."),
  entry("sukkot", "Sukkot and Rejoicing", "Sukkot can later become a joyful season of gathering branches, building a sukkah, sharing clean food, and rejoicing before Yehovah."),
  entry("prayer", "Prayer and Reflection", "Quiet reflection is welcome here. The game should leave space for thankfulness, confession, hope, and simple attention."),
  entry("stewardship", "Stewardship", "Stewardship means receiving the homestead as a trust. Tools, soil, time, food, and rest are handled with care."),
  entry("shalomRest", "Shalom Rest", "After Sabbath, hunger, thirst, hygiene, and relaxation needs are steadied. Rest strengthens the next work day and reminds the homestead that trust is part of provision."),
  entry("wheat", "Wheat", "Wheat is a clean spring grain planted after the barley. It takes four days to mature and can be baked into bread or added to hearty stews."),
  entry("onions", "Onions", "Onions are a clean spring vegetable that mature in three days. They add flavour to soups, salads, and flatbreads and keep well after harvest."),
  entry("garlic", "Garlic", "Garlic is a clean autumn vegetable planted when the days shorten. It takes four days to mature and is valued for flavour and warming soups."),
  entry("figs", "Figs", "Figs are a clean summer fruit that take five days to mature. Scripture speaks of sitting under one's own fig tree as a picture of peace and provision."),
  entry("grapes", "Grapes", "Grapes are a clean summer fruit taking five days to mature. They can be eaten fresh, pressed for juice, or preserved. Gleaning traditions apply to the vineyard as well."),
  entry("leeks", "Leeks", "Leeks are a clean autumn vegetable that mature in three days. They make a gentle, warming soup as the season turns cold."),
  entry("seasonalPlanting", "Seasonal Planting Guide", "Spring: barley, wheat, onions, lentils. Summer: cucumbers, figs, grapes. Autumn: garlic, leeks. Each season has its own planting, and the rhythm of the land echoes the rhythm of rest."),
  entry("cleanFishSeasons", "Clean Fish by Season", "Clean fish must have both fins and scales (Leviticus 11:9-12). The pond yields clean fish in spring and summer. In autumn, trout are running. In winter, salmon come to the cold waters. All are clean and good for the table."),
  entry("trout", "Trout", "Trout have fins and scales and are therefore clean according to Leviticus 11. They run in autumn and can be caught with a fishing pole or net from the pond."),
  entry("salmon", "Salmon", "Salmon have fins and scales and are therefore clean. They are a winter catch at the pond, nourishing and suitable for a warm meal in the cold months.")
];

function entry(id, title, body) {
  return { id, title, body };
}

const TESTER_CODE = "blessing";
const REST_LIMITS = { shortRest: 2, nap: 1 };
const REST_COOLDOWN_MINUTES = 360;
const SLEEP_THROUGH_NIGHT_MINUTE = 18 * 60;
const NIGHTFALL_MINUTE = 22 * 60;
const NEED_MAX = 100;
const NEED_LABELS = {
  hunger: "Hunger",
  thirst: "Thirst",
  hygiene: "Hygiene",
  relaxation: "Relaxation"
};
const NEED_PASSIVE_RATES = {
  hunger: 1 / 24,
  thirst: 1 / 18,
  hygiene: 1 / 42,
  relaxation: 1 / 36
};
const NEED_LABOR_RATES = {
  hunger: 0.42,
  thirst: 0.52,
  hygiene: 0.28,
  relaxation: 0.36
};
const QUALITY_ORDER = ["standard", "good", "excellent"];
const QUALITY_LABELS = { standard: "Standard", good: "Good", excellent: "Excellent" };
const SEED_QUALITY_LABELS = { standard: "Common", good: "Selected", excellent: "Heirloom" };
const HONEY_QUALITY_LABELS = { standard: "Wildflower", good: "Golden", excellent: "Comb-Rich" };
const QUALITY_PRICE_MULTIPLIER = { standard: 1, good: 1.5, excellent: 2.25 };
const WATERING_CAN_CAPACITY = 6;
const BUFF_DEFINITIONS = {
  cleanLaundry: {
    label: "Clean Laundry",
    className: "buff-laundry",
    detail: "Fresh laundry boosts harvest and production yields."
  },
  relaxed: {
    label: "Relaxed",
    className: "buff-relaxed",
    detail: "Bathing lowers relaxation need from upcoming labor."
  },
  cleanHands: {
    label: "Clean Hands",
    className: "buff-hands",
    detail: "The next two cooking actions finish one quality tier higher."
  },
  freshStart: {
    label: "Fresh Start",
    className: "buff-fresh",
    detail: "Brushing teeth boosts upcoming harvest and production yields."
  },
  nourished: {
    label: "Nourished",
    className: "buff-nourished",
    detail: "A satisfying meal slows hunger and thirst from upcoming labor."
  }
};
const SKILL_STAGES = [
  { threshold: 0, label: "Learning" },
  { threshold: 8, label: "Practiced" },
  { threshold: 24, label: "Skilled" },
  { threshold: 48, label: "Wise" }
];
const SKILL_DEFINITIONS = {
  gardening: {
    label: "Gardening",
    detail: "Care with planting, watering, soil preparation, weeding, and harvest."
  },
  animalCare: {
    label: "Animal Care",
    detail: "Gentle, consistent feeding, watering, cleaning, gathering, and harvest care."
  },
  cooking: {
    label: "Cooking",
    detail: "Kitchen practice with prep, clean ingredients, and stove work."
  },
  crafting: {
    label: "Crafting",
    detail: "Patient handwork for tools, supplies, cloth, feed, and useful goods."
  },
  gathering: {
    label: "Gathering",
    detail: "Stewardship in the forest, water places, fishing, herbs, wood, and stone."
  }
};
const CLOTHING_DEFINITIONS = {
  everyday: {
    label: "Everyday Clothes",
    focus: null,
    detail: "Simple work clothes for ordinary homestead tasks."
  },
  gardenApron: {
    label: "Garden Apron",
    focus: "gardening",
    detail: "Helps gardening practice settle in more quickly."
  },
  kitchenApron: {
    label: "Kitchen Apron",
    focus: "cooking",
    detail: "Keeps kitchen work orderly and supports better food preparation."
  },
  barnCoat: {
    label: "Barn Coat",
    focus: "animalCare",
    detail: "Keeps animal chores steady, clean, and careful."
  },
  workApron: {
    label: "Work Apron",
    focus: "crafting",
    detail: "Useful pockets and ties support focused handwork."
  },
  fieldCloak: {
    label: "Field Cloak",
    focus: "gathering",
    detail: "Good outerwear for forest, water, and field work."
  }
};
const CRAFT_QUALITY_ITEMS = new Set(["feed", "hay", "cloth", "fertilizer", "arrows"]);

let state = createNewState();
let activeJournalId = "welcome";
let messageTimeout = null;
let effectTimeout = null;
let pendingSceneEffect = null;
let autosaveTimer = null;
let isLoadingSave = false;
let isWritingSave = false;
let lastSaveInfo = { status: "Not saved yet", savedAt: null, error: "" };
let hiddenTesterBuffer = "";
let titleTapCount = 0;
let lastTitleTap = 0;
let gameTick = null;
let mobileMenuOpen = false;
let dailyGoalsOpen = false;
const GAME_TICK_MS = 3000;        // 3 real seconds = 1 game minute

const DAILY_GOAL_POOL = [
  { id: "waterCrops2",   category: "garden",      label: "Water 2 crop beds",            reward: 3, check: (s) => s.dailyStats.cropsWatered >= 2 },
  { id: "harvest1",      category: "garden",      label: "Harvest a ready crop",          reward: 4, check: (s) => s.dailyStats.cropsHarvested >= 1 },
  { id: "plant2",        category: "garden",      label: "Plant 2 crop beds",             reward: 3, check: (s) => s.dailyStats.cropsPlanted >= 2 },
  { id: "weed1",         category: "garden",      label: "Clear weeds from a bed",        reward: 2, check: (s) => s.dailyStats.cropsWeeded >= 1 },
  { id: "careAnimals2",  category: "animals",     label: "Care for 2 animal groups",      reward: 4, check: (s) => s.dailyStats.animalGroupsCared >= 2 },
  { id: "collectProd2",  category: "animals",     label: "Collect from 2 animal groups",  reward: 4, check: (s) => s.dailyStats.animalProductsCollected >= 2 },
  { id: "treatAnimal1",  category: "animals",     label: "Heal an ailing animal",         reward: 6, check: (s) => s.dailyStats.animalsTreated >= 1 },
  { id: "cookMeal1",     category: "kitchen",     label: "Cook a meal",                   reward: 3, check: (s) => s.dailyStats.mealsCooked >= 1 },
  { id: "cookMeal2",     category: "kitchen",     label: "Cook 2 meals",                  reward: 5, check: (s) => s.dailyStats.mealsCooked >= 2 },
  { id: "craft1",        category: "craft",       label: "Craft an item",                 reward: 4, check: (s) => s.dailyStats.itemsCrafted >= 1 },
  { id: "fish1",         category: "gather",      label: "Catch a fish",                  reward: 4, check: (s) => s.dailyStats.fishCaught >= 1 },
  { id: "hunt1",         category: "gather",      label: "Hunt wild game",                reward: 5, check: (s) => s.dailyStats.deerHunted >= 1 },
  { id: "gatherWood1",   category: "gather",      label: "Gather wood from the forest",   reward: 3, check: (s) => s.dailyStats.woodGathered >= 1 },
  { id: "gatherWater1",  category: "gather",      label: "Gather water from the well",    reward: 2, check: (s) => s.dailyStats.waterGathered >= 1 },
  { id: "gatherHay1",    category: "gather",      label: "Gather hay for the animals",    reward: 3, check: (s) => s.dailyStats.hayGathered >= 1 },
  { id: "fillOrder1",    category: "community",   label: "Fill a community order",        reward: 5, check: (s) => s.dailyStats.ordersFilled >= 1 },
  { id: "chores3",       category: "stewardship", label: "Complete 3 household chores",   reward: 3, check: (s) => s.dailyStats.choresCompleted >= 3 },
  { id: "earnCoins10",   category: "community",   label: "Earn 10 coins today",           reward: 4, check: (s) => s.dailyStats.coinsEarned >= 10 },
];

const SUMMARY_VERSES = [
  { text: "Whatever you do, work at it with all your heart, as working for the Lord.", ref: "Colossians 3:23" },
  { text: "Six days you shall labor and do all your work.", ref: "Exodus 20:9" },
  { text: "The land will yield its fruit, and you will eat your fill and live there in safety.", ref: "Leviticus 25:19" },
  { text: "The plans of the diligent lead to profit as surely as haste leads to poverty.", ref: "Proverbs 21:5" },
  { text: "Go to the ant, you sluggard; consider its ways and be wise!", ref: "Proverbs 6:6" },
  { text: "He who gathers crops in summer is a prudent son.", ref: "Proverbs 10:5" },
  { text: "The Lord will open the heavens, the storehouse of his bounty, to send rain on your land in season.", ref: "Deuteronomy 28:12" },
  { text: "A good person leaves an inheritance for their children's children.", ref: "Proverbs 13:22" },
  { text: "The earth is the Lord's, and everything in it.", ref: "Psalm 24:1" },
  { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest.", ref: "Galatians 6:9" },
  { text: "She sees that her trading is profitable, and her lamp does not go out at night.", ref: "Proverbs 31:18" },
  { text: "By the sweat of your brow you will eat your food until you return to the ground.", ref: "Genesis 3:19" },
];

function createDailyStats() {
  return {
    cropsWatered: 0,
    cropsHarvested: 0,
    cropsPlanted: 0,
    cropsWeeded: 0,
    animalGroupsCared: 0,
    animalProductsCollected: 0,
    animalsTreated: 0,
    mealsCooked: 0,
    itemsCrafted: 0,
    fishCaught: 0,
    deerHunted: 0,
    woodGathered: 0,
    waterGathered: 0,
    hayGathered: 0,
    ordersFilled: 0,
    choresCompleted: 0,
    coinsEarned: 0,
  };
}

function createNewState() {
  return {
    currentScene: "overview",
    day: 1,
    minute: 7 * 60,
    seasonIndex: 0,
    weatherIndex: 0,
    needs: createNeeds(),
    inventory: { ...starterInventory },
    qualityInventory: {},
    skills: createSkills(),
    clothing: createClothing(),
    tools: { ...starterTools },
    toolDurability: createToolDurability(starterTools),
    upgrades: { tractor: false, irrigation: false, plumbing: false },
    crops: createGardenBeds(),
    barnAnimals: createBarnAnimals(),
    barnFeedStore: 0,
    barnWaterStore: 0,
    kitchenChores: { dishes: false, counters: false, floor: false },
    roomChores: createRoomChores(),
    pendingOrders: [],
    sabbathPrep: Object.fromEntries(sabbathTasks.map((task) => [task.id, false])),
    shalomRestDays: 0,
    restedBuffDays: 0,
    restBuffs: createRestBuffs(),
    dailyRest: createDailyRest(),
    buffs: createBuffs(),
    preppedFood: null,
    isSabbathRest: false,
    hotspotDebug: false,
    communityOrders: [],
    nextOrderId: 1,
    sabbathActivities: { worshipped: false, strolled: false, gathered: false },
    lastRestMinute: -400,
    journalUnlocked: Object.fromEntries(journalEntries.map((item) => [item.id, item.id !== "shalomRest"])),
    messages: ["Welcome to Hebrew Homestead. Click a scene hotspot to begin."],
    dailyStats: createDailyStats(),
    dailyGoals: [],
    marketStall: createMarketStall()
  };
}

function createGardenBeds() {
  return Object.fromEntries(Object.entries(gardenBeds).map(([key, bed]) => [key, emptyCropBed(bed.defaultName)]));
}

function emptyCropBed(name = "") {
  return { name, plantings: [], wateredToday: false, weededToday: false, composted: false, fertilized: false, hasWeeds: false };
}

function emptyCrop(cropType) {
  return { cropType, growthStage: 0, daysWatered: 0, readyToHarvest: false };
}

function createBarnAnimals() {
  return Object.fromEntries(Object.keys(animalCatalog).map((key) => [key, emptyAnimalGroup()]));
}

function emptyAnimalGroup() {
  return { count: 0, fedToday: false, wateredToday: false, cleanedToday: false, productCollectedToday: false, feathersCollectedToday: false, ailment: null, breeding: null };
}

function createToolDurability(tools = {}) {
  return Object.fromEntries(Object.entries(toolDurabilityMax).map(([key, max]) => [key, tools[key] ? max : 0]));
}

function hydrateToolDurability(savedState, tools) {
  const saved = savedState.toolDurability || {};
  return Object.fromEntries(Object.entries(toolDurabilityMax).map(([key, max]) => {
    if (!tools[key]) return [key, 0];
    const uses = saved[key] ?? max;
    return [key, Math.max(0, Math.min(max, uses))];
  }));
}

function createRoomChores() {
  return {
    cabin: { dust: false, books: false },
    livingRoom: { dust: false, books: false },
    pantry: { dust: false, crates: false },
    workshed: { sawdust: false },
    barn: { straw: false }
  };
}

function createRestBuffs() {
  return { settled: 0, refreshed: 0 };
}

function createDailyRest() {
  return { shortRest: 0, nap: 0 };
}

function createBuffs() {
  return { cleanLaundry: 0, relaxed: 0, cleanHands: 0, freshStart: 0, nourished: 0 };
}

function createNeeds() {
  return { hunger: 12, thirst: 8, hygiene: 5, relaxation: 10 };
}

function createMarketStall() {
  return { isOpen: false, listings: {}, nextSaleMinute: 9999, recentSales: [], todayCoins: 0 };
}

function createSkills() {
  return Object.fromEntries(Object.keys(SKILL_DEFINITIONS).map((key) => [key, 0]));
}

function createClothing() {
  return {
    active: "everyday",
    items: Object.fromEntries(Object.keys(CLOTHING_DEFINITIONS).map((key) => [key, 1]))
  };
}

function loadGame() {
  isLoadingSave = true;
  const loaded = readStoredSave(SAVE_KEY) || readStoredSave(SAVE_BACKUP_KEY);
  if (!loaded) {
    isLoadingSave = false;
    return;
  }
  try {
    const parsed = loaded.state;
    state = hydrateState(parsed);
    lastSaveInfo = {
      status: loaded.fromBackup ? "Loaded backup save" : "Loaded saved game",
      savedAt: loaded.savedAt || null,
      error: ""
    };
    pushMessage(loaded.fromBackup ? "Primary save was unavailable, so the backup save was loaded." : "Saved homestead loaded.");
  } catch {
    lastSaveInfo = { status: "Save load failed", savedAt: null, error: "Could not read saved data." };
    pushMessage("Save data could not be loaded. Starting fresh.");
  } finally {
    isLoadingSave = false;
  }
}

function hydrateState(savedState) {
  const tools = { ...starterTools, ...(savedState.tools || {}) };
  const toolDurability = hydrateToolDurability(savedState, tools);
  Object.keys(toolDurabilityMax).forEach((key) => {
    if (toolDurability[key] <= 0) tools[key] = false;
  });
  return {
    ...createNewState(),
    ...savedState,
    inventory: { ...starterInventory, ...(savedState.inventory || {}) },
    qualityInventory: hydrateQualityInventory(savedState),
    skills: { ...createSkills(), ...(savedState.skills || {}) },
    clothing: mergeClothing(savedState.clothing || {}),
    tools,
    toolDurability,
    upgrades: { tractor: false, irrigation: false, plumbing: false, ...(savedState.upgrades || {}) },
    crops: mergeGardenBeds(savedState.crops || {}),
    barnAnimals: mergeBarnAnimals(savedState.barnAnimals || {}),
    kitchenChores: { dishes: false, counters: false, floor: false, ...(savedState.kitchenChores || {}) },
    roomChores: mergeRoomChores(savedState.roomChores || {}),
    restBuffs: { ...createRestBuffs(), ...(savedState.restBuffs || {}) },
    dailyRest: { ...createDailyRest(), ...(savedState.dailyRest || {}) },
    buffs: { ...createBuffs(), ...(savedState.buffs || {}) },
    preppedFood: savedState.preppedFood || null,
    sabbathPrep: { ...Object.fromEntries(sabbathTasks.map((task) => [task.id, false])), ...(savedState.sabbathPrep || {}) },
    journalUnlocked: { ...Object.fromEntries(journalEntries.map((item) => [item.id, item.id !== "shalomRest"])), ...(savedState.journalUnlocked || {}) },
    communityOrders: savedState.communityOrders || [],
    nextOrderId: savedState.nextOrderId || 1,
    sabbathActivities: { worshipped: false, strolled: false, gathered: false, ...(savedState.sabbathActivities || {}) },
    lastRestMinute: savedState.lastRestMinute ?? -400,
    messages: savedState.messages?.length ? savedState.messages : ["Saved homestead loaded."],
    dailyStats: { ...createDailyStats(), ...(savedState.dailyStats || {}) },
    dailyGoals: savedState.dailyGoals || [],
    needs: hydrateNeeds(savedState.needs),
    hotspotDebug: false,
    marketStall: { ...createMarketStall(), ...(savedState.marketStall || {}) }
  };
}

function hydrateNeeds(savedNeeds = {}) {
  const base = createNeeds();
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [
    key,
    clampNeed(savedNeeds[key] ?? value)
  ]));
}

function mergeBarnAnimals(savedAnimals) {
  const base = createBarnAnimals();
  return Object.fromEntries(Object.entries(base).map(([animal, data]) => [
    animal,
    { ...data, ...(savedAnimals[animal] || {}) }
  ]));
}

function mergeClothing(savedClothing) {
  const base = createClothing();
  const active = CLOTHING_DEFINITIONS[savedClothing.active] ? savedClothing.active : base.active;
  return {
    active,
    items: { ...base.items, ...(savedClothing.items || {}) }
  };
}

function hydrateQualityInventory(savedState) {
  const qualityInventory = { ...(savedState.qualityInventory || {}) };
  Object.keys(savedState.inventory || {}).forEach((key) => {
    if (!isQualityTracked(key)) return;
    const amount = savedState.inventory[key] || 0;
    const qualityTotal = qualityItemTotal(qualityInventory[key]);
    if (amount > qualityTotal) {
      qualityInventory[key] = {
        ...(qualityInventory[key] || {}),
        standard: (qualityInventory[key]?.standard || 0) + (amount - qualityTotal)
      };
    }
  });
  return qualityInventory;
}

function mergeGardenBeds(savedCrops) {
  const base = createGardenBeds();
  const merged = Object.fromEntries(Object.entries(base).map(([bedId, bed]) => {
    const saved = savedCrops[bedId];
    if (!saved) return [bedId, bed];
    if (Array.isArray(saved.plantings)) return [bedId, { ...bed, ...saved }];
    return [bedId, bed];
  }));
  const legacyMap = {
    barley: ["bed1", "barley"],
    lentils: ["bed2", "lentils"],
    cucumbers: ["bed3", "cucumbers"],
    barleyField: ["field1", "barley"],
    lentilField: ["field2", "lentils"],
    cucumberField: ["field3", "cucumbers"]
  };
  Object.entries(legacyMap).forEach(([legacyId, [bedId, cropType]]) => {
    const legacyCrop = savedCrops[legacyId];
    const bed = merged[bedId];
    if (!legacyCrop?.planted || !bed || bed.plantings.length) return;
    bed.plantings.push({
      cropType,
      growthStage: legacyCrop.growthStage || 1,
      daysWatered: legacyCrop.daysWatered || 0,
      readyToHarvest: Boolean(legacyCrop.readyToHarvest)
    });
    bed.wateredToday = Boolean(legacyCrop.wateredToday);
    bed.weededToday = Boolean(legacyCrop.weededToday);
    bed.fertilized = Boolean(legacyCrop.fertilized);
    bed.hasWeeds = Boolean(legacyCrop.hasWeeds);
  });
  return merged;
}

function mergeRoomChores(savedChores) {
  const base = createRoomChores();
  return Object.fromEntries(Object.entries(base).map(([room, chores]) => [
    room,
    { ...chores, ...(savedChores[room] || {}) }
  ]));
}

function saveGame(manual = false) {
  isWritingSave = true;
  try {
    const existing = localStorage.getItem(SAVE_KEY);
    if (existing) localStorage.setItem(SAVE_BACKUP_KEY, existing);
    const savedAt = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, JSON.stringify({ version: SAVE_VERSION, savedAt, state }));
    lastSaveInfo = { status: manual ? "Manual save complete" : "Autosaved", savedAt, error: "" };
    if (manual) pushMessage("Progress saved.");
    return true;
  } catch (error) {
    lastSaveInfo = { status: "Save failed", savedAt: lastSaveInfo.savedAt, error: error.message || "Browser storage failed." };
    pushMessage("Save failed. Open Save Manager and export your save as a backup.");
    return false;
  } finally {
    isWritingSave = false;
  }
}

function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(SAVE_BACKUP_KEY);
  state = createNewState();
  activeJournalId = "welcome";
  lastSaveInfo = { status: "Save reset", savedAt: null, error: "" };
  pushMessage("Save reset. A fresh homestead is ready.");
  closeModal();
  render();
}

function readStoredSave(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    if (parsed?.state) {
      return { state: parsed.state, savedAt: parsed.savedAt, version: parsed.version, fromBackup: key === SAVE_BACKUP_KEY };
    }
    return { state: parsed, savedAt: null, version: 1, fromBackup: key === SAVE_BACKUP_KEY };
  } catch {
    return null;
  }
}

function namedSaveKey(index) {
  return `${NAMED_SAVE_PREFIX}${index}`;
}

function readRawSave(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    return parsed?.state ? parsed : null;
  } catch {
    return null;
  }
}

function getAllNamedSaves() {
  const saves = [];
  for (let i = 0; i < MAX_NAMED_SAVES; i++) {
    saves.push({ index: i, raw: readRawSave(namedSaveKey(i)) });
  }
  return saves;
}

function saveToNamedSlot(name) {
  const cleanName = name.trim().slice(0, 32);
  if (!cleanName) {
    pushMessage("Enter a name before saving.");
    return;
  }
  let targetIndex = -1;
  for (let i = 0; i < MAX_NAMED_SAVES; i++) {
    const raw = readRawSave(namedSaveKey(i));
    if (!raw && targetIndex === -1) targetIndex = i;
    if (raw?.name === cleanName) { targetIndex = i; break; }
  }
  if (targetIndex === -1) targetIndex = 0;
  const savedAt = new Date().toISOString();
  localStorage.setItem(namedSaveKey(targetIndex), JSON.stringify({ version: SAVE_VERSION, savedAt, name: cleanName, state }));
  saveGame(false);
  pushMessage(`Saved as "${cleanName}".`);
  render();
  openModal("save");
}

function loadFromNamedSlot(index) {
  const raw = readRawSave(namedSaveKey(index));
  if (!raw?.state) {
    pushMessage("No save found in that slot.");
    return;
  }
  saveGame(false);
  state = hydrateState(raw.state);
  lastSaveInfo = { status: `Loaded "${raw.name || "Saved Game"}"`, savedAt: raw.savedAt || null, error: "" };
  pushMessage(`Continued from "${raw.name || "Saved Game"}".`);
  closeModal();
  render();
}

function deleteNamedSlot(index) {
  const raw = readRawSave(namedSaveKey(index));
  const label = raw?.name ? `"${raw.name}"` : "that save";
  localStorage.removeItem(namedSaveKey(index));
  pushMessage(`Deleted ${label}.`);
  render();
  openModal("save");
}

function startNewGame() {
  saveGame(false);
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(SAVE_BACKUP_KEY);
  state = createNewState();
  activeJournalId = "welcome";
  lastSaveInfo = { status: "New game", savedAt: null, error: "" };
  pushMessage("Welcome to Hebrew Homestead. Click a scene hotspot to begin.");
  closeModal();
  render();
}

function scheduleAutosave() {
  if (isLoadingSave || isWritingSave) return;
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => saveGame(false), 900);
}

function isPreparationDay() {
  return ((state.day - 1) % 7) === 5 && !state.isSabbathRest;
}

function isSabbath() {
  return ((state.day - 1) % 7) === 6 || state.isSabbathRest;
}

function weekdayName() {
  return weekdays[(state.day - 1) % 7];
}

function sabbathStatus() {
  if (state.isSabbathRest) return "Resting";
  if (isSabbath()) return "Sabbath";
  if (isPreparationDay()) return "Preparation";
  return state.shalomRestDays > 0 ? "Shalom Rest" : "Work Day";
}

function hasRestedStaminaBoost() {
  return state.shalomRestDays > 0 || state.restedBuffDays > 0 || (state.restBuffs?.refreshed || 0) > 0 || (state.restBuffs?.settled || 0) > 0;
}

function isQualityTracked(key) {
  return Boolean(edibleItems[key]) || CRAFT_QUALITY_ITEMS.has(key) || isSeedItem(key) || key === "beeswax" || Boolean(craftingRecipes.some((item) => item.id === key && item.type === "material"));
}

function isSeedItem(key) {
  return Boolean(Object.values(cropTypes).some((crop) => crop.seedItem === key));
}

function qualityLabelForItem(key, quality) {
  if (isSeedItem(key)) return SEED_QUALITY_LABELS[quality] || QUALITY_LABELS[quality] || quality;
  if (key === "honey") return HONEY_QUALITY_LABELS[quality] || QUALITY_LABELS[quality] || quality;
  return QUALITY_LABELS[quality] || quality;
}

function qualityItemTotal(bucket = {}) {
  return QUALITY_ORDER.reduce((sum, quality) => sum + (bucket[quality] || 0), 0);
}

function ensureQualityTotals(key) {
  if (!isQualityTracked(key)) return;
  state.qualityInventory ||= {};
  const amount = state.inventory[key] || 0;
  const bucket = state.qualityInventory[key] || {};
  const qualityTotal = qualityItemTotal(bucket);
  if (amount > qualityTotal) {
    bucket.standard = (bucket.standard || 0) + (amount - qualityTotal);
  }
  state.qualityInventory[key] = bucket;
}

function addQualityItem(key, amount, quality = "standard") {
  if (!isQualityTracked(key) || amount <= 0) return;
  state.qualityInventory ||= {};
  const cleanQuality = QUALITY_ORDER.includes(quality) ? quality : "standard";
  state.qualityInventory[key] = state.qualityInventory[key] || {};
  state.qualityInventory[key][cleanQuality] = (state.qualityInventory[key][cleanQuality] || 0) + amount;
}

function spendQualityItem(key, amount) {
  if (!isQualityTracked(key) || amount <= 0) return [];
  ensureQualityTotals(key);
  const spent = [];
  const bucket = state.qualityInventory[key] || {};
  let remaining = amount;
  for (const quality of QUALITY_ORDER) {
    if (remaining <= 0) break;
    const used = Math.min(bucket[quality] || 0, remaining);
    if (!used) continue;
    bucket[quality] -= used;
    spent.push({ quality, amount: used });
    remaining -= used;
  }
  state.qualityInventory[key] = bucket;
  return spent;
}

function qualityScore(quality) {
  return Math.max(0, QUALITY_ORDER.indexOf(quality));
}

function qualityFromScore(score) {
  if (score >= 1.5) return "excellent";
  if (score >= 0.75) return "good";
  return "standard";
}

function nextQuality(quality) {
  const index = QUALITY_ORDER.indexOf(quality);
  return QUALITY_ORDER[Math.min(QUALITY_ORDER.length - 1, Math.max(0, index) + 1)];
}

function qualityFromSpent(spentByItem) {
  let score = 0;
  let count = 0;
  Object.values(spentByItem).flat().forEach((spent) => {
    score += qualityScore(spent.quality) * spent.amount;
    count += spent.amount;
  });
  return count ? qualityFromScore(score / count) : "standard";
}

function bestSpentQuality(spent = []) {
  return spent.reduce((best, entry) => {
    return qualityScore(entry.quality) >= qualityScore(best) ? entry.quality : best;
  }, "standard");
}

function skillStage(skillId) {
  const points = state.skills?.[skillId] || 0;
  return SKILL_STAGES.reduce((active, stage) => points >= stage.threshold ? stage : active, SKILL_STAGES[0]);
}

function nextSkillThreshold(skillId) {
  const points = state.skills?.[skillId] || 0;
  return SKILL_STAGES.find((stage) => stage.threshold > points)?.threshold || null;
}

function activeClothing() {
  const clothingId = state.clothing?.active || "everyday";
  return CLOTHING_DEFINITIONS[clothingId] ? clothingId : "everyday";
}

function activeClothingRank() {
  const clothingId = activeClothing();
  return state.clothing?.items?.[clothingId] || 1;
}

function clothingFocusMatches(skillId) {
  const clothing = CLOTHING_DEFINITIONS[activeClothing()];
  return clothing?.focus === skillId;
}

function learnFrom(skillId, amount = 1) {
  if (!SKILL_DEFINITIONS[skillId]) return;
  state.skills ||= createSkills();
  const clothingBonus = clothingFocusMatches(skillId) ? activeClothingRank() - 1 : 0;
  state.skills[skillId] = (state.skills[skillId] || 0) + amount + Math.max(0, clothingBonus);
}

function skillQualitySteps(skillId) {
  const points = state.skills?.[skillId] || 0;
  let steps = points >= 48 ? 2 : points >= 8 ? 1 : 0;
  if (clothingFocusMatches(skillId) && activeClothingRank() >= 3) steps += 1;
  return Math.min(2, steps);
}

function improveQualityByLearning(quality, skillId) {
  let improved = quality;
  for (let i = 0; i < skillQualitySteps(skillId); i += 1) {
    improved = nextQuality(improved);
  }
  return improved;
}

function clothingImproveCost(id) {
  const rank = state.clothing?.items?.[id] || 1;
  if (rank >= 3) return null;
  return { cloth: rank };
}

function canAffordCost(cost) {
  if (!cost) return false;
  return Object.entries(cost).every(([key, amount]) => (state.inventory[key] || 0) >= amount);
}

function clothingCostText(cost) {
  if (!cost) return "Fully upgraded";
  return Object.entries(cost).map(([key, amount]) => `${amount} ${itemLabels[key] || key}`).join(", ");
}

function qualityBreakdown(key) {
  if (!isQualityTracked(key)) return "";
  ensureQualityTotals(key);
  const bucket = state.qualityInventory?.[key] || {};
  return QUALITY_ORDER
    .filter((quality) => (bucket[quality] || 0) > 0)
    .map((quality) => `${qualityLabelForItem(key, quality)} ${bucket[quality]}`)
    .join(", ");
}

function needReliefMultiplier(needId) {
  let multiplier = 1;
  if (state.shalomRestDays > 0 || state.restedBuffDays > 0) multiplier *= 0.85;
  if ((state.restBuffs?.refreshed || 0) > 0 && needId === "relaxation") multiplier *= 0.45;
  else if ((state.restBuffs?.settled || 0) > 0 && needId === "relaxation") multiplier *= 0.65;
  if ((state.buffs?.relaxed || 0) > 0 && needId === "relaxation") multiplier *= 0.55;
  if ((state.buffs?.nourished || 0) > 0 && (needId === "hunger" || needId === "thirst")) multiplier *= 0.55;
  if ((state.buffs?.cleanHands || 0) > 0 && needId === "hygiene") multiplier *= 0.75;
  if ((state.buffs?.freshStart || 0) > 0 && needId === "hygiene") multiplier *= 0.65;
  return multiplier;
}

function consumeRestBuffUse() {
  if ((state.restBuffs?.refreshed || 0) > 0) {
    state.restBuffs.refreshed -= 1;
  } else if ((state.restBuffs?.settled || 0) > 0) {
    state.restBuffs.settled -= 1;
  }
  if ((state.buffs?.relaxed || 0) > 0) state.buffs.relaxed -= 1;
  if ((state.buffs?.nourished || 0) > 0) state.buffs.nourished -= 1;
}

function restBuffSummary() {
  const buffs = [];
  if (state.restedBuffDays > 0) buffs.push("Well Rested");
  if ((state.restBuffs?.refreshed || 0) > 0) buffs.push(`Refreshed (${state.restBuffs.refreshed})`);
  if ((state.restBuffs?.settled || 0) > 0) buffs.push(`Settled (${state.restBuffs.settled})`);
  return buffs.length ? buffs.join(", ") : "None";
}

function restUsesSummary() {
  const now = absoluteMinute();
  const elapsed = now - (state.lastRestMinute ?? -400);
  const napLeft = Math.max(0, REST_LIMITS.nap - (state.dailyRest?.nap || 0));
  if (elapsed >= REST_COOLDOWN_MINUTES) {
    return `Short rest ready, ${napLeft} nap`;
  }
  const remaining = REST_COOLDOWN_MINUTES - elapsed;
  const hrs = Math.floor(remaining / 60);
  const mins = remaining % 60;
  const waitText = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  return `Short rest in ${waitText}, ${napLeft} nap`;
}

function activeBuffs() {
  const buffs = [];
  if (state.shalomRestDays > 0) {
    buffs.push({ id: "shalomRest", label: "Shalom Rest", className: "buff-shalom", count: "1d", detail: "Labor raises needs more slowly today." });
  }
  if (state.restedBuffDays > 0) {
    buffs.push({ id: "wellRested", label: "Well Rested", className: "buff-rested", count: "1d", detail: "Labor raises needs more slowly today." });
  }
  if ((state.restBuffs?.refreshed || 0) > 0) {
    buffs.push({ id: "refreshed", label: "Refreshed", className: "buff-refreshed", count: state.restBuffs.refreshed, detail: "Upcoming labor adds much less relaxation need." });
  }
  if ((state.restBuffs?.settled || 0) > 0) {
    buffs.push({ id: "settled", label: "Settled", className: "buff-settled", count: state.restBuffs.settled, detail: "Upcoming labor adds less relaxation need." });
  }
  Object.entries(BUFF_DEFINITIONS).forEach(([id, buff]) => {
    const count = state.buffs?.[id] || 0;
    if (count > 0) buffs.push({ id, ...buff, count });
  });
  return buffs;
}

function buffEmblemsMarkup() {
  const buffs = activeBuffs();
  if (!buffs.length) return "";
  return `<div class="buff-emblems" aria-label="Active buffs">${buffs.map((buff) => `
    <span class="buff-emblem ${buff.className}" title="${buff.label}: ${buff.detail}">
      <span class="buff-icon" aria-hidden="true"></span>
      <span class="buff-count">${buff.count}</span>
    </span>
  `).join("")}</div>`;
}

function consumeProductionBuff() {
  if ((state.buffs?.cleanLaundry || 0) > 0) {
    state.buffs.cleanLaundry -= 1;
    return 1;
  }
  if ((state.buffs?.freshStart || 0) > 0) {
    state.buffs.freshStart -= 1;
    return 1;
  }
  return 0;
}

function improveQualityWithBuff(quality) {
  if ((state.buffs?.cleanHands || 0) <= 0) return quality;
  state.buffs.cleanHands -= 1;
  return nextQuality(quality);
}

function canDoLabor(action) {
  if (!isSabbath()) return true;
  if (action === "water" || action === "read" || action === "navigate" || action === "rest" || action === "animalCare" || action === "hygiene") return true;
  pushMessage("Sabbath rest has begun. Ordinary labor waits; peaceful navigation, reading, and necessary care remain open.");
  return false;
}

function hasStamina(_amount) {
  ensureNeeds();
  if ((state.needs.hunger || 0) >= 88) {
    pushMessage("Too hungry to keep working. Eat something before continuing.");
    return false;
  }
  if ((state.needs.thirst || 0) >= 88) {
    pushMessage("Too thirsty to keep working. Drink water before continuing.");
    return false;
  }
  return true;
}

function spendStamina(amount, timeCost = 20) {
  if (!hasStamina(amount)) return false;
  applyLaborNeeds(amount);
  consumeRestBuffUse();
  advanceTime(timeCost);
  return true;
}

function clampNeed(value) {
  return Math.max(0, Math.min(NEED_MAX, Number(value) || 0));
}

function ensureNeeds() {
  state.needs = hydrateNeeds(state.needs || {});
}

function adjustNeed(key, delta) {
  ensureNeeds();
  state.needs[key] = clampNeed((state.needs[key] || 0) + delta);
}

function adjustNeeds(changes) {
  Object.entries(changes).forEach(([key, delta]) => adjustNeed(key, delta));
}

function applyLaborNeeds(amount = 1) {
  ensureNeeds();
  Object.entries(NEED_LABOR_RATES).forEach(([key, rate]) => {
    adjustNeed(key, amount * rate * needReliefMultiplier(key));
  });
}

function applyTimeNeeds(minutes = 1) {
  ensureNeeds();
  Object.entries(NEED_PASSIVE_RATES).forEach(([key, rate]) => {
    adjustNeed(key, minutes * rate * needReliefMultiplier(key));
  });
}

function needReliefText(changes) {
  return Object.entries(changes)
    .filter(([, delta]) => delta < 0)
    .map(([key, delta]) => `${NEED_LABELS[key].toLowerCase()} -${Math.round(Math.abs(delta))}`)
    .join(", ");
}

function markPrep(id) {
  if (isPreparationDay()) state.sabbathPrep[id] = true;
}

function allPrepComplete() {
  return sabbathTasks.every((task) => state.sabbathPrep[task.id]);
}

function handleHotspot(hotspot) {
  if (hotspot.requirement && !state.tools[hotspot.requirement]) {
    if (hotspot.requirement === "basicAxe") pushMessage("You need an axe to chop this tree.");
    else pushMessage(`Requirement missing: ${toolLabels[hotspot.requirement] || hotspot.requirement}.`);
    return;
  }

  const action = hotspot.action;
  if (action === "navigate") navigate(hotspot.target);
  if (action === "modal") openModal(hotspot.modal);
  if (action === "message") pushMessage(hotspot.message || "There is nothing more to do here yet.");
  if (action === "rest") restAtCabin();
  if (action === "tidy") tidyCottage();
  if (action === "cleanRoomChore") cleanRoomChore(hotspot);
  if (action === "collectOrders") collectOrders();
  if (action === "setSabbathBasket") setAsideSabbathBasket();
  if (action === "waterJar") waterJar();
  if (action === "washDishes") washDishes();
  if (action === "cleanCounters") cleanCounters();
  if (action === "sweepKitchen") sweepKitchen();
  if (action === "washLaundry") washLaundry();
  if (action === "bathe") batheInTub();
  if (action === "washHands") washHands();
  if (action === "brushTeeth") brushTeeth();
  if (action === "storeHarvest") openModal("inventory", "Pantry Inventory");
  if (action === "crop") openCropModal(hotspot.crop);
  if (action === "fieldsPanel") openFieldsPanel();
  if (action === "gatherHerbs") gatherHerbs();
  if (action === "compost") compostArea();
  if (action === "refillWateringCan") refillWateringCan();
  if (action === "putToolsAway") putToolsAway();
  if (action === "forestGather") forestGather(hotspot);
  if (action === "gatherHay") gatherHay(hotspot);
  if (action === "smallTree") chopSmallTree();
  if (action === "harvestTrees") harvestTrees();
  if (action === "harvestHive") harvestHive();
  if (action === "treeHarvestPanel") openTreeHarvestModal(hotspot);
  if (action === "stoneHarvestPanel") openStoneHarvestModal(hotspot);
  if (action === "stonePile") stonePile();
  if (action === "fishPond") fishPond();
  if (action === "huntDeer") huntDeer();
  if (action === "animal") openAnimalModal(hotspot.animal);
  if (action === "barnCare") openModal("barnCare");
  if (action === "addFeedTrough") addFeedTrough();
  if (action === "addWaterTrough") addWaterTrough();
  if (action === "cleanBarn") cleanBarnForManure();
  if (action === "gatherWater") gatherWater();
  if (action === "fillWaterJar") fillWaterJar();
  if (action === "drinkWater") drinkWater(hotspot.source || "well");
  if (action === "enterSabbath") enterSabbathRest();
  if (action === "endSabbath") endSabbathRest();
  if (action === "sabbathReflection") sabbathReflection();
  if (action === "sabbathWorship") sabbathWorshipAction();
  if (action === "sabbathStroll") sabbathStrollAction();
  if (action === "sabbathGathering") sabbathGatheringAction();
  render();
}

function navigate(target) {
  if (!canDoLabor("navigate")) return;
  state.currentScene = target;
  pushMessage(`Moved to ${scenes[target].title}.`);
}

function restAtCabin() {
  if (!["cabin", "livingRoom"].includes(state.currentScene)) {
    pushMessage("Short rest is available in the Cabin Entry or Living Room. Deeper sleep is available in the Bedroom.");
    return;
  }
  const now = absoluteMinute();
  const elapsed = now - (state.lastRestMinute ?? -400);
  if (elapsed < REST_COOLDOWN_MINUTES) {
    const remaining = REST_COOLDOWN_MINUTES - elapsed;
    const hrs = Math.floor(remaining / 60);
    const mins = remaining % 60;
    const waitText = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    pushMessage(`You rested recently. Rest will be available again in about ${waitText} of in-game time.`);
    return;
  }
  if (state.minute + 45 >= NIGHTFALL_MINUTE) {
    pushMessage("It is too late for a short rest. Sleep through the night from the bedroom instead.");
    return;
  }
  state.lastRestMinute = now;
  adjustNeeds({ relaxation: -35, hunger: 4, thirst: 4 });
  state.restBuffs.settled = Math.max(state.restBuffs.settled || 0, 2);
  triggerSceneEffect("rest");
  advanceTime(45);
  pushMessage("You took a short rest and feel settled. The next two labor actions add less relaxation need.");
}

function eatFood(itemKey) {
  const values = FOOD_EAT_VALUES[itemKey];
  if (!values) return;
  if ((state.inventory[itemKey] || 0) < 1) {
    pushMessage(`You have no ${itemLabels[itemKey] || itemKey} to eat.`);
    return;
  }
  ensureNeeds();
  if (state.needs.hunger <= 3 && state.needs.thirst <= 3 && state.needs.relaxation <= 3) {
    pushMessage("You are already fed, refreshed, and settled.");
    return;
  }
  const spent = spendQualityItem(itemKey, 1);
  state.inventory[itemKey] = Math.max(0, (state.inventory[itemKey] || 0) - 1);
  const bestQuality = bestSpentQuality(spent);
  const qualityBonus = bestQuality === "excellent" ? 14 : bestQuality === "good" ? 6 : 0;
  const thirstBonus = bestQuality === "excellent" ? 6 : bestQuality === "good" ? 3 : 0;
  const relaxationBonus = bestQuality === "excellent" ? 4 : bestQuality === "good" ? 2 : 0;
  const nourishedBonus = bestQuality === "excellent" ? 2 : bestQuality === "good" ? 1 : 0;
  const relief = {
    hunger: -((values.hunger || 0) + qualityBonus),
    thirst: -((values.thirst || 0) + thirstBonus),
    relaxation: -((values.relaxation || 0) + relaxationBonus)
  };
  adjustNeeds(relief);
  const nourishedUses = (values.nourished || 0) + nourishedBonus;
  if (nourishedUses > 0) {
    state.buffs.nourished = (state.buffs.nourished || 0) + nourishedUses;
  }
  advanceTime(10);
  const qualityNote = spent.length && qualityBonus > 0 ? ` The ${qualityLabelForItem(itemKey, bestQuality).toLowerCase()} quality made it especially nourishing.` : "";
  const buffNote = nourishedUses > 0 ? ` Nourished slows hunger and thirst for the next ${nourishedUses} labor actions.` : "";
  pushMessage(`You ate ${itemLabels[itemKey] || itemKey}; ${needReliefText(relief) || "needs steadied"}.${qualityNote}${buffNote}`);
  render();
  openModal("inventory");
}

function drinkWater(source = "well") {
  ensureNeeds();
  if (state.needs.thirst <= 2) {
    pushMessage("You are not thirsty right now.");
    return;
  }
  adjustNeeds({ thirst: -50, relaxation: -2 });
  markPrep("gatherWater");
  triggerSceneEffect(source === "well" ? "wash" : "hygiene");
  advanceTime(5);
  pushMessage(`Drank cool water from the ${source}. Thirst eased.`);
}

function tidyCottage() {
  if (!canDoLabor("tidy") || !spendStamina(4)) return;
  markPrep("tidyCottage");
  if (state.roomChores[state.currentScene]) {
    Object.keys(state.roomChores[state.currentScene]).forEach((chore) => {
      state.roomChores[state.currentScene][chore] = false;
    });
  }
  triggerSceneEffect("tidy");
  pushMessage("The cottage is tidy and peaceful.");
}

function cleanRoomChore(hotspot) {
  const { room, chore, effect = "tidy", message = "The room is tidied." } = hotspot;
  if (!state.roomChores[room]?.[chore]) {
    pushMessage("That area is already tidy.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(2, 10)) return;
  state.roomChores[room][chore] = false;
  state.dailyStats.choresCompleted += 1;
  if (room === "cabin") markPrep("tidyCottage");
  triggerSceneEffect(effect);
  pushMessage(message);
}

function washDishes() {
  if (!state.kitchenChores.dishes) {
    pushMessage("The dishes are already clean.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(2, 10)) return;
  state.kitchenChores.dishes = false;
  state.dailyStats.choresCompleted += 1;
  triggerSceneEffect("wash");
  pushMessage("The dishes are washed and set in order.");
}

function cleanCounters() {
  if (!state.kitchenChores.counters) {
    pushMessage("The counters are already clean.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(2, 10)) return;
  state.kitchenChores.counters = false;
  state.dailyStats.choresCompleted += 1;
  triggerSceneEffect("tidy");
  pushMessage("The counters are wiped clean.");
}

function sweepKitchen() {
  if (!state.kitchenChores.floor) {
    pushMessage("The kitchen floor is already tidy.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(3, 15)) return;
  state.kitchenChores.floor = false;
  state.dailyStats.choresCompleted += 1;
  triggerSceneEffect("tidy");
  pushMessage("The kitchen floor is swept and peaceful.");
}

function putToolsAway() {
  if (!canDoLabor("tidy") || !spendStamina(3)) return;
  markPrep("putToolsAway");
  pushMessage("Tools are put away for Sabbath preparation.");
}

function gatherWater() {
  const troughCapacity = barnAnimalCount();
  const troughShortfall = Math.max(0, troughCapacity - (state.barnWaterStore || 0));
  const householdExtra = 6;
  const total = troughShortfall + WATERING_CAN_CAPACITY + householdExtra;
  addItem("water", Math.max(12, total));
  const beforeCan = state.inventory.wateringCanWater || 0;
  if (state.tools.wateringCan) {
    state.inventory.wateringCanWater = WATERING_CAN_CAPACITY;
  }
  learnFrom("gathering");
  markPrep("gatherWater");
  advanceTime(15);
  state.dailyStats.waterGathered += 1;
  const canText = state.tools.wateringCan && beforeCan < WATERING_CAN_CAPACITY ? " Watering can topped off." : "";
  const troughText = troughShortfall > 0 ? ` Enough to fill the trough (${troughShortfall} needed) plus household surplus.` : " Trough already full; carrying extra for household use.";
  pushMessage(`Drew water from the well.${canText}${troughText}`);
}

function fillWaterJar() {
  addItem("water", 2);
  learnFrom("gathering");
  markPrep("gatherWater");
  advanceTime(10);
  pushMessage("Filled the water jar.");
}

function waterJar() {
  if (state.inventory.water <= 0) {
    pushMessage("The water jar is empty. Visit the well.");
    return;
  }
  markPrep("gatherWater");
  pushMessage("The water jar is ready for cooking and Sabbath preparation.");
}

function washLaundry() {
  if (!canDoLabor("laundry")) return;
  if ((state.inventory.water || 0) <= 0) {
    pushMessage("Gather water first, then wash laundry at the basin.");
    return;
  }
  if (!spendStamina(4)) return;
  state.inventory.water -= 1;
  state.buffs.cleanLaundry = Math.max(state.buffs.cleanLaundry || 0, 5);
  triggerSceneEffect("laundry");
  pushMessage("Laundry is washed and drying. Clean Laundry will boost the next five harvest or production yields.");
}

function batheInTub() {
  if (!canDoLabor("hygiene")) return;
  if ((state.inventory.water || 0) < 2) {
    pushMessage("Gather more water before drawing a bath.");
    return;
  }
  if (!spendStamina(2)) return;
  state.inventory.water -= 2;
  adjustNeeds({ hygiene: -75, relaxation: -18 });
  state.buffs.relaxed = Math.max(state.buffs.relaxed || 0, 4);
  triggerSceneEffect("hygiene");
  pushMessage("You bathed and feel relaxed. Hygiene and relaxation needs eased.");
}

function washHands() {
  if (!canDoLabor("hygiene")) return;
  if ((state.inventory.water || 0) <= 0) {
    pushMessage("Gather water before washing hands.");
    return;
  }
  state.inventory.water -= 1;
  adjustNeeds({ hygiene: -22 });
  state.buffs.cleanHands = Math.max(state.buffs.cleanHands || 0, 2);
  triggerSceneEffect("hygiene");
  advanceTime(5);
  pushMessage("Hands are washed clean. Clean Hands will improve upcoming cooking quality.");
}

function brushTeeth() {
  if (!canDoLabor("hygiene")) return;
  if ((state.inventory.water || 0) <= 0) {
    pushMessage("Gather water before brushing teeth.");
    return;
  }
  state.inventory.water -= 1;
  adjustNeeds({ hygiene: -28, relaxation: -3 });
  state.buffs.freshStart = Math.max(state.buffs.freshStart || 0, 3);
  triggerSceneEffect("hygiene");
  advanceTime(5);
  pushMessage("Teeth are brushed. Fresh Start will boost the next three harvest or production yields.");
}

function gatherHerbs() {
  if (!canDoLabor("gather") || !spendStamina(4)) return;
  const quality = improveQualityByLearning("standard", "gathering");
  addItem("herbs", 2, quality);
  learnFrom("gathering");
  markPrep("gatherHerbs");
  pushMessage(`Gathered ${QUALITY_LABELS[quality]} clean herbs. Herbal learning remains cautious and educational.`);
}

function compostArea() {
  if (!canDoLabor("compost") || !spendStamina(3)) return;
  addItem("plantMatter", 1);
  learnFrom("gathering");
  pushMessage("Collected clean plant matter for compost.");
}

function refillWateringCan() {
  if (!state.tools.wateringCan) {
    pushMessage("You need a watering can first.");
    return;
  }
  if ((state.inventory.water || 0) <= 0) {
    pushMessage("Gather water from the well before refilling the watering can.");
    return;
  }
  const needed = Math.max(0, WATERING_CAN_CAPACITY - (state.inventory.wateringCanWater || 0));
  if (!needed) {
    pushMessage("The watering can is already full.");
    return;
  }
  const amount = Math.min(needed, state.inventory.water);
  state.inventory.water -= amount;
  addItem("wateringCanWater", amount);
  pushMessage(`Refilled the watering can with ${amount} water.`);
}

function gatherHay(hotspot) {
  if (!canDoLabor("gather") || !spendStamina(hotspot.stamina)) return;
  addItem("hay", hotspot.amount);
  addItem("plantMatter", 1);
  learnFrom("gathering");
  state.dailyStats.hayGathered += 1;
  triggerSceneEffect("gather");
  pushMessage(`Gathered ${hotspot.amount} hay and some plant matter from the ${hotspot.source}.`);
}

function forestGather(hotspot) {
  if (!canDoLabor("gather") || !spendStamina(hotspot.stamina)) return;
  addItem(hotspot.resource, hotspot.amount);
  learnFrom("gathering");
  if (hotspot.prep) markPrep(hotspot.prep);
  pushMessage(`Gathered ${hotspot.amount} ${itemLabels[hotspot.resource]}.`);
}

function toolUsesLeft(tool) {
  if (!state.tools[tool]) return 0;
  if (!state.toolDurability) state.toolDurability = createToolDurability(state.tools);
  if (state.toolDurability[tool] === undefined) state.toolDurability[tool] = toolDurabilityMax[tool] || 0;
  const uses = Math.max(0, Math.min(toolDurabilityMax[tool] || 0, state.toolDurability[tool]));
  if (toolDurabilityMax[tool] && uses <= 0) state.tools[tool] = false;
  return uses;
}

function toolDurabilitySummary(tool) {
  const max = toolDurabilityMax[tool] || 0;
  const uses = toolUsesLeft(tool);
  const percent = max ? Math.round((uses / max) * 100) : 100;
  return `${percent}% durability, ${uses}/${max} use${max === 1 ? "" : "s"} left`;
}

function readyTool(tool) {
  state.tools[tool] = true;
  if (!state.toolDurability) state.toolDurability = createToolDurability(state.tools);
  if (toolDurabilityMax[tool]) state.toolDurability[tool] = toolDurabilityMax[tool];
}

function useDurableTool(tool, uses) {
  if (!state.tools[tool] || toolUsesLeft(tool) <= 0) {
    pushMessage(`You need a usable ${toolLabels[tool] || tool} first.`);
    return false;
  }
  if (toolUsesLeft(tool) < uses) {
    pushMessage(`${toolLabels[tool] || tool} only has ${toolUsesLeft(tool)} use${toolUsesLeft(tool) === 1 ? "" : "s"} left.`);
    return false;
  }
  state.toolDurability[tool] -= uses;
  if (state.toolDurability[tool] <= 0) {
    state.toolDurability[tool] = 0;
    state.tools[tool] = false;
  }
  return true;
}

function harvestHive() {
  if (!canDoLabor("harvest") || !spendStamina(4, 15)) return;
  const bonus = consumeProductionBuff();
  const quality = improveQualityByLearning("standard", "gathering");
  addItem("honey", 2 + bonus, quality);
  addItem("beeswax", 1, quality);
  learnFrom("gathering");
  triggerSceneEffect("harvest");
  pushMessage(`Harvested ${qualityLabelForItem("honey", quality).toLowerCase()} honey and ${QUALITY_LABELS[quality].toLowerCase()} beeswax from the hive.${bonus ? " Clean Laundry added 1 extra honey." : ""}`);
}

function chopSmallTree() {
  if (!state.tools.basicAxe) {
    pushMessage("You need an axe to chop this tree.");
    return;
  }
  harvestWoodWithAxe(2);
}

function harvestTrees() {
  if (!state.tools.basicAxe) {
    pushMessage("You need an axe to harvest trees.");
    return;
  }
  harvestWoodWithAxe(Math.min(3, toolUsesLeft("basicAxe")));
}

function openTreeHarvestModal(hotspot = null) {
  const uses = toolUsesLeft("basicAxe");
  const maxHarvest = Math.min(5, uses);
  const choices = [...new Set([1, 3, maxHarvest].filter((value) => value > 0))];
  openCustomModal("Tree Harvest", `<div class="card-grid">
    <article class="modal-card">
      <h3>Equipped Tool</h3>
      <p><strong>${state.tools.basicAxe ? toolLabels.basicAxe : "No axe equipped"}</strong></p>
      <p>${state.tools.basicAxe ? toolDurabilitySummary("basicAxe") : "Craft a Basic Axe at the workshed before harvesting trees."}</p>
    </article>
    <article class="modal-card">
      <h3>Harvest Wood</h3>
      <p>Each axe use gathers 2 wood. Every 2 uses also produces 1 log.</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${choices.map((count) => `<button type="button" data-modal-action="axe-${count}">Harvest ${count} use${count === 1 ? "" : "s"}</button>`).join("")}
        ${!choices.length ? `<button type="button" disabled>No axe uses left</button>` : ""}
      </div>
    </article>
  </div>`);
  bindModalActions(Object.fromEntries(choices.map((count) => [`axe-${count}`, () => harvestWoodWithAxe(count, hotspot)])));
}

function harvestWoodWithAxe(uses, hotspot = null) {
  uses = Math.max(1, Math.floor(Number(uses) || 1));
  if (!canDoLabor("chop")) return;
  if (!hasStamina(4 * uses)) return;
  if (!useDurableTool("basicAxe", uses)) return;
  spendStamina(4 * uses, 10 * uses);
  const bonus = consumeProductionBuff();
  addItem("wood", uses * 2 + bonus);
  const logs = Math.floor(uses / 2);
  if (logs) addItem("logs", logs);
  learnFrom("gathering");
  state.dailyStats.woodGathered += uses;
  triggerSceneEffect("woodHarvest", hotspotCenter(hotspot) || { x: 50, y: 46 });
  closeModal();
  const broken = !state.tools.basicAxe ? " The axe wore out." : "";
  pushMessage(`Used the basic axe ${uses} time${uses === 1 ? "" : "s"} and gathered ${uses * 2 + bonus} wood${logs ? ` and ${logs} log${logs === 1 ? "" : "s"}` : ""}.${bonus ? " Clean Laundry added 1 extra wood." : ""}${broken}`);
}

function stonePile() {
  if (!canDoLabor("mine")) return;
  if (state.tools.pickaxe) {
    harvestStoneWithPickaxe(1);
    return;
  }
  if (!spendStamina(5)) return;
  addItem("stone", 1);
  learnFrom("gathering");
  pushMessage("Picked up loose stones by hand. A pickaxe would gather more.");
}

function openStoneHarvestModal(hotspot = null) {
  const uses = toolUsesLeft("pickaxe");
  const maxHarvest = Math.min(5, uses);
  const choices = [...new Set([1, 3, maxHarvest].filter((value) => value > 0))];
  openCustomModal("Stone Harvest", `<div class="card-grid">
    <article class="modal-card">
      <h3>Equipped Tool</h3>
      <p><strong>${state.tools.pickaxe ? toolLabels.pickaxe : "No pickaxe equipped"}</strong></p>
      <p>${state.tools.pickaxe ? toolDurabilitySummary("pickaxe") : "Craft a Pickaxe at the workshed before quarrying stone."}</p>
    </article>
    <article class="modal-card">
      <h3>Harvest Stone</h3>
      <p>Each pickaxe use gathers 2 stone from the quarry.</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${choices.map((count) => `<button type="button" data-modal-action="pickaxe-${count}">Harvest ${count} use${count === 1 ? "" : "s"}</button>`).join("")}
        ${!choices.length ? `<button type="button" disabled>No pickaxe uses left</button>` : ""}
      </div>
    </article>
  </div>`);
  bindModalActions(Object.fromEntries(choices.map((count) => [`pickaxe-${count}`, () => harvestStoneWithPickaxe(count, hotspot)])));
}

function harvestStoneWithPickaxe(uses, hotspot = null) {
  uses = Math.max(1, Math.floor(Number(uses) || 1));
  if (!canDoLabor("mine")) return;
  if (!hasStamina(3 * uses)) return;
  if (!useDurableTool("pickaxe", uses)) return;
  spendStamina(3 * uses, 10 * uses);
  const amount = uses * 2;
  addItem("stone", amount);
  learnFrom("gathering");
  triggerSceneEffect("stoneHarvest", hotspotCenter(hotspot) || { x: 50, y: 54 });
  closeModal();
  const broken = !state.tools.pickaxe ? " The pickaxe wore out." : "";
  pushMessage(`Used the pickaxe ${uses} time${uses === 1 ? "" : "s"} and gathered ${amount} stone.${broken}`);
}

function hotspotCenter(hotspot) {
  if (!hotspot) return null;
  return { x: hotspot.x + hotspot.w / 2, y: hotspot.y + hotspot.h / 2 };
}

// ── Fishing Minigame ─────────────────────────────────────────────────────────

let mgFishPhase = "idle";
let mgFishTimer = null;
let mgFishWindowTimer = null;

function fishPond() {
  if (!state.tools.fishingPole && !state.tools.fishingNet) {
    pushMessage("You need a fishing pole or net to catch clean fish here.");
    return;
  }
  if (!canDoLabor("fish") || !spendStamina(state.tools.fishingNet ? 6 : 8)) return;
  mgFishPhase = "idle";
  clearTimeout(mgFishTimer);
  clearTimeout(mgFishWindowTimer);
  openCustomModal("Fishing at the Pond", mgFishingMarkup());
  document.getElementById("mgCastBtn").addEventListener("click", mgCast);
  document.getElementById("mgReelBtn").addEventListener("click", mgReel);
}

function mgFishingMarkup() {
  return `
    <div class="mg-fishing">
      <div class="mg-pond">
        <div class="mg-rod"></div>
        <div class="mg-line" id="mgLine"></div>
        <div class="mg-bobber" id="mgBobber">
          <div class="mg-bobber-top"></div>
          <div class="mg-bobber-bot"></div>
        </div>
        <div class="mg-ripple" id="mgRipple"></div>
      </div>
      <p class="hint-text mg-hint" id="mgFishHint">Click Cast Line to drop your line in the water.</p>
      <div class="mg-btns">
        <button type="button" id="mgCastBtn">Cast Line</button>
        <button type="button" id="mgReelBtn" class="mg-reel" disabled>Reel In!</button>
      </div>
    </div>`;
}

function mgCast() {
  if (mgFishPhase !== "idle") return;
  mgFishPhase = "waiting";
  document.getElementById("mgCastBtn").disabled = true;
  document.getElementById("mgLine").classList.add("visible");
  document.getElementById("mgBobber").classList.add("cast");
  document.getElementById("mgFishHint").textContent = "Waiting for a bite...";
  mgFishTimer = setTimeout(mgFishBite, 2200 + Math.random() * 2800);
}

function mgFishBite() {
  if (mgFishPhase !== "waiting") return;
  mgFishPhase = "bite";
  document.getElementById("mgBobber").classList.add("bite");
  document.getElementById("mgRipple").classList.add("active");
  document.getElementById("mgFishHint").textContent = "Fish on the line — reel it in!";
  const reelBtn = document.getElementById("mgReelBtn");
  reelBtn.disabled = false;
  reelBtn.classList.add("urgent");
  mgFishWindowTimer = setTimeout(mgFishEscape, 2200);
}

function mgReel() {
  if (mgFishPhase !== "bite") return;
  clearTimeout(mgFishWindowTimer);
  mgFishPhase = "done";
  const quality = improveQualityByLearning(state.tools.fishingNet ? "good" : "standard", "gathering");
  const bonus = consumeProductionBuff();
  const season = seasons[state.seasonIndex] || "Spring";
  const fishItem = season === "Autumn" ? "trout" : season === "Winter" ? "salmon" : "cleanFish";
  const fishName = season === "Autumn" ? "trout" : season === "Winter" ? "salmon" : "clean fish";
  const amount = (state.tools.fishingNet ? 2 : 1) + bonus;
  addItem(fishItem, amount, quality);
  learnFrom("gathering");
  state.dailyStats.fishCaught += 1;
  document.getElementById("mgBobber").classList.remove("bite");
  document.getElementById("mgBobber").classList.add("caught");
  document.getElementById("mgReelBtn").disabled = true;
  document.getElementById("mgReelBtn").classList.remove("urgent");
  document.getElementById("mgFishHint").textContent = `Caught ${amount} ${QUALITY_LABELS[quality]} ${fishName}!`;
  setTimeout(() => {
    closeModal();
    pushMessage(`Caught ${QUALITY_LABELS[quality]} ${fishName} from the pond, keeping only fish with fins and scales.${bonus ? " Clean Laundry added 1 extra." : ""}`);
    render();
  }, 1400);
}

function mgFishEscape() {
  if (mgFishPhase !== "bite") return;
  mgFishPhase = "done";
  const bobber = document.getElementById("mgBobber");
  if (bobber) { bobber.classList.remove("bite"); bobber.classList.add("escaped"); }
  const reelBtn = document.getElementById("mgReelBtn");
  if (reelBtn) { reelBtn.disabled = true; reelBtn.classList.remove("urgent"); }
  const hint = document.getElementById("mgFishHint");
  if (hint) hint.textContent = "The fish got away. Try again.";
  setTimeout(() => {
    closeModal();
    pushMessage("The fish got away. Better luck next time.");
    render();
  }, 1400);
}

// ── Hunting Minigame ─────────────────────────────────────────────────────────

let mgHuntActive = false;
let mgHuntRaf = null;
let mgHuntPos = 20;
let mgHuntDir = 1;
let mgHuntSpeed = 1.0;

function huntDeer() {
  if (!state.tools.bow) {
    pushMessage("You need a bow to hunt deer.");
    return;
  }
  if ((state.inventory.arrows || 0) <= 0) {
    pushMessage("You need arrows for the bow.");
    return;
  }
  if (!canDoLabor("hunt") || !spendStamina(14)) return;
  mgHuntActive = false;
  cancelAnimationFrame(mgHuntRaf);
  mgHuntPos = 20;
  mgHuntDir = 1;
  openCustomModal("Hunting in the Forest", mgHuntingMarkup());
  document.getElementById("mgDrawBtn").addEventListener("click", mgDrawBow);
  document.getElementById("mgShootBtn").addEventListener("click", mgShoot);
}

function mgHuntingMarkup() {
  return `
    <div class="mg-hunting">
      <div class="mg-forest">
        <div class="mg-tree mg-tree-l"></div>
        <div class="mg-tree mg-tree-r"></div>
        <div class="mg-tree mg-tree-lm"></div>
        <div class="mg-tree mg-tree-rm"></div>
        <div class="mg-deer" id="mgDeer">
          <svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg" width="70" height="60">
            <ellipse cx="32" cy="38" rx="22" ry="12" fill="#0d140d"/>
            <rect x="48" y="27" width="9" height="15" rx="4" fill="#0d140d"/>
            <ellipse cx="54" cy="23" rx="9" ry="7" fill="#0d140d"/>
            <rect x="14" y="48" width="5" height="15" rx="2" fill="#0d140d"/>
            <rect x="24" y="48" width="5" height="15" rx="2" fill="#0d140d"/>
            <rect x="37" y="48" width="5" height="14" rx="2" fill="#0d140d"/>
            <rect x="46" y="47" width="5" height="14" rx="2" fill="#0d140d"/>
            <path d="M50 17 L47 7 M47 7 L43 2 M47 7 L50 3 M57 16 L60 6 M60 6 L57 2 M60 6 L64 3" stroke="#0d140d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <p class="hint-text mg-hint" id="mgHuntHint">Draw your bow, then release when the marker enters the green zone.</p>
      <div class="mg-aim-wrap" id="mgAimWrap" style="display:none">
        <div class="mg-aim-bar">
          <div class="mg-aim-zone"></div>
          <div class="mg-aim-cursor" id="mgAimCursor"></div>
        </div>
        <div class="mg-aim-labels">
          <span>wide</span><span>target zone</span><span>wide</span>
        </div>
      </div>
      <div class="mg-btns">
        <button type="button" id="mgDrawBtn">Draw Bow</button>
        <button type="button" id="mgShootBtn" disabled>Release!</button>
      </div>
    </div>`;
}

function mgDrawBow() {
  const drawBtn = document.getElementById("mgDrawBtn");
  if (drawBtn) drawBtn.disabled = true;
  const shootBtn = document.getElementById("mgShootBtn");
  if (shootBtn) shootBtn.disabled = false;
  const aimWrap = document.getElementById("mgAimWrap");
  if (aimWrap) aimWrap.style.display = "block";
  document.getElementById("mgHuntHint").textContent = "Steady... release when the marker is in the green zone.";
  const gatherStage = Math.floor((state.skills?.gathering || 0) / 20);
  mgHuntSpeed = Math.max(0.3, 1.15 - gatherStage * 0.16);
  mgHuntPos = 20;
  mgHuntDir = 1;
  mgHuntActive = true;
  mgAnimateAim();
}

function mgAnimateAim() {
  if (!mgHuntActive) return;
  const cursor = document.getElementById("mgAimCursor");
  if (!cursor) { mgHuntActive = false; return; }
  mgHuntPos += mgHuntDir * mgHuntSpeed;
  if (mgHuntPos >= 100) { mgHuntPos = 100; mgHuntDir = -1; }
  if (mgHuntPos <= 0)   { mgHuntPos = 0;   mgHuntDir = 1; }
  cursor.style.left = `${mgHuntPos}%`;
  mgHuntRaf = requestAnimationFrame(mgAnimateAim);
}

function mgShoot() {
  if (!mgHuntActive) return;
  mgHuntActive = false;
  cancelAnimationFrame(mgHuntRaf);
  const shootBtn = document.getElementById("mgShootBtn");
  if (shootBtn) shootBtn.disabled = true;
  spendQualityItem("arrows", 1);
  state.inventory.arrows -= 1;
  const hit = mgHuntPos >= 35 && mgHuntPos <= 65;
  const forest = document.querySelector(".mg-forest");
  if (forest) {
    const flash = document.createElement("div");
    flash.className = "mg-arrow-flash";
    forest.appendChild(flash);
  }
  if (hit) {
    const quality = improveQualityByLearning("good", "gathering");
    const bonus = consumeProductionBuff();
    addItem("venison", 2 + bonus, quality);
    addItem("hide", 1);
    addItem("fur", 1);
    learnFrom("gathering");
    state.dailyStats.deerHunted += 1;
    document.getElementById("mgHuntHint").textContent = "Clean shot. Wild game taken with care.";
    document.getElementById("mgDeer")?.classList.add("mg-deer-hit");
    setTimeout(() => {
      closeModal();
      pushMessage(`Harvested clean wild game: ${QUALITY_LABELS[quality]} venison, hide, and fur were added.${bonus ? " Clean Laundry added 1 extra venison." : ""}`);
      render();
    }, 1500);
  } else {
    document.getElementById("mgHuntHint").textContent = "The shot went wide. The deer bolted into the trees.";
    document.getElementById("mgDeer")?.classList.add("mg-deer-flee");
    setTimeout(() => {
      closeModal();
      pushMessage("The shot went wide. Arrow used — the deer got away.");
      render();
    }, 1500);
  }
}

function setAsideSabbathBasket() {
  if (!state.tools.sabbathBasket) {
    pushMessage("Craft a Sabbath Basket first at the workshed.");
    return;
  }
  if (state.inventory.preparedFood < 1 || state.inventory.water < 1 || state.inventory.herbs < 1) {
    pushMessage("Set aside prepared food, water, and herbs for the Sabbath basket.");
    return;
  }
  spendItem("preparedFood", 1);
  state.inventory.water -= 1;
  spendItem("herbs", 1);
  markPrep("sabbathBasket");
  pushMessage("The Sabbath basket is set aside.");
}

function sabbathReflection() {
  state.journalUnlocked.shalomRest = true;
  openModal("journal", "Sabbath Reflection");
  activeJournalId = "sabbathPrep";
  pushMessage("Opened Sabbath reflection in the journal.");
}

function enterSabbathRest() {
  if (!isPreparationDay()) {
    pushMessage("Enter Sabbath Rest becomes available on Preparation Day.");
    return;
  }
  if (!allPrepComplete()) {
    pushMessage("Finish the Sabbath preparation checklist first.");
    return;
  }
  state.isSabbathRest = true;
  state.currentScene = "sabbath";
  state.minute = 18 * 60;
  pushMessage("Sabbath rest begins. Ordinary labor pauses; delight and restoration remain.");
}

function endSabbathRest() {
  if (!isSabbath()) {
    pushMessage("Sabbath rest is not currently active.");
    return;
  }
  nextDay();
}

function sabbathWorshipAction() {
  if (!isSabbath()) {
    pushMessage("This celebration is for the Sabbath day.");
    return;
  }
  if (state.sabbathActivities?.worshipped) {
    pushMessage("You have already worshipped today. Rest in the delight of Sabbath.");
    return;
  }
  state.sabbathActivities = state.sabbathActivities || {};
  state.sabbathActivities.worshipped = true;
  triggerSceneEffect("sabbathWorship");
  render();
  pushMessage("Singing and celebration fill the Sabbath with praise. The day closes in gratitude.");
  setTimeout(() => { nextDay(); }, 2800);
}

function sabbathStrollAction() {
  if (!isSabbath()) {
    pushMessage("This peaceful stroll is for the Sabbath day.");
    return;
  }
  if (state.sabbathActivities?.strolled) {
    pushMessage("You have already taken your Sabbath stroll today.");
    return;
  }
  state.sabbathActivities = state.sabbathActivities || {};
  state.sabbathActivities.strolled = true;
  state.restedBuffDays = 1;
  state.currentScene = "forest";
  advanceTime(45);
  pushMessage("A quiet Sabbath stroll through the forest. The trees and birdsong are a gentle delight. A rested spirit carries into tomorrow.");
}

function sabbathGatheringAction() {
  if (!isSabbath()) {
    pushMessage("A Sabbath gathering is only for the Sabbath day.");
    return;
  }
  const canHost = (state.inventory.preparedFood || 0) >= 1 && (state.inventory.herbs || 0) >= 1;
  openCustomModal("Host a Gathering", `
    <div class="card-grid">
      <article class="modal-card">
        <h3>Sabbath Gathering</h3>
        <p>Welcome neighbors for fellowship, song, and a shared clean table. Costs 1 prepared food and 1 herbs.</p>
        <button type="button" data-modal-action="host gathering" ${!canHost || state.sabbathActivities?.gathered ? "disabled" : ""}>Host Gathering</button>
        ${state.sabbathActivities?.gathered ? "<p class='hint-text'>The gathering has already been held today.</p>" : ""}
      </article>
    </div>
  `);
  bindModalActions({ "host gathering": () => hostSabbathGathering() });
}

function hostSabbathGathering() {
  if ((state.inventory.preparedFood || 0) < 1 || (state.inventory.herbs || 0) < 1) {
    pushMessage("You need 1 prepared food and 1 herbs to host a gathering.");
    return;
  }
  if (state.sabbathActivities?.gathered) {
    pushMessage("The gathering has already been held this Sabbath.");
    return;
  }
  spendItem("preparedFood", 1);
  spendItem("herbs", 1);
  state.sabbathActivities = state.sabbathActivities || {};
  state.sabbathActivities.gathered = true;
  state.restedBuffDays = 2;
  closeModal();
  triggerSceneEffect("sabbathWorship");
  advanceTime(90);
  pushMessage("A joyful gathering fills the homestead with song, fellowship, and gratitude. Your spirit is lifted. Well-rested buff extended.");
}

function generateCommunityOrders() {
  expireCommunityOrders();
  if ((state.communityOrders || []).length >= MAX_COMMUNITY_ORDERS) return;
  if (!state.communityOrders) state.communityOrders = [];
  if (!state.nextOrderId) state.nextOrderId = 1;
  const usedTemplates = new Set(state.communityOrders.map((o) => o.tpl));
  const available = ORDER_POOL.filter((t) => !usedTemplates.has(t.tpl));
  if (!available.length) return;
  const newCount = Math.min(2, MAX_COMMUNITY_ORDERS - state.communityOrders.length);
  for (let i = 0; i < newCount && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    const tpl = available.splice(idx, 1)[0];
    state.communityOrders.push({ id: state.nextOrderId++, tpl: tpl.tpl, label: tpl.label, items: tpl.items, reward: tpl.reward, dueDay: state.day + tpl.days });
  }
}

function expireCommunityOrders() {
  if (!state.communityOrders) return;
  const before = state.communityOrders.length;
  state.communityOrders = state.communityOrders.filter((o) => o.dueDay >= state.day);
  if (state.communityOrders.length < before) pushMessage("Some community orders have expired.");
}

function fulfillCommunityOrder(id) {
  const order = (state.communityOrders || []).find((o) => o.id === id);
  if (!order) return;
  if (!hasIngredients(order.items)) {
    const needed = Object.entries(order.items).map(([k, v]) => `${v} ${itemLabels[k] || k}`).join(", ");
    pushMessage(`Still need: ${needed}`);
    openModal("orders");
    return;
  }
  spendIngredients(order.items);
  addItem("coins", order.reward);
  state.communityOrders = state.communityOrders.filter((o) => o.id !== id);
  state.dailyStats.ordersFilled += 1;
  state.dailyStats.coinsEarned += order.reward;
  pushMessage(`Order filled: "${order.label}". Received ${order.reward} coins!`);
  saveGame(false);
  render();
  openModal("orders");
}

function communityOrdersMarkup() {
  if (!state.communityOrders) state.communityOrders = [];
  if (!state.communityOrders.length) {
    return `<p>No community orders right now. Check back tomorrow — new requests arrive each day.</p>`;
  }
  const cards = state.communityOrders.map((order) => {
    const needed = Object.entries(order.items).map(([k, v]) => `${v} ${itemLabels[k] || k}`).join(", ");
    const canFill = hasIngredients(order.items);
    const daysLeft = order.dueDay - state.day;
    const urgency = daysLeft <= 1 ? " — <strong>Due tomorrow!</strong>" : ` — ${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
    return `<article class="modal-card">
      <h3>${order.label}</h3>
      <p>Needs: ${needed}</p>
      <p>Reward: ${order.reward} coins${urgency}</p>
      <button type="button" data-fill-order="${order.id}" ${!canFill || isSabbath() ? "disabled" : ""}>${canFill ? "Fill Order" : "Missing items"}</button>
    </article>`;
  }).join("");
  return `<div class="card-grid">${cards}</div><p class="hint-text">Fill orders by delivering requested clean goods for coins. New requests arrive each morning.</p>`;
}

function openAnimalModal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!catalog || !group) return;
  const ailmentCard = group.ailment
    ? `<article class="modal-card">
        <h3>Animal Health</h3>
        <p><strong>Ailment:</strong> ${group.ailment.label}</p>
        <p class="hint-text">${group.ailment.note}</p>
        <p>Remedy needed: <strong>${itemLabels[group.ailment.remedy]}</strong> (have: ${state.inventory[group.ailment.remedy] || 0})</p>
        <button type="button" data-treat-animal="${animalId}" ${(state.inventory[group.ailment.remedy] || 0) <= 0 || !canPreviewLabor("animalCare") ? "disabled" : ""}>Apply Remedy</button>
      </article>`
    : `<article class="modal-card">
        <h3>Animal Health</h3>
        <p>The ${catalog.name.toLowerCase()} appear healthy. Faithful daily feeding, watering, and cleaning helps prevent ailments.</p>
      </article>`;
  const breedingCard = group.breeding
    ? `<article class="modal-card">
        <h3>Breeding</h3>
        <p>A new ${catalog.singular.toLowerCase()} is expected in <strong>${group.breeding.daysLeft} day${group.breeding.daysLeft === 1 ? "" : "s"}</strong>.</p>
      </article>`
    : buttonCard("Breed", `Requires 2+ ${catalog.name.toLowerCase()} and 1 feed. A new ${catalog.singular.toLowerCase()} arrives in ${catalog.gestationDays} days.`, () => breedAnimals(animalId), group.count < 2 || !!group.breeding || (state.inventory.feed || 0) < 1 || isSabbath());
  const cards = [
    `<article class="modal-card">
      <h3>${catalog.name}</h3>
      <p><strong>Owned:</strong> ${group.count}</p>
      <p><strong>Status:</strong> ${animalStatus(group)}</p>
      <p>${catalog.cleanNote}</p>
    </article>`,
    ailmentCard,
    buttonCard("Feed", `Uses ${catalog.feedNeed} from the feed area (${state.barnFeedStore || 0} available). Stock the feed area in the barn first.`, () => feedAnimal(animalId), group.count <= 0 || (state.barnFeedStore || 0) < catalog.feedNeed),
    buttonCard("Clean", "Clean the stall and keep the animals healthy.", () => cleanAnimal(animalId), group.count <= 0),
    buttonCard(catalog.productLabel, animalProductText(catalog), () => collectAnimalProduct(animalId), group.count <= 0 || !!group.ailment || group.productCollectedToday || !animalProductToolReady(catalog) || isSabbath()),
    animalId === "chickens" ? buttonCard("Collect Feathers", "Gather loose feathers for arrow crafting.", () => collectChickenFeathers(), group.count <= 0 || group.feathersCollectedToday || isSabbath()) : "",
    buttonCard("Harvest", `Harvest one ${catalog.singular.toLowerCase()} for clean meat and useful materials. This is never available on Sabbath.`, () => harvestAnimal(animalId), group.count <= 0 || !canPreviewLabor("harvest")),
    breedingCard
  ];
  openCustomModal(catalog.name, `<div class="card-grid">${cards.join("")}</div>`);
  document.querySelectorAll("[data-treat-animal]").forEach((btn) => {
    btn.addEventListener("click", () => treatAnimal(btn.dataset.treatAnimal));
  });
  bindModalActions({
    feed: () => feedAnimal(animalId),
    clean: () => cleanAnimal(animalId),
    [catalog.productLabel.toLowerCase()]: () => collectAnimalProduct(animalId),
    "collect feathers": () => collectChickenFeathers(),
    harvest: () => harvestAnimal(animalId),
    breed: () => breedAnimals(animalId)
  });
}

function animalStatus(group) {
  const parts = [
    group.fedToday ? "fed" : "needs feed",
    group.wateredToday ? "watered" : "needs water",
    group.cleanedToday ? "clean" : "needs cleaning",
    group.productCollectedToday ? "product collected" : "product available if fed"
  ];
  if (group.ailment) parts.push(`unwell: ${group.ailment.label.toLowerCase()}`);
  return parts.join(", ");
}

function treatAnimal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group || !group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()}.`);
    return;
  }
  if (!group.ailment) {
    pushMessage(`The ${catalog.name.toLowerCase()} are not showing any ailment right now.`);
    return;
  }
  const remedyId = group.ailment.remedy;
  if ((state.inventory[remedyId] || 0) <= 0) {
    pushMessage(`You need ${itemLabels[remedyId] || remedyId} to treat the ${catalog.name.toLowerCase()}.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  const spentRemedy = spendQualityItem(remedyId, 1);
  const remedyQuality = bestSpentQuality(spentRemedy);
  state.inventory[remedyId] -= 1;
  const ailmentLabel = group.ailment.label;
  group.ailment = null;
  learnFrom("animalCare");
  state.dailyStats.animalsTreated += 1;
  closeModal();
  const qualityText = spentRemedy.length ? `${qualityLabelForItem(remedyId, remedyQuality).toLowerCase()} ` : "";
  pushMessage(`Applied ${qualityText}${itemLabels[remedyId]} to the ${catalog.name.toLowerCase()}. The ${ailmentLabel.toLowerCase()} has cleared. They should produce normally tomorrow.`);
}

function breedAnimals(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!catalog || !group) return;
  if (group.count < 2) { pushMessage(`Need at least 2 ${catalog.name.toLowerCase()} to breed.`); return; }
  if (group.breeding) { pushMessage(`Already expecting a new ${catalog.singular.toLowerCase()}.`); return; }
  if ((state.inventory.feed || 0) < 1) { pushMessage("Breeding requires 1 feed."); return; }
  if (!canDoLabor("animalCare") || !spendStamina(2)) return;
  state.inventory.feed -= 1;
  group.breeding = { daysLeft: catalog.gestationDays };
  learnFrom("animalCare");
  closeModal();
  pushMessage(`The ${catalog.name.toLowerCase()} are settled for breeding. A new ${catalog.singular.toLowerCase()} is expected in ${catalog.gestationDays} days.`);
}

function animalProductText(catalog) {
  const toolText = catalog.productTool ? ` Requires ${toolLabels[catalog.productTool]}.` : "";
  return `Gather ${itemLabels[catalog.product]} from fed and watered animals.${toolText}`;
}

function animalProductToolReady(catalog) {
  return !catalog.productTool || state.tools[catalog.productTool];
}

function hasAnimalFeed(amount) {
  return (state.inventory.feed || 0) >= amount || (state.inventory.hay || 0) >= amount;
}

function spendAnimalFeed(amount) {
  const feedUsed = Math.min(state.inventory.feed || 0, amount);
  spendQualityItem("feed", feedUsed);
  state.inventory.feed -= feedUsed;
  const remaining = amount - feedUsed;
  if (remaining > 0) {
    spendQualityItem("hay", remaining);
    state.inventory.hay -= remaining;
  }
}

function feedAnimal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()} yet.`);
    return;
  }
  if ((state.barnFeedStore || 0) < catalog.feedNeed) {
    pushMessage(`The feed area holds ${state.barnFeedStore || 0} units. Stock it with at least ${catalog.feedNeed} to feed the ${catalog.name.toLowerCase()}.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(2)) return;
  state.barnFeedStore -= catalog.feedNeed;
  group.fedToday = true;
  learnFrom("animalCare");
  state.dailyStats.animalGroupsCared += 1;
  triggerSceneEffect("barnFeed");
  closeModal();
  pushMessage(`${catalog.name} are fed.`);
}

function cleanAnimal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()} yet.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  group.cleanedToday = true;
  learnFrom("animalCare");
  triggerSceneEffect("tidy");
  closeModal();
  pushMessage(`${catalog.name} area cleaned.`);
}

function collectAnimalProduct(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()} yet.`);
    return;
  }
  if (group.ailment) {
    pushMessage(`The ${catalog.name.toLowerCase()} are unwell with ${group.ailment.label.toLowerCase()}. ${group.ailment.note} Apply a remedy before gathering from them.`);
    return;
  }
  if (!group.fedToday) {
    pushMessage(`Feed the ${catalog.name.toLowerCase()} before gathering from them.`);
    return;
  }
  if (!group.wateredToday) {
    pushMessage(`Water the ${catalog.name.toLowerCase()} before gathering from them.`);
    return;
  }
  if (group.productCollectedToday) {
    pushMessage(`${catalog.name} have already been gathered from today.`);
    return;
  }
  if (!animalProductToolReady(catalog)) {
    pushMessage(`You need ${toolLabels[catalog.productTool]} first.`);
    return;
  }
  if (!canDoLabor("animalProduct") || !spendStamina(4)) return;
  const quality = improveQualityByLearning(group.cleanedToday ? "good" : "standard", "animalCare");
  const bonus = consumeProductionBuff();
  addItem(catalog.product, Math.max(1, group.count * catalog.productAmount) + bonus, quality);
  group.productCollectedToday = true;
  learnFrom("animalCare");
  state.dailyStats.animalProductsCollected += 1;
  triggerSceneEffect("barnCollect");
  closeModal();
  pushMessage(`${catalog.productLabel} complete: ${QUALITY_LABELS[quality]} ${itemLabels[catalog.product]} added.${bonus ? " Clean Laundry added 1 extra." : ""}`);
}

function collectChickenFeathers() {
  const group = state.barnAnimals.chickens;
  if (!group.count) {
    pushMessage("You do not own any chickens yet.");
    return;
  }
  if (group.feathersCollectedToday) {
    pushMessage("Loose feathers have already been gathered today.");
    return;
  }
  if (!canDoLabor("animalProduct") || !spendStamina(2)) return;
  addItem("feathers", Math.max(1, group.count));
  group.feathersCollectedToday = true;
  learnFrom("animalCare");
  triggerSceneEffect("barnFeathers");
  closeModal();
  pushMessage("Gathered loose chicken feathers for crafting.");
}

function harvestAnimal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()} yet.`);
    return;
  }
  if (!canDoLabor("animalHarvest") || !spendStamina(10)) return;
  group.count -= 1;
  const baseQuality = group.fedToday && group.wateredToday && group.cleanedToday ? "excellent" : group.fedToday || group.wateredToday ? "good" : "standard";
  const quality = improveQualityByLearning(baseQuality, "animalCare");
  const bonus = consumeProductionBuff();
  addItem(catalog.meatItem, catalog.meatAmount + bonus, quality);
  if (catalog.secondaryItem) addItem(catalog.secondaryItem, catalog.secondaryAmount);
  learnFrom("animalCare");
  triggerSceneEffect("barnHarvest");
  closeModal();
  pushMessage(`Harvested one ${catalog.singular.toLowerCase()} with care. ${QUALITY_LABELS[quality]} clean meat was prepared without blood.${bonus ? " Clean Laundry added 1 extra meat." : ""}`);
}

function openBarnCareModal() {
  const totalAnimals = barnAnimalCount();
  const neededFeed = Object.entries(animalCatalog).reduce((sum, [id, catalog]) => {
    return sum + ((state.barnAnimals[id]?.count || 0) > 0 ? catalog.feedNeed : 0);
  }, 0);
  const feedStore = state.barnFeedStore || 0;
  const waterStore = state.barnWaterStore || 0;
  const waterNeed = barnWaterNeed();
  const invFeed = (state.inventory.hay || 0) + (state.inventory.feed || 0);
  openCustomModal("Barn Care", `<div class="card-grid">
    <article class="modal-card">
      <h3>Stock Feed Area</h3>
      <p>Feed store: <strong>${feedStore}</strong> units. Inventory: ${invFeed} hay/feed.</p>
      <button type="button" data-modal-action="addfeed" ${invFeed > 0 ? "" : "disabled"}>Stock Feed Area</button>
    </article>
    <article class="modal-card">
      <h3>Feed Animals</h3>
      <p>Needs ${neededFeed} from the feed store (${feedStore} available).</p>
      <button type="button" data-modal-action="feedanimals" ${totalAnimals > 0 && feedStore >= neededFeed ? "" : "disabled"}>Feed All Animals</button>
    </article>
    <article class="modal-card">
      <h3>Fill Water Trough</h3>
      <p>Trough: <strong>${waterStore}/${totalAnimals || 0}</strong>. Inventory: ${state.inventory.water || 0} water. Filling waters animals automatically when enough is available.</p>
      <button type="button" data-modal-action="filltrough" ${totalAnimals > 0 && ((state.inventory.water || 0) > 0 || waterStore >= waterNeed) ? "" : "disabled"}>Fill Water Trough</button>
    </article>
    <article class="modal-card">
      <h3>Water Animals</h3>
      <p>Needs ${waterNeed} from the water trough (${waterStore} available).</p>
      <button type="button" data-modal-action="wateranimals" ${waterNeed > 0 && waterStore >= waterNeed ? "" : "disabled"}>Water All Animals</button>
    </article>
    <article class="modal-card">
      <h3>Clean Barn</h3>
      <p>Collect manure for fertilizer while tidying the barn.</p>
      <button type="button" data-modal-action="cleanbarn" ${totalAnimals > 0 ? "" : "disabled"}>Clean Barn</button>
    </article>
  </div>`);
  bindModalActions({ addfeed: addFeedTrough, feedanimals: feedAllAnimals, filltrough: addWaterTrough, wateranimals: waterBarnAnimals, cleanbarn: cleanBarnForManure });
}

function openAnimalMaintenanceModal() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, g) => sum + g.count, 0);
  const neededFeed = Object.entries(animalCatalog).reduce((sum, [id, cat]) => {
    return sum + ((state.barnAnimals[id]?.count || 0) > 0 ? cat.feedNeed : 0);
  }, 0);
  const feedStore = state.barnFeedStore || 0;
  const waterStore = state.barnWaterStore || 0;
  const canFeedAll = totalAnimals > 0 && feedStore >= neededFeed;
  const canWaterAll = totalAnimals > 0 && waterStore >= totalAnimals;

  const perAnimalCards = Object.entries(animalCatalog).map(([id, catalog]) => {
    const group = state.barnAnimals[id];
    if (!group || group.count === 0) return "";
    const ailmentNote = group.ailment
      ? `<p class="hint-text" style="color:var(--danger)">Unwell: ${group.ailment.label}</p>`
      : "";
    const canFeedThis = feedStore >= catalog.feedNeed && !group.fedToday;
    const canCollect = group.count > 0 && !group.ailment && !group.productCollectedToday && animalProductToolReady(catalog) && !isSabbath();
    const featherBtn = id === "chickens"
      ? `<button type="button" data-modal-action="feathers-${id}" ${group.feathersCollectedToday || isSabbath() ? "disabled" : ""}>Feathers</button>`
      : "";
    return `<article class="modal-card">
      <h3>${catalog.name} <small>(${group.count})</small></h3>
      <p>${animalStatus(group)}</p>
      ${ailmentNote}
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">
        <button type="button" data-modal-action="feed-${id}" ${canFeedThis ? "" : "disabled"}>Feed</button>
        <button type="button" data-modal-action="collect-${id}" ${canCollect ? "" : "disabled"}>${catalog.productLabel}</button>
        ${featherBtn}
      </div>
    </article>`;
  }).filter(Boolean).join("");

  openCustomModal("Animal Maintenance", `<div class="card-grid">
    <article class="modal-card">
      <h3>Bulk Care</h3>
      <p>Feed store: <strong>${feedStore}</strong> &nbsp;|&nbsp; Water trough: <strong>${waterStore}</strong></p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">
        <button type="button" data-modal-action="feed-all" ${canFeedAll ? "" : "disabled"}>Feed All</button>
        <button type="button" data-modal-action="water-all" ${canWaterAll ? "" : "disabled"}>Water All</button>
        <button type="button" data-modal-action="clean-all" ${totalAnimals > 0 ? "" : "disabled"}>Clean All</button>
      </div>
    </article>
    ${perAnimalCards || `<article class="modal-card"><h3>No Animals</h3><p>Purchase animals from the Animal Market to begin care.</p></article>`}
  </div>`);

  const actionMap = {
    "feed-all": () => { feedAllAnimals(); openAnimalMaintenanceModal(); },
    "water-all": () => { waterBarnAnimals(); openAnimalMaintenanceModal(); },
    "clean-all": () => { cleanBarnForManure(); openAnimalMaintenanceModal(); }
  };
  Object.keys(animalCatalog).forEach((id) => {
    actionMap[`feed-${id}`] = () => { feedAnimal(id); openAnimalMaintenanceModal(); };
    actionMap[`collect-${id}`] = () => { collectAnimalProduct(id); openAnimalMaintenanceModal(); };
    actionMap[`feathers-${id}`] = () => { collectChickenFeathers(); openAnimalMaintenanceModal(); };
  });
  bindModalActions(actionMap);
}

// ── Homestead Maintenance Panel ───────────────────────────────────────

const HM_ANIMAL_ICONS = {
  chickens: '<img class="hm-icon-lg" src="assets/images/icons/animal-chicken.svg" alt="Chickens">',
  cattle:   '<img class="hm-icon-lg" src="assets/images/icons/animal-cattle.svg" alt="Cattle">',
  sheep:    '<img class="hm-icon-lg" src="assets/images/icons/animal-sheep.svg" alt="Sheep">',
  goats:    '<img class="hm-icon-lg" src="assets/images/icons/animal-goats.svg" alt="Goats">',
};
const HM_CROP_ICONS = {
  grain:     '<img class="hm-icon-sm" src="assets/images/icons/crop-grain.svg" alt="">',
  legume:    '<img class="hm-icon-sm" src="assets/images/icons/crop-legume.svg" alt="">',
  vegetable: '<img class="hm-icon-sm" src="assets/images/icons/crop-vegetable.svg" alt="">',
  herb:      '<img class="hm-icon-sm" src="assets/images/icons/crop-herb.svg" alt="">',
  fruit:     '<img class="hm-icon-sm" src="assets/images/icons/crop-fruit.svg" alt="">',
};

function openHomesteadMaintenanceModal(activeTab = "animals") {
  const tabs = ["animals", "garden", "inventory", "supply"];
  const tabLabels = {
    animals:   '<img class="hm-tab-icon" src="assets/images/icons/tab-animals.svg" alt=""> Animals',
    garden:    '<img class="hm-tab-icon" src="assets/images/icons/tab-garden.svg" alt=""> Garden',
    inventory: '<img class="hm-tab-icon" src="assets/images/icons/tab-inventory.svg" alt=""> Inventory',
    supply:    '<img class="hm-tab-icon" src="assets/images/icons/tab-supply.svg" alt=""> Craft & Supply',
  };
  const tabsHTML = tabs.map((t) =>
    `<button class="hm-tab${t === activeTab ? " active" : ""}" data-hm-tab="${t}">${tabLabels[t]}</button>`
  ).join("");
  const contentsHTML = tabs.map((t) =>
    `<div class="hm-tab-content${t === activeTab ? " active" : ""}" id="hm-${t}">${hmBuildTab(t)}</div>`
  ).join("");
  openCustomModal("Homestead Maintenance", `<div class="hm-tabs">${tabsHTML}</div>${contentsHTML}`);
  const hmPanel = document.querySelector(".modal-panel");
  hmPanel.classList.add("hm-modal");
  ["tl", "tr", "bl", "br"].forEach((pos) => {
    const s = document.createElement("span");
    s.className = `hm-corner hm-corner-${pos}`;
    s.setAttribute("aria-hidden", "true");
    hmPanel.appendChild(s);
  });
  bindHomesteadMaintenance();
}

function hmBuildTab(tab) {
  if (tab === "animals")   return hmAnimalsTab();
  if (tab === "garden")    return hmGardenTab();
  if (tab === "inventory") return hmInventoryTab();
  if (tab === "supply")    return hmSupplyTab();
  return "";
}

function hmAnimalsTab() {
  const totalAnimals = barnAnimalCount();
  const neededFeed = Object.entries(animalCatalog).reduce((s, [id, c]) => s + ((state.barnAnimals[id]?.count || 0) > 0 ? c.feedNeed : 0), 0);
  const feedStore  = state.barnFeedStore  || 0;
  const waterStore = state.barnWaterStore || 0;
  const waterNeed  = barnWaterNeed();
  const invFeed    = (state.inventory.hay || 0) + (state.inventory.feed || 0);
  const invWater   = state.inventory.water || 0;
  const canFeedAll = totalAnimals > 0 && feedStore >= neededFeed;
  const canWaterAll= waterNeed > 0 && waterStore >= waterNeed;

  const resourceBar = `<div class="hm-resource-bar">
    <div class="hm-res"><span class="hm-res-label">🌾 Feed store</span><span class="hm-res-val">${feedStore}</span></div>
    <div class="hm-res"><span class="hm-res-label">💧 Water trough</span><span class="hm-res-val">${waterStore}</span></div>
    <div class="hm-res"><span class="hm-res-label">📦 Inv. hay/feed</span><span class="hm-res-val">${invFeed}</span></div>
    <div class="hm-res"><span class="hm-res-label">💰 Coins</span><span class="hm-res-val">${state.inventory.coins || 0}</span></div>
  </div>`;

  const bulkActions = `<div class="hm-actions">
    <button type="button" data-hm-action="stock-feed"  ${invFeed   > 0           ? "" : "disabled"}>🌾 Stock Feed</button>
    <button type="button" data-hm-action="fill-water"  ${totalAnimals > 0 && (invWater > 0 || waterStore >= waterNeed) ? "" : "disabled"}>💧 Fill Trough</button>
    <button type="button" data-hm-action="feed-all"    ${canFeedAll               ? "" : "disabled"}>Feed All</button>
    <button type="button" data-hm-action="water-all"   ${canWaterAll              ? "" : "disabled"}>Water All</button>
    <button type="button" data-hm-action="clean-barn"  ${totalAnimals > 0        ? "" : "disabled"}>🧹 Clean Barn</button>
  </div>`;

  const animalCards = Object.entries(animalCatalog).map(([id, catalog]) => {
    const group = state.barnAnimals[id];
    if (!group || group.count === 0) return "";
    const icon = HM_ANIMAL_ICONS[id] || "";
    const badges = [
      group.fedToday        ? `<span class="hm-badge hm-badge-ok">✓ Fed</span>`          : `<span class="hm-badge hm-badge-warn">Needs Feed</span>`,
      group.wateredToday    ? `<span class="hm-badge hm-badge-ok">✓ Watered</span>`       : `<span class="hm-badge hm-badge-warn">Needs Water</span>`,
      group.cleanedToday    ? `<span class="hm-badge hm-badge-ok">✓ Clean</span>`         : `<span class="hm-badge hm-badge-warn">Needs Clean</span>`,
      group.productCollectedToday ? `<span class="hm-badge hm-badge-ok">✓ Collected</span>` : `<span class="hm-badge hm-badge-warn">${catalog.productLabel}</span>`,
      group.ailment         ? `<span class="hm-badge hm-badge-alert">⚠ ${group.ailment.label}</span>` : `<span class="hm-badge hm-badge-ok">✓ Healthy</span>`
    ].join("");
    const canFeedThis = feedStore >= catalog.feedNeed && !group.fedToday;
    const canCollect  = !group.ailment && !group.productCollectedToday && animalProductToolReady(catalog) && !isSabbath();
    const featherBtn  = id === "chickens"
      ? `<button type="button" data-hm-action="feathers-${id}" ${group.feathersCollectedToday || isSabbath() ? "disabled" : ""}>🪶 Feathers</button>`
      : "";
    const treatBtn = group.ailment
      ? `<button type="button" data-hm-action="treat-${id}" ${(state.inventory[group.ailment.remedy] || 0) <= 0 ? "disabled" : ""}>💊 Treat (need: ${itemLabels[group.ailment.remedy]})</button>`
      : "";
    return `<article class="modal-card hm-animal-card">
      <div class="hm-animal-hdr">
        <span class="hm-animal-icon">${icon}</span>
        <div><h3>${catalog.name} <small>(${group.count})</small></h3></div>
      </div>
      <div class="hm-badge-row">${badges}</div>
      ${group.ailment ? `<p style="font-size:0.77rem;color:var(--danger);margin:0 0 4px">Remedy: ${itemLabels[group.ailment.remedy]} — have ${state.inventory[group.ailment.remedy] || 0}</p>` : ""}
      <div class="hm-animal-btns">
        <button type="button" data-hm-action="feed-${id}"    ${canFeedThis                                         ? "" : "disabled"}>Feed</button>
        <button type="button" data-hm-action="clean-${id}"   ${group.count > 0 && !isSabbath()                    ? "" : "disabled"}>Clean</button>
        <button type="button" data-hm-action="collect-${id}" ${group.count > 0 && canCollect                      ? "" : "disabled"}>${catalog.productLabel}</button>
        ${featherBtn}${treatBtn}
        <button type="button" data-hm-action="harvest-${id}" ${group.count > 0 && canPreviewLabor("harvest")      ? "" : "disabled"}>Harvest</button>
      </div>
    </article>`;
  }).filter(Boolean).join("");

  const empty = !animalCards
    ? `<p class="hint-text">No animals yet — buy some in the <strong>Craft &amp; Supply</strong> tab.</p>`
    : "";

  return `${resourceBar}${bulkActions}<div class="card-grid">${animalCards}${empty}</div>`;
}

function hmGardenTab() {
  const bedIds = ["bed1","bed2","bed3","bed4","bed5","bed6","bed7","bed8","bed9","bed10","bed11","bed12","bed13","bed14","bed15"];
  const planted   = bedIds.filter((id) => (state.crops[id]?.plantings?.length || 0) > 0);
  const ready     = bedIds.filter((id) => state.crops[id]?.plantings?.some((p) => p.readyToHarvest));
  const needWater = bedIds.filter((id) => (state.crops[id]?.plantings?.length || 0) > 0 && !state.crops[id].wateredToday);
  const weedy     = bedIds.filter((id) => state.crops[id]?.hasWeeds);
  const canWater  = (state.inventory.wateringCanWater || 0) > 0 && !isSabbath();

  const statsBar = `<div class="hm-resource-bar">
    <div class="hm-res"><span class="hm-res-label">🌱 Planted</span><span class="hm-res-val">${planted.length}/15</span></div>
    <div class="hm-res"><span class="hm-res-label">🌾 Ready</span><span class="hm-res-val">${ready.length}</span></div>
    <div class="hm-res"><span class="hm-res-label">💧 Need water</span><span class="hm-res-val" style="${needWater.length ? "color:var(--gold)" : ""}">${needWater.length}</span></div>
    <div class="hm-res"><span class="hm-res-label">🌿 Weeds</span><span class="hm-res-val" style="${weedy.length ? "color:var(--danger)" : ""}">${weedy.length}</span></div>
    <div class="hm-res"><span class="hm-res-label">💧 Can water</span><span class="hm-res-val">${state.inventory.wateringCanWater || 0} left</span></div>
  </div>`;

  const bedCards = bedIds.map((id) => {
    const bed    = state.crops[id];
    const def    = gardenBeds[id];
    const name   = bed.name || def.defaultName;
    const has    = (bed.plantings?.length || 0) > 0;
    const rdyCount = (bed.plantings || []).filter((p) => p.readyToHarvest).length;
    let cropSummary = "";
    if (has) {
      const grouped = {};
      (bed.plantings || []).forEach((p) => { grouped[p.cropType] = (grouped[p.cropType] || 0) + 1; });
      cropSummary = Object.entries(grouped).map(([type, cnt]) => {
        const crop = cropTypes[type];
        const icon = HM_CROP_ICONS[crop.category] || "";
        return `${icon} ${crop.name}${cnt > 1 ? ` ×${cnt}` : ""}`;
      }).join(", ");
    }
    let badges = "";
    if (rdyCount > 0)         badges += `<span class="hm-badge hm-badge-ok">✓ ${rdyCount} ready</span>`;
    else if (has && !bed.wateredToday) badges += `<span class="hm-badge hm-badge-warn">💧 needed</span>`;
    else if (has && bed.wateredToday)  badges += `<span class="hm-badge hm-badge-ok">✓ watered</span>`;
    if (bed.hasWeeds) badges += `<span class="hm-badge hm-badge-alert">⚠ weeds</span>`;
    const cardClass = rdyCount > 0 ? "hm-bed-card has-ready" : bed.hasWeeds ? "hm-bed-card has-weeds" : "hm-bed-card";
    return `<div class="${cardClass}">
      <div class="hm-bed-name">${name}</div>
      <div style="display:flex;flex-wrap:wrap;gap:3px;margin:2px 0">${badges}</div>
      <div class="hm-bed-crop">${has ? cropSummary : "<em>Empty</em>"}</div>
      <div class="hm-bed-btns">
        <button type="button" data-hm-bed="water"   data-hm-bed-id="${id}" title="Water"   ${has && canWater        ? "" : "disabled"}>💧</button>
        <button type="button" data-hm-bed="weed"    data-hm-bed-id="${id}" title="Weed"    ${bed.hasWeeds && !isSabbath() ? "" : "disabled"}>🌿</button>
        <button type="button" data-hm-bed="harvest" data-hm-bed-id="${id}" title="Harvest" ${rdyCount > 0 && !isSabbath() ? "" : "disabled"}>🌾</button>
        <button type="button" data-hm-bed="open"    data-hm-bed-id="${id}" title="Manage"  >⚙</button>
      </div>
    </div>`;
  }).join("");

  return `${statsBar}<div class="hm-garden-grid">${bedCards}</div>
  <p class="hint-text" style="margin-top:10px;font-size:0.77rem">💧 Water &nbsp;|&nbsp; 🌿 Remove Weeds &nbsp;|&nbsp; 🌾 Harvest &nbsp;|&nbsp; ⚙ Open Bed Panel</p>`;
}

function hmInventoryTab() {
  const categories = [
    { label: "Resources",        icon: "🪵", keys: ["water","wood","logs","stone","herbs","hay","feed","plantMatter","jars","lampOil","cloth","ironToolHead","extraBasket","coins","flax","wateringCanWater","arrows","beeswax"] },
    { label: "Seeds",            icon: "🌰", keys: ["barleySeeds","lentilSeeds","cucumberSeeds","wheatSeeds","onionSeeds","garlicSeeds","figSeedlings","grapeSeedlings","leekSeeds","hyssopSeeds","mintSeeds","cuminSeeds","corianderSeeds","dillSeeds"] },
    { label: "Crops & Produce",  icon: "🌾", keys: ["barley","lentils","cucumbers","wheat","onions","garlic","figs","grapes","leeks","honey","hyssop","mint","cumin","coriander","dill"] },
    { label: "Animal Products",  icon: "🥚", keys: ["eggs","milk","cheese","wool","feathers","manure","fertilizer","hide","fur"] },
    { label: "Meat & Fish",      icon: "🍖", keys: ["chickenMeat","mutton","goatMeat","beef","venison","cleanFish","trout","salmon"] },
    { label: "Prepared Food",    icon: "🍲", keys: ["preparedFood","refrigeratedFood","barleyFlatbread","lentilStew","cucumberHerbSalad","herbTea","simpleSabbathMeal","cleanFishMeal","venisonStew","eggBreakfast","chickenSoup","muttonStew","goatStew","beefStew","wheatBread","stuffedFlatbread","onionLentilSoup","gardenSalad","honeyFlatbread","honeyedFigs","honeyGrapeDrink","garlicHerbSoup","leekSoup","harvestStew","figPreserve","grapeJuice","troutMeal","salmonMeal"] },
    { label: "Remedies & Herbs", icon: "🌿", keys: ["hyssopRemedy","mintTonic","cuminPoultice","corianderSalve","dillTonic","honeyHerbSyrup","beeswaxSalve"] }
  ];
  const eatFoods = new Set(Object.keys(FOOD_EAT_VALUES));
  const sections = categories.map(({ label, icon, keys }) => {
    const items = keys.filter((k) => (state.inventory[k] || 0) > 0);
    if (!items.length) return "";
    const rows = items.map((key) => {
      const amt = state.inventory[key] || 0;
      const breakdown = qualityBreakdown(key);
      const eatBtn = eatFoods.has(key)
        ? `<button type="button" class="hm-inv-eat" data-hm-eat="${key}">Eat</button>`
        : "";
      return `<div class="hm-inv-item">
        <span class="hm-inv-name" title="${itemLabels[key] || key}">${itemLabels[key] || key}${breakdown ? `<br><small style="color:var(--muted);font-size:0.7em">${breakdown}</small>` : ""}</span>
        <span class="hm-inv-qty">${amt}</span>${eatBtn}
      </div>`;
    }).join("");
    return `<div class="hm-inv-section"><h4>${icon} ${label}</h4><div class="hm-inv-grid">${rows}</div></div>`;
  }).join("");
  return sections || `<p class="hint-text">Inventory is empty.</p>`;
}

function hmSupplyTab() {
  const coins = state.inventory.coins || 0;

  // Crafting
  const craftCards = craftingRecipes.map((item) => {
    const owned = item.type === "tool" && state.tools[item.id];
    const canCraft = !owned && hasIngredients(item.ingredients) && !isSabbath();
    return `<article class="modal-card">
      <h3>${item.name}</h3>
      <p class="hint-text" style="margin:0;font-size:0.78rem">${item.description}</p>
      <p style="font-size:0.8rem"><strong>Needs:</strong> ${ingredientList(item.ingredients)}</p>
      <button type="button" data-hm-craft="${item.id}" ${canCraft ? "" : "disabled"}>${owned ? "✓ Owned" : "Craft"}</button>
    </article>`;
  }).join("");

  // Shop — buy items & animals
  const shopCards = shopBuyItems.map((item) => {
    const owned = item.type === "tool" && state.tools[item.id];
    const canBuy = !owned && coins >= item.cost && !isSabbath();
    const animalKey = item.id;
    const icon = item.type === "animal" ? `<img class="hm-icon-sm" src="assets/images/icons/animal-${animalKey}.svg" alt="">` : "";
    return `<article class="modal-card">
      <h3>${icon} ${item.name}</h3>
      <p style="font-size:0.8rem">${item.amount} for <strong>${item.cost}</strong> coins${item.type === "animal" ? ` · own ${state.barnAnimals[item.id]?.count || 0}` : ""}</p>
      <button type="button" data-hm-shop-buy="${item.id}" ${canBuy ? "" : "disabled"}>${owned ? "✓ Owned" : "Buy"}</button>
    </article>`;
  }).join("");

  // Sell items
  const sellCards = shopSellItems.map((item) => {
    const have = state.inventory[item.id] || 0;
    const qualityNote = isQualityTracked(item.id) ? " Quality raises the sale price." : "";
    return `<article class="modal-card">
      <h3>${itemLabels[item.id] || item.id}</h3>
      <p style="font-size:0.8rem">Have: <strong>${have}</strong> · Base price <strong>${item.price}</strong> coins.${qualityNote}</p>
      <button type="button" data-hm-shop-sell="${item.id}" ${have <= 0 || isSabbath() ? "disabled" : ""}>Sell 1</button>
    </article>`;
  }).join("");

  // Supply orders (catalogItems — arrive in days)
  const orderCards = catalogItems.map((item) => `
    <article class="modal-card">
      <h3>${item.name}</h3>
      <p style="font-size:0.8rem"><strong>${item.cost}</strong> coins · arrives in <strong>${item.days}</strong> day${item.days === 1 ? "" : "s"}</p>
      <button type="button" data-hm-order="${item.id}" ${coins < item.cost || isSabbath() ? "disabled" : ""}>Order</button>
    </article>`).join("");

  const pendingList = state.pendingOrders.length
    ? state.pendingOrders.map((o) => `<li>${o.name} — arrives Day ${o.arriveDay}</li>`).join("")
    : "<li class='hint-text'>None pending.</li>";

  // Community orders
  const activeOrders = (state.communityOrders || []);
  const communityCards = activeOrders.length
    ? activeOrders.map((order) => {
        const needed = Object.entries(order.items).map(([k, v]) => `${v} ${itemLabels[k] || k}`).join(", ");
        const canFill = hasIngredients(order.items);
        const daysLeft = order.dueDay - state.day;
        const urgency = daysLeft <= 1 ? `<strong style="color:var(--danger)"> — due tomorrow!</strong>` : ` — ${daysLeft}d left`;
        return `<article class="modal-card">
          <h3>${order.label}</h3>
          <p style="font-size:0.8rem">Need: ${needed}</p>
          <p style="font-size:0.8rem">Reward: <strong>${order.reward}</strong> coins${urgency}</p>
          <button type="button" data-hm-fill-order="${order.id}" ${!canFill || isSabbath() ? "disabled" : ""}>${canFill ? "Fill Order" : "Missing items"}</button>
        </article>`;
      }).join("")
    : `<p class="hint-text">No active orders. New requests arrive each morning.</p>`;

  return `
    <div class="hm-section">
      <div class="hm-resource-bar"><div class="hm-res"><span class="hm-res-label">💰 Coins</span><span class="hm-res-val">${coins}</span></div></div>
    </div>
    <div class="hm-section">
      <div class="hm-section-head">🔨 Crafting</div>
      <div class="card-grid">${craftCards}</div>
    </div>
    <div class="hm-section">
      <div class="hm-section-head">🛒 Buy from Market</div>
      <div class="card-grid">${shopCards}</div>
    </div>
    <div class="hm-section">
      <div class="hm-section-head">💰 Sell Goods</div>
      <div class="card-grid">${sellCards}</div>
    </div>
    <div class="hm-section">
      <div class="hm-section-head">📦 Order Supplies</div>
      <div class="card-grid">${orderCards}</div>
      <h4 style="margin:12px 0 4px;font-size:0.82rem">Pending Orders</h4>
      <ul style="padding-left:18px;margin:0;font-size:0.82rem">${pendingList}</ul>
      <p class="hint-text" style="font-size:0.74rem;margin-top:6px">In-game only — never real money or external shopping.</p>
    </div>
    <div class="hm-section">
      <div class="hm-section-head">🤝 Community Orders</div>
      <div class="card-grid">${communityCards}</div>
    </div>
  `;
}

function bindHomesteadMaintenance() {
  // Tab switching (pure DOM toggle — no re-render)
  document.querySelectorAll("[data-hm-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".hm-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".hm-tab-content").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`hm-${btn.dataset.hmTab}`)?.classList.add("active");
    });
  });

  // Eat food buttons
  document.querySelectorAll("[data-hm-eat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      eatFood(btn.dataset.hmEat);
      render();
      openHomesteadMaintenanceModal("inventory");
    });
  });

  // Animal bulk + per-animal actions
  const reopenAnimals = () => { render(); openHomesteadMaintenanceModal("animals"); };
  document.querySelectorAll("[data-hm-action]").forEach((btn) => {
    const a = btn.dataset.hmAction;
    btn.addEventListener("click", () => {
      if (a === "stock-feed")          { addFeedTrough();        reopenAnimals(); }
      else if (a === "fill-water")     { addWaterTrough();       reopenAnimals(); }
      else if (a === "feed-all")       { feedAllAnimals();       reopenAnimals(); }
      else if (a === "water-all")      { waterBarnAnimals();     reopenAnimals(); }
      else if (a === "clean-barn")     { cleanBarnForManure();   reopenAnimals(); }
      else if (a.startsWith("feed-"))    { feedAnimal(a.slice(5));          reopenAnimals(); }
      else if (a.startsWith("clean-"))   { cleanAnimal(a.slice(6));         reopenAnimals(); }
      else if (a.startsWith("collect-")) { collectAnimalProduct(a.slice(8)); reopenAnimals(); }
      else if (a.startsWith("feathers-")){ collectChickenFeathers();         reopenAnimals(); }
      else if (a.startsWith("treat-"))   { treatAnimal(a.slice(6));          reopenAnimals(); }
      else if (a.startsWith("harvest-")) { harvestAnimal(a.slice(8));        reopenAnimals(); }
    });
  });

  // Garden bed actions
  const reopenGarden = () => { render(); openHomesteadMaintenanceModal("garden"); };
  document.querySelectorAll("[data-hm-bed]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id  = btn.dataset.hmBedId;
      const act = btn.dataset.hmBed;
      if (act === "water")   { waterCrop(id);   reopenGarden(); }
      else if (act === "weed")    { weedCrop(id);    reopenGarden(); }
      else if (act === "harvest") { harvestCrop(id); reopenGarden(); }
      else if (act === "open")    { openCropModal(id); }
    });
  });

  // Crafting
  const reopenSupply = () => { render(); openHomesteadMaintenanceModal("supply"); };
  document.querySelectorAll("[data-hm-craft]").forEach((btn) => {
    btn.addEventListener("click", () => { craftItem(btn.dataset.hmCraft); reopenSupply(); });
  });

  // Shop buy
  document.querySelectorAll("[data-hm-shop-buy]").forEach((btn) => {
    btn.addEventListener("click", () => { buyShopItem(btn.dataset.hmShopBuy); reopenSupply(); });
  });

  // Shop sell
  document.querySelectorAll("[data-hm-shop-sell]").forEach((btn) => {
    btn.addEventListener("click", () => { sellShopItem(btn.dataset.hmShopSell); reopenSupply(); });
  });

  // Supply orders
  document.querySelectorAll("[data-hm-order]").forEach((btn) => {
    btn.addEventListener("click", () => { placeOrder(btn.dataset.hmOrder); reopenSupply(); });
  });

  // Community orders
  document.querySelectorAll("[data-hm-fill-order]").forEach((btn) => {
    btn.addEventListener("click", () => { fulfillCommunityOrder(Number(btn.dataset.hmFillOrder)); reopenSupply(); });
  });
}

function waterBarnAnimals() {
  const totalAnimals = barnAnimalCount();
  if (!totalAnimals) {
    pushMessage("There are no animals to water yet.");
    return;
  }
  const need = barnWaterNeed();
  if (!need) {
    pushMessage("The barn animals are already watered.");
    return;
  }
  if ((state.barnWaterStore || 0) < need) {
    pushMessage(`The water trough holds ${state.barnWaterStore || 0} units. Fill it with at least ${need} to water all animals.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  autoWaterBarnAnimals();
  closeModal();
  pushMessage(`All barn animals were watered. (${state.barnWaterStore} units remaining.)`);
}

function barnAnimalCount() {
  return Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
}

function barnWaterNeed() {
  return Object.values(state.barnAnimals).reduce((sum, group) => {
    return sum + (group.count > 0 && !group.wateredToday ? group.count : 0);
  }, 0);
}

function autoWaterBarnAnimals({ showEffect = true, recordCare = true } = {}) {
  const need = barnWaterNeed();
  if (!need || (state.barnWaterStore || 0) < need) return false;
  state.barnWaterStore -= need;
  Object.values(state.barnAnimals).forEach((group) => {
    if (group.count > 0) group.wateredToday = true;
  });
  if (recordCare) learnFrom("animalCare");
  markPrep("gatherWater");
  if (showEffect) triggerSceneEffect("barnWater");
  return true;
}

function addFeedTrough() {
  const hay = state.inventory.hay || 0;
  const feed = state.inventory.feed || 0;
  const total = hay + feed;
  if (!total) {
    pushMessage("You need hay or feed in your inventory to stock the feed area.");
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(2)) return;
  spendQualityItem("hay", hay);
  spendQualityItem("feed", feed);
  state.inventory.hay = 0;
  state.inventory.feed = 0;
  state.barnFeedStore = (state.barnFeedStore || 0) + total;
  triggerSceneEffect("barnFeed");
  closeModal();
  pushMessage(`Feed area stocked with ${total}. Trough holds ${state.barnFeedStore} units.`);
}

function feedAllAnimals() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, g) => sum + g.count, 0);
  if (!totalAnimals) {
    pushMessage("Buy animals before feeding from the trough.");
    return;
  }
  const needed = Object.entries(animalCatalog).reduce((sum, [id, catalog]) => {
    return sum + ((state.barnAnimals[id]?.count || 0) > 0 ? catalog.feedNeed : 0);
  }, 0);
  if ((state.barnFeedStore || 0) < needed) {
    pushMessage(`The feed area holds ${state.barnFeedStore || 0} units. Stock it with at least ${needed} to feed all animals.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  state.barnFeedStore -= needed;
  const fedGroups = Object.values(state.barnAnimals).filter((g) => g.count > 0).length;
  Object.values(state.barnAnimals).forEach((g) => { if (g.count > 0) g.fedToday = true; });
  learnFrom("animalCare");
  state.dailyStats.animalGroupsCared += fedGroups;
  triggerSceneEffect("barnFeed");
  closeModal();
  pushMessage(`All animals fed from the trough. (${state.barnFeedStore} units remaining.)`);
}

function addWaterTrough() {
  const totalAnimals = barnAnimalCount();
  if (!totalAnimals) {
    pushMessage("Buy animals before filling the water trough.");
    return;
  }
  const capacity = totalAnimals;
  const current = state.barnWaterStore || 0;
  const neededToFull = Math.max(0, capacity - current);
  const water = state.inventory.water || 0;
  if (!neededToFull) {
    if (autoWaterBarnAnimals()) {
      closeModal();
      pushMessage(`The full water trough watered the animals automatically. (${state.barnWaterStore} units remaining.)`);
      return;
    }
    pushMessage(`The water trough is already full (${current}/${capacity}).`);
    return;
  }
  if (!water) {
    pushMessage("You need water in your inventory to fill the water trough.");
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(2)) return;
  const added = Math.min(water, neededToFull);
  state.inventory.water -= added;
  state.barnWaterStore = current + added;
  markPrep("gatherWater");
  const watered = autoWaterBarnAnimals();
  if (!watered) triggerSceneEffect("barnWater");
  closeModal();
  if (watered) {
    pushMessage(`Water trough filled with ${added} and the animals were watered automatically. (${state.barnWaterStore} units remaining.)`);
    return;
  }
  pushMessage(`Added ${added} water to the trough. It holds ${state.barnWaterStore}/${capacity}; add ${barnWaterNeed() - state.barnWaterStore} more to water all animals automatically.`);
}

function cleanBarnForManure() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
  if (!totalAnimals) {
    pushMessage("There are no animals in the barn yet.");
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(5)) return;
  Object.values(state.barnAnimals).forEach((group) => {
    if (group.count > 0) group.cleanedToday = true;
  });
  state.roomChores.barn.straw = false;
  addItem("manure", Math.max(1, Math.ceil(totalAnimals / 2)));
  learnFrom("animalCare");
  triggerSceneEffect("tidy");
  closeModal();
  pushMessage("The barn was cleaned, straw swept, and manure collected for fertilizer.");
}

function barnAnimalSummary() {
  return Object.entries(animalCatalog)
    .map(([id, catalog]) => `${catalog.name}: ${state.barnAnimals[id]?.count || 0}`)
    .join("<br>");
}

function openFieldsPanel() {
  const hasTractor = state.upgrades?.tractor;
  const fieldCards = ["field1", "field2", "field3"].map((fieldId, index) => {
    const bed = state.crops[fieldId];
    const locked = !hasTractor;
    const used = bed.plantings?.length || 0;
    const capacity = maxPlantingsForBed(fieldId);
    const statusText = locked
      ? "Requires the Tractor upgrade to work this field."
      : `${used}/${capacity} plantings. ${cropStatus(fieldId)}`;
    return `<article class="modal-card">
      <h3>${bed.name || gardenBeds[fieldId].defaultName}</h3>
      <p>${statusText}</p>
      <button type="button" data-field-bed="${fieldId}" ${locked ? "disabled" : ""}>Open Field ${index + 1}</button>
    </article>`;
  }).join("");

  let tractorSection = "";
  if (hasTractor) {
    const anyPlanted = FIELD_IDS.some((id) => (state.crops[id]?.plantings?.length || 0) > 0);
    const anyNeedsWater = FIELD_IDS.some((id) => (state.crops[id]?.plantings?.length || 0) > 0 && !state.crops[id].wateredToday);
    const anyNeedsFert = FIELD_IDS.some((id) => state.crops[id] && !state.crops[id].fertilized);
    const anyReady = FIELD_IDS.some((id) => state.crops[id]?.plantings?.some((p) => p.readyToHarvest));
    const anyWeedy = FIELD_IDS.some((id) => state.crops[id]?.hasWeeds);
    const water = state.inventory.wateringCanWater || 0;
    const fert = state.inventory.fertilizer || 0;
    const notSabbath = !isSabbath();
    tractorSection = `
      <h3>Tractor Operations</h3>
      <p class="hint-text">Work all three fields at once. Fields hold up to 8 plantings each and yield more per harvest than garden beds.</p>
      <div class="card-grid">
        <article class="modal-card">
          <h3>Water All Fields</h3>
          <p>Waters all planted fields in one pass. Uses one watering can charge per field. Have: ${water}.</p>
          <button type="button" data-tractor-op="water" ${!anyNeedsWater || water <= 0 || !notSabbath ? "disabled" : ""}>Water All</button>
        </article>
        <article class="modal-card">
          <h3>Fertilize All Fields</h3>
          <p>Applies fertilizer across all unfertilized fields. Uses one fertilizer per field. Have: ${fert}.</p>
          <button type="button" data-tractor-op="fertilize" ${!anyNeedsFert || fert <= 0 || !notSabbath ? "disabled" : ""}>Fertilize All</button>
        </article>
        <article class="modal-card">
          <h3>Harvest All Fields</h3>
          <p>Harvests all ready crops from every field. Fields yield 1 extra item per planting over garden beds.</p>
          <button type="button" data-tractor-op="harvest" ${!anyReady || !notSabbath ? "disabled" : ""}>Harvest All</button>
        </article>
        <article class="modal-card">
          <h3>Clear Weeds</h3>
          <p>Clears weeds from all fields at once and collects plant matter.</p>
          <button type="button" data-tractor-op="weed" ${!anyWeedy || !notSabbath ? "disabled" : ""}>Weed All</button>
        </article>
      </div>`;
  }

  openCustomModal("Fields", `
    ${tractorSection}
    <h3>Individual Fields</h3>
    <div class="card-grid">${fieldCards}</div>
    ${!hasTractor ? `<p class="hint-text">Purchase the Tractor upgrade (Shop / Supply Catalog) after reaching Skilled Gardening to unlock these fields.</p>` : ""}
  `);
  document.querySelectorAll("[data-field-bed]").forEach((button) => {
    button.addEventListener("click", () => openCropModal(button.dataset.fieldBed));
  });
  document.querySelectorAll("[data-tractor-op]").forEach((button) => {
    const ops = { water: tractorWaterAllFields, fertilize: tractorFertilizeAllFields, harvest: tractorHarvestAllFields, weed: tractorWeedAllFields };
    button.addEventListener("click", () => { ops[button.dataset.tractorOp]?.(); render(); });
  });
}

function openCropModal(cropId) {
  const bed = state.crops[cropId];
  if (!bed) return;
  const requiredUpgrade = gardenBeds[cropId]?.requiresUpgrade;
  if (requiredUpgrade && !state.upgrades?.[requiredUpgrade]) {
    pushMessage("Those larger fields need a tractor upgrade before they can be worked.");
    openFieldsPanel();
    return;
  }
  const isField = gardenBeds[cropId]?.requiresUpgrade === "tractor";
  const maxSlots = maxPlantingsForBed(cropId);
  const used = bed.plantings.length;
  const slotLabel = isField ? "field" : "bed";
  const currentSeason = seasons[state.seasonIndex];
  const full = used >= maxSlots;
  const seasonCrops = cropChoices.filter((type) => cropTypes[type].season === currentSeason);
  const cropButtons = seasonCrops.length
    ? seasonCrops.map((type) => {
        const crop = cropTypes[type];
        const stock = state.inventory[crop.seedItem] || 0;
        const disabled = stock <= 0 || !canPreviewLabor("plant") || full;
        return `<button type="button" data-plant-crop="${type}" ${disabled ? "disabled" : ""}>${crop.name} <small>(${stock})</small></button>`;
      }).join("")
    : `<p class="hint-text">No crops are sown in ${currentSeason}.</p>`;
  const plantList = bed.plantings.length
    ? bed.plantings.map((planting) => `<li>${cropTypes[planting.cropType].name}: ${planting.readyToHarvest ? "ready" : `stage ${planting.growthStage}`}</li>`).join("")
    : "<li>No plantings yet.</li>";
  openCustomModal(bed.name || gardenBeds[cropId].defaultName, `
    <div class="card-grid">
      <article class="modal-card">
        <h3>${isField ? "Field" : "Bed"} Name</h3>
        <label class="tester-field">Name
          <input id="bedNameInput" type="text" maxlength="32" value="${escapeAttribute(bed.name || "")}">
        </label>
        <button type="button" data-modal-action="save name">Save Name</button>
      </article>
      <article class="modal-card">
        <h3>Plant — ${currentSeason}</h3>
        <p>${used}/${maxSlots} slots used.${used >= maxSlots ? " <strong>Full.</strong>" : ""}</p>
        <label class="plant-qty-label">Qty: <input id="plantQtyInput" type="number" min="1" max="${maxSlots}" value="1" class="plant-qty-input"></label>
        ${cropButtons}
      </article>
      <article class="modal-card">
        <h3>Soil</h3>
        <p>${cropStatus(cropId)}</p>
        <button type="button" data-modal-action="add compost" ${bed.composted || state.inventory.plantMatter <= 0 || !canPreviewLabor("compost") ? "disabled" : ""}>Add Compost</button>
        <button type="button" data-modal-action="apply fertilizer" ${bed.fertilized || state.inventory.fertilizer <= 0 || !canPreviewLabor("fertilize") ? "disabled" : ""}>Apply Fertilizer</button>
      </article>
      <article class="modal-card">
        <h3>Care</h3>
        <button type="button" data-modal-action="water" ${!bed.plantings.length || state.inventory.wateringCanWater <= 0 ? "disabled" : ""}>Water</button>
        <button type="button" data-modal-action="weed" ${!bed.hasWeeds || !canPreviewLabor("weed") ? "disabled" : ""}>Weed</button>
        <button type="button" data-modal-action="harvest" ${!bed.plantings.some((planting) => planting.readyToHarvest) || !canPreviewLabor("harvest") ? "disabled" : ""}>Harvest Ready</button>
      </article>
      <article class="modal-card">
        <h3>Plantings (${used}/${maxSlots})</h3>
        <ul>${plantList}</ul>
      </article>
    </div>
  `);
  bindCropBedActions(cropId);
}

function canPreviewLabor(action) {
  return !isSabbath() || action === "water";
}

function buttonCard(title, text, handler, disabled = false) {
  const action = title.toLowerCase();
  return `<article class="modal-card"><h3>${title}</h3><p>${text}</p><button type="button" data-modal-action="${action}" ${disabled ? "disabled" : ""}>${title}</button></article>`;
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function bindCropBedActions(cropId) {
  bindModalActions({
    "save name": () => saveBedName(cropId),
    "add compost": () => compostCropBed(cropId),
    "apply fertilizer": () => fertilizeCrop(cropId),
    water: () => waterCrop(cropId),
    weed: () => weedCrop(cropId),
    harvest: () => harvestCrop(cropId)
  });
  document.querySelectorAll("[data-plant-crop]").forEach((button) => {
    button.addEventListener("click", () => {
      const qty = Math.max(1, parseInt(document.getElementById("plantQtyInput")?.value || "1", 10) || 1);
      plantCrop(cropId, button.dataset.plantCrop, qty);
      render();
    });
  });
}

function bindModalActions(actions) {
  document.querySelectorAll("[data-modal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      actions[button.dataset.modalAction]?.();
      render();
    });
  });
}

function saveBedName(cropId) {
  const bed = state.crops[cropId];
  const name = document.getElementById("bedNameInput")?.value.trim();
  bed.name = name || gardenBeds[cropId].defaultName;
  closeModal();
  pushMessage(`Renamed bed to ${bed.name}.`);
}

function maxPlantingsForBed(cropId) {
  return gardenBeds[cropId]?.requiresUpgrade === "tractor" ? 8 : 3;
}

function plantCrop(cropId, cropType, qty = 1) {
  const bed = state.crops[cropId];
  const catalog = cropTypes[cropType];
  if (!bed || !catalog) return;
  if (!canDoLabor("plant")) return;
  if (!hasStamina(1)) return;
  const maxSlots = maxPlantingsForBed(cropId);
  const availableSlots = maxSlots - bed.plantings.length;
  const availableSeeds = state.inventory[catalog.seedItem] || 0;
  const toPlant = Math.min(qty, availableSlots, availableSeeds);
  if (toPlant <= 0) {
    const label = gardenBeds[cropId]?.requiresUpgrade === "tractor" ? "field" : "bed";
    if (availableSlots <= 0) pushMessage(`This ${label} is fully planted (${maxSlots} plantings maximum).`);
    else pushMessage(`You need ${itemLabels[catalog.seedItem] || catalog.name + " seeds"} to plant ${catalog.name}.`);
    return;
  }
  let lastQuality = "standard";
  for (let i = 0; i < toPlant; i++) {
    const spentSeed = spendQualityItem(catalog.seedItem, 1);
    lastQuality = bestSpentQuality(spentSeed);
    state.inventory[catalog.seedItem] -= 1;
    bed.plantings.push({ ...emptyCrop(cropType), seedQuality: lastQuality, growthStage: 1 });
    learnFrom("gardening");
    state.dailyStats.cropsPlanted += 1;
  }
  bed.hasWeeds = false;
  closeModal();
  triggerSceneEffect("plant", cropId);
  if (toPlant === 1) {
    pushMessage(`Planted ${qualityLabelForItem(catalog.seedItem, lastQuality).toLowerCase()} ${catalog.name} seed.`);
  } else {
    pushMessage(`Planted ${toPlant} ${catalog.name} seedlings.`);
  }
}

function waterCrop(cropId) {
  const bed = state.crops[cropId];
  if (!bed?.plantings.length) return;
  if ((state.inventory.wateringCanWater || 0) <= 0) {
    pushMessage("Refill the watering can before watering crops.");
    return;
  }
  if (!canDoLabor("water")) return;
  if (!hasStamina(2)) return;
  state.inventory.wateringCanWater -= 1;
  bed.wateredToday = true;
  spendStamina(2);
  learnFrom("gardening");
  state.dailyStats.cropsWatered += 1;
  closeModal();
  triggerSceneEffect("waterCrop", cropId);
  pushMessage(`${bed.name} watered.`);
}

function weedCrop(cropId) {
  const bed = state.crops[cropId];
  if (!bed?.hasWeeds) {
    pushMessage("This bed does not need weeding.");
    return;
  }
  if (!canDoLabor("weed") || !spendStamina(3)) return;
  bed.hasWeeds = false;
  bed.weededToday = true;
  addItem("plantMatter", 1);
  learnFrom("gardening");
  state.dailyStats.cropsWeeded += 1;
  closeModal();
  triggerSceneEffect("weed", cropId);
  pushMessage(`${bed.name} weeded. Plant matter was collected for compost.`);
}

function compostCropBed(cropId) {
  const bed = state.crops[cropId];
  if (!bed) return;
  if (bed.composted) {
    pushMessage("This bed already has compost worked in.");
    return;
  }
  if ((state.inventory.plantMatter || 0) <= 0) {
    pushMessage("Collect plant matter before adding compost.");
    return;
  }
  if (!canDoLabor("compost") || !spendStamina(2)) return;
  state.inventory.plantMatter -= 1;
  bed.composted = true;
  learnFrom("gardening");
  triggerSceneEffect("compost", cropId);
  closeModal();
  pushMessage(`${bed.name} has compost worked into the soil.`);
}

function fertilizeCrop(cropId) {
  const bed = state.crops[cropId];
  if (!bed) return;
  if (bed.fertilized) {
    pushMessage("This bed has already been fertilized.");
    return;
  }
  if ((state.inventory.fertilizer || 0) <= 0) {
    pushMessage("Craft or buy fertilizer first.");
    return;
  }
  if (!canDoLabor("fertilize") || !spendStamina(2)) return;
  spendQualityItem("fertilizer", 1);
  state.inventory.fertilizer -= 1;
  bed.fertilized = true;
  learnFrom("gardening");
  closeModal();
  triggerSceneEffect("compost", cropId);
  pushMessage(`${bed.name} fertilized.`);
}

const FIELD_IDS = ["field1", "field2", "field3"];

function tractorWaterAllFields() {
  if (!canDoLabor("water")) return;
  const needsWater = FIELD_IDS.filter((id) => (state.crops[id]?.plantings?.length || 0) > 0 && !state.crops[id].wateredToday);
  if (!needsWater.length) { pushMessage("All planted fields are already watered today."); return; }
  const available = state.inventory.wateringCanWater || 0;
  if (available <= 0) { pushMessage("Refill the watering can before using the tractor."); return; }
  const canWater = Math.min(available, needsWater.length);
  const toWater = needsWater.slice(0, canWater);
  toWater.forEach((id) => {
    state.inventory.wateringCanWater -= 1;
    state.crops[id].wateredToday = true;
    state.dailyStats.cropsWatered += 1;
  });
  spendStamina(3);
  learnFrom("gardening", toWater.length);
  closeModal();
  triggerSceneEffect("waterCrop");
  pushMessage(`Tractor watered ${toWater.length} field${toWater.length === 1 ? "" : "s"}.${canWater < needsWater.length ? ` Not enough water for the remaining ${needsWater.length - canWater}.` : ""}`);
}

function tractorFertilizeAllFields() {
  if (!canDoLabor("fertilize")) return;
  const needsFert = FIELD_IDS.filter((id) => state.crops[id] && !state.crops[id].fertilized);
  if (!needsFert.length) { pushMessage("All fields are already fertilized."); return; }
  const available = state.inventory.fertilizer || 0;
  if (available <= 0) { pushMessage("No fertilizer available."); return; }
  const canFert = Math.min(available, needsFert.length);
  const toFert = needsFert.slice(0, canFert);
  toFert.forEach((id) => {
    spendQualityItem("fertilizer", 1);
    state.inventory.fertilizer -= 1;
    state.crops[id].fertilized = true;
  });
  spendStamina(3);
  learnFrom("gardening", toFert.length);
  closeModal();
  triggerSceneEffect("compost");
  pushMessage(`Tractor applied fertilizer to ${toFert.length} field${toFert.length === 1 ? "" : "s"}.${canFert < needsFert.length ? ` Not enough fertilizer for the remaining ${needsFert.length - canFert}.` : ""}`);
}

function tractorHarvestAllFields() {
  if (!canDoLabor("harvest") || !spendStamina(6)) return;
  const readyFields = FIELD_IDS.filter((id) => state.crops[id]?.plantings?.some((p) => p.readyToHarvest));
  if (!readyFields.length) { pushMessage("No fields have crops ready to harvest."); return; }
  let totalHarvested = 0;
  const bonus = consumeProductionBuff();
  readyFields.forEach((id) => {
    const bed = state.crops[id];
    const ready = bed.plantings.filter((p) => p.readyToHarvest);
    ready.forEach((planting, i) => {
      const catalog = cropTypes[planting.cropType];
      const soilQuality = bed.fertilized ? "excellent" : bed.composted ? "good" : "standard";
      const baseQuality = qualityFromScore((qualityScore(soilQuality) + qualityScore(planting.seedQuality || "standard")) / 2);
      const quality = improveQualityByLearning(baseQuality, "gardening");
      addItem(catalog.harvestItem, bed.fertilized || bed.composted ? 5 : 4, quality);
      const baseSeeds = catalog.seedYield ?? 1;
      const seedBonus = bed.fertilized ? Math.ceil(baseSeeds * 0.5) : bed.composted ? Math.ceil(baseSeeds * 0.25) : 0;
      const seedQuality = improveQualityByLearning(qualityFromScore((qualityScore(quality) + qualityScore(planting.seedQuality || "standard")) / 2), "gardening");
      addItem(catalog.seedItem, baseSeeds + seedBonus, seedQuality);
      if (bonus && i === 0) addItem(catalog.harvestItem, bonus, quality);
    });
    addItem("plantMatter", 1);
    learnFrom("gardening", ready.length);
    state.dailyStats.cropsHarvested += ready.length;
    totalHarvested += ready.length;
    bed.plantings = bed.plantings.filter((p) => !p.readyToHarvest);
    if (!bed.plantings.length) { bed.wateredToday = false; bed.hasWeeds = false; }
  });
  closeModal();
  triggerSceneEffect("harvest");
  pushMessage(`Tractor harvested ${totalHarvested} crop${totalHarvested === 1 ? "" : "s"} across ${readyFields.length} field${readyFields.length === 1 ? "" : "s"}. Fields yield slightly more than garden beds.`);
}

function tractorWeedAllFields() {
  if (!canDoLabor("weed") || !spendStamina(4)) return;
  const weedy = FIELD_IDS.filter((id) => state.crops[id]?.hasWeeds);
  if (!weedy.length) { pushMessage("No fields need weeding right now."); return; }
  weedy.forEach((id) => {
    state.crops[id].hasWeeds = false;
    state.crops[id].weededToday = true;
    addItem("plantMatter", 1);
    state.dailyStats.cropsWeeded += 1;
  });
  learnFrom("gardening", weedy.length);
  closeModal();
  triggerSceneEffect("weed");
  pushMessage(`Tractor cleared weeds from ${weedy.length} field${weedy.length === 1 ? "" : "s"}. Plant matter collected.`);
}

function harvestCrop(cropId) {
  const bed = state.crops[cropId];
  if (!bed?.plantings.some((planting) => planting.readyToHarvest)) {
    pushMessage(`${bed?.name || "This bed"} is not ready to harvest.`);
    return;
  }
  if (!canDoLabor("harvest") || !spendStamina(5)) return;
  const ready = bed.plantings.filter((planting) => planting.readyToHarvest);
  const bonus = consumeProductionBuff();
  ready.forEach((planting) => {
    const catalog = cropTypes[planting.cropType];
    const soilQuality = bed.fertilized ? "excellent" : bed.composted ? "good" : "standard";
    const baseQuality = qualityFromScore((qualityScore(soilQuality) + qualityScore(planting.seedQuality || "standard")) / 2);
    const quality = improveQualityByLearning(baseQuality, "gardening");
    addItem(catalog.harvestItem, bed.fertilized || bed.composted ? 4 : 3, quality);
    const baseSeeds = catalog.seedYield ?? 1;
    const seedBonus = bed.fertilized ? Math.ceil(baseSeeds * 0.5) : bed.composted ? Math.ceil(baseSeeds * 0.25) : 0;
    const seedQuality = improveQualityByLearning(qualityFromScore((qualityScore(quality) + qualityScore(planting.seedQuality || "standard")) / 2), "gardening");
    addItem(catalog.seedItem, baseSeeds + seedBonus, seedQuality);
  });
  if (bonus && ready.length) {
    const firstCatalog = cropTypes[ready[0].cropType];
    const firstPlanting = ready[0];
    const soilQuality = bed.fertilized ? "excellent" : bed.composted ? "good" : "standard";
    const quality = improveQualityByLearning(qualityFromScore((qualityScore(soilQuality) + qualityScore(firstPlanting.seedQuality || "standard")) / 2), "gardening");
    addItem(firstCatalog.harvestItem, bonus, quality);
  }
  addItem("plantMatter", 1);
  learnFrom("gardening", ready.length);
  state.dailyStats.cropsHarvested += ready.length;
  bed.plantings = bed.plantings.filter((planting) => !planting.readyToHarvest);
  if (!bed.plantings.length) {
    bed.wateredToday = false;
    bed.hasWeeds = false;
  }
  closeModal();
  triggerSceneEffect("harvest", cropId);
  pushMessage(`Harvested crops from ${bed.name}. Seed quality and soil care shaped the harvest.${bonus ? " Clean Laundry added 1 extra harvest item." : ""}`);
}

function cropStatus(cropId) {
  const bed = state.crops[cropId];
  if (!bed?.plantings.length) return `Empty bed. Compost: ${bed?.composted ? "yes" : "no"}, fertilizer: ${bed?.fertilized ? "yes" : "no"}`;
  const ready = bed.plantings.filter((planting) => planting.readyToHarvest).length;
  const seedQualities = [...new Set(bed.plantings.map((planting) => qualityLabelForItem(cropTypes[planting.cropType]?.seedItem || "", planting.seedQuality || "standard")))].join(", ");
  return `${bed.plantings.length} planting${bed.plantings.length === 1 ? "" : "s"}, ${ready} ready, seed quality: ${seedQualities}, watered today: ${bed.wateredToday ? "yes" : "no"}, weeds: ${bed.hasWeeds ? "yes" : "no"}, compost: ${bed.composted ? "yes" : "no"}, fertilizer: ${bed.fertilized ? "yes" : "no"}`;
}

function craftItem(id) {
  const item = craftingRecipes.find((recipeItem) => recipeItem.id === id);
  if (!item || !canDoLabor("craft")) return;
  if (item.cleanStatus !== "clean") {
    pushMessage("This recipe is not approved by clean food rules.");
    return;
  }
  if (!hasIngredients(item.ingredients)) {
    pushMessage(`Not enough materials for ${item.name}.`);
    return;
  }
  const spent = spendIngredients(item.ingredients);
  const quality = improveQualityByLearning(qualityFromSpent(spent), "crafting");
  if (item.type === "tool") {
    readyTool(id);
  } else {
    Object.entries(item.bonus || { [id]: 1 }).forEach(([key, value]) => addItem(key, value, quality));
  }
  learnFrom("crafting");
  state.dailyStats.itemsCrafted += 1;
  pushMessage(`Crafted ${item.type === "tool" ? item.name : `${QUALITY_LABELS[quality]} ${item.name}`}.`);
  render();
  openModal("crafting");
}

function prepRecipe(id) {
  const item = cookingRecipes.find((recipeItem) => recipeItem.id === id);
  if (!item || !canDoLabor("cook")) return;
  if (state.preppedFood) {
    pushMessage("A recipe is already prepped on the counter. Cook it at the stove first.");
    return;
  }
  if (item.cleanStatus !== "clean" || !edibleItems[item.id]) {
    pushMessage("This food is not approved by clean food rules.");
    return;
  }
  if (!hasIngredients(item.ingredients)) {
    pushMessage(`Not enough ingredients for ${item.name}.`);
    return;
  }
  if (!spendStamina(2)) return;
  const spent = spendIngredients(item.ingredients);
  const quality = improveQualityByLearning(qualityFromSpent(spent), "cooking");
  state.preppedFood = { recipeId: item.id, quality };
  state.kitchenChores.counters = true;
  learnFrom("cooking");
  closeModal();
  triggerSceneEffect("prep");
  pushMessage(`${item.name} is prepped on the counter at ${QUALITY_LABELS[quality]} quality. Move to the stove to cook it higher.`);
  render();
}

function cookItem(id, mode = "direct") {
  const item = cookingRecipes.find((recipeItem) => recipeItem.id === id);
  if (!item || !canDoLabor("cook")) return;
  if (item.cleanStatus !== "clean" || !edibleItems[item.id]) {
    pushMessage("This food is not approved by clean food rules.");
    return;
  }
  if (!hasIngredients(item.ingredients)) {
    pushMessage(`Not enough ingredients for ${item.name}.`);
    return;
  }
  const spent = spendIngredients(item.ingredients);
  const quality = qualityFromSpent(spent);
  finishCookedRecipe(item, quality, mode);
}

function cookPreppedFood() {
  const prepped = state.preppedFood;
  const item = prepped ? cookingRecipes.find((recipeItem) => recipeItem.id === prepped.recipeId) : null;
  if (!item || !canDoLabor("cook")) {
    pushMessage("Prep food on the counter before using this stove option.");
    return;
  }
  state.preppedFood = null;
  finishCookedRecipe(item, nextQuality(prepped.quality), "prepped");
}

function finishCookedRecipe(item, quality, mode) {
  quality = improveQualityByLearning(improveQualityWithBuff(quality), "cooking");
  addItem(item.id, 1, quality);
  Object.entries(item.bonus || {}).forEach(([key, value]) => addItem(key, value, quality));
  markPrep("prepareFood");
  state.kitchenChores.dishes = true;
  if (mode === "direct") state.kitchenChores.counters = true;
  learnFrom("cooking", mode === "prepped" ? 2 : 1);
  state.dailyStats.mealsCooked += 1;
  closeModal();
  triggerSceneEffect("cook");
  pushMessage(`Prepared ${QUALITY_LABELS[quality]} clean food: ${item.name}.`);
  render();
}

function placeOrder(id) {
  const item = catalogItems.find((catalogItem) => catalogItem.id === id);
  if (!item || !canDoLabor("order")) return;
  if (state.inventory.coins < item.cost) {
    pushMessage(`Not enough coins for ${item.name}.`);
    return;
  }
  state.inventory.coins -= item.cost;
  state.pendingOrders.push({ id: item.id, name: item.name, amount: item.amount, arriveDay: state.day + item.days });
  pushMessage(`${item.name} ordered. It should arrive in ${item.days} day${item.days === 1 ? "" : "s"}.`);
  render();
  openModal("shop");
}

function collectOrders() {
  const arrived = state.pendingOrders.filter((order) => order.arriveDay <= state.day);
  if (!arrived.length) {
    pushMessage("No orders have arrived yet.");
    return;
  }
  for (const order of arrived) addItem(order.id, order.amount);
  state.pendingOrders = state.pendingOrders.filter((order) => order.arriveDay > state.day);
  pushMessage(`Collected ${arrived.map((order) => order.name).join(", ")} from the delivery crate.`);
}

function hasIngredients(ingredients) {
  return Object.entries(ingredients).every(([key, amount]) => (state.inventory[key] || 0) >= amount);
}

function spendIngredients(ingredients) {
  const spentByItem = {};
  Object.entries(ingredients).forEach(([key, amount]) => {
    spentByItem[key] = spendQualityItem(key, amount);
    state.inventory[key] -= amount;
  });
  return spentByItem;
}

function spendItem(key, amount) {
  if ((state.inventory[key] || 0) < amount) return false;
  spendQualityItem(key, amount);
  state.inventory[key] -= amount;
  return true;
}

function addItem(key, amount, quality = "standard") {
  state.inventory[key] = (state.inventory[key] || 0) + amount;
  addQualityItem(key, amount, quality);
}

function absoluteMinute() {
  return (state.day - 1) * 840 + Math.max(0, state.minute - 420);
}

function advanceTime(minutes) {
  applyTimeNeeds(minutes);
  state.minute += minutes;
  processPassiveStallSales();
  if (state.minute >= NIGHTFALL_MINUTE) {
    state.minute = NIGHTFALL_MINUTE;
    if (state.isSabbathRest) nextDay();
    else state.pendingDaySummary = true;
  }
}

function nextDay() {
  const previousWeekdayIndex = (state.day - 1) % 7;
  const wasSabbathRest = state.isSabbathRest;
  const hadShalom = state.shalomRestDays > 0;
  const hadRested = state.restedBuffDays > 0;
  if (state.marketStall?.isOpen) {
    state.marketStall.isOpen = false;
    state.marketStall.nextSaleMinute = 9999;
  }
  state.marketStall = { ...state.marketStall, todayCoins: 0, recentSales: [] };
  const prevSeasonIndex = state.seasonIndex;
  state.day += 1;
  state.minute = 7 * 60;
  state.weatherIndex = (state.weatherIndex + 1) % weatherCycle.length;
  state.seasonIndex = Math.floor((state.day - 1) / 15) % seasons.length;
  state.needs = createNeeds();
  state.dailyRest = createDailyRest();
  state.restBuffs = createRestBuffs();
  state.preppedFood = null;
  if (state.day % 2 === 0) state.kitchenChores.floor = true;
  updateRoomChoresForNewDay();
  resetBarnAnimalDailyCare();

  if (state.upgrades?.plumbing) {
    state.barnWaterStore = barnAnimalCount();
    autoWaterBarnAnimals({ showEffect: false, recordCare: false });
    if (state.tools.wateringCan) state.inventory.wateringCanWater = WATERING_CAN_CAPACITY;
  }

  for (const [bedId, bed] of Object.entries(state.crops)) {
    if (!bed.plantings?.length) continue;
    if (bed.wateredToday && !bed.hasWeeds) {
      const growthBoost = bed.fertilized ? 2 : 1;
      bed.plantings.forEach((planting) => {
        const crop = cropTypes[planting.cropType];
        planting.daysWatered += growthBoost;
        planting.growthStage = Math.min(4, planting.growthStage + growthBoost);
        planting.readyToHarvest = planting.daysWatered >= crop.daysToMature;
      });
    }
    if (!bed.plantings.every((planting) => planting.readyToHarvest) && !bed.weededToday && ((state.day + bedId.length) % 3 === 0)) bed.hasWeeds = true;
    bed.wateredToday = false;
    bed.weededToday = false;
  }

  if (state.upgrades?.irrigation) {
    for (const [bedId, bed] of Object.entries(state.crops)) {
      if (gardenBeds[bedId]?.requiresUpgrade !== "tractor" && bed.plantings?.length) {
        bed.wateredToday = true;
      }
    }
    if (state.tools.wateringCan) state.inventory.wateringCanWater = WATERING_CAN_CAPACITY;
  }

  for (const [animalId, group] of Object.entries(state.barnAnimals)) {
    if (group.breeding) {
      group.breeding.daysLeft -= 1;
      if (group.breeding.daysLeft <= 0) {
        group.count += 1;
        group.breeding = null;
        pushMessage(`A new ${animalCatalog[animalId].singular.toLowerCase()} has been born on the homestead!`);
      }
    }
  }
  generateCommunityOrders();
  state.dailyStats = createDailyStats();
  generateDailyGoals();

  if (wasSabbathRest && previousWeekdayIndex === 6) {
    state.isSabbathRest = false;
    state.needs = { ...createNeeds(), relaxation: 0 };
    state.shalomRestDays = 1;
    state.journalUnlocked.shalomRest = true;
    state.sabbathActivities = { worshipped: false, strolled: false, gathered: false };
    resetSabbathPrep();
    pushMessage("Sabbath has ended. Shalom Rest steadies this work day.");
  } else if (wasSabbathRest) {
    state.isSabbathRest = true;
    pushMessage("Sabbath rest continues. Peaceful navigation and journal reading remain open.");
  } else if (((state.day - 1) % 7) === 6) {
    pushMessage("Sabbath has arrived. Ordinary labor pauses; enter rest when prepared.");
  } else if (isPreparationDay()) {
    resetSabbathPrep();
    pushMessage("Preparation Day has begun. Gather water, prepare clean food, gather herbs, tidy, put tools away, and set aside the Sabbath basket.");
  } else {
    pushMessage("A new day begins on the homestead.");
  }

  if (state.seasonIndex !== prevSeasonIndex) {
    const seasonNames = { Spring: "Spring has arrived. Rains come, flowers bloom, and the soil wakes.", Summer: "Summer settles over the homestead. Warmth and long days fill the land.", Autumn: "Autumn has come. Leaves turn and fall, and the air grows cool.", Winter: "Winter is here. Snow and stillness cover the land." };
    pushMessage(seasonNames[seasons[state.seasonIndex]] || `The season turns to ${seasons[state.seasonIndex]}.`);
  }
  if (hadShalom && !wasSabbathRest) state.shalomRestDays = 0;
  if (hadRested) state.restedBuffDays = 0;
  saveGame(false);
  render();
}

function updateRoomChoresForNewDay() {
  const chores = state.roomChores;
  if (state.day % 2 === 0) chores.cabin.dust = true;
  if (state.day % 3 === 0) chores.cabin.books = true;
  if (state.day % 2 === 1) chores.livingRoom.dust = true;
  if (state.day % 4 === 0) chores.livingRoom.books = true;
  if (state.day % 3 === 0) chores.pantry.dust = true;
  if (state.day % 5 === 0) chores.pantry.crates = true;
  if (state.day % 2 === 0) chores.workshed.sawdust = true;
  if (state.day % 3 === 1) chores.barn.straw = true;
}

function resetBarnAnimalDailyCare() {
  Object.entries(state.barnAnimals).forEach(([id, group]) => {
    if (group.count > 0 && !group.ailment) {
      const neglected = !group.fedToday || !group.wateredToday;
      const ailmentChance = neglected ? 0.20 : 0.05;
      if (Math.random() < ailmentChance) {
        const options = ANIMAL_AILMENTS[id];
        if (options && options.length > 0) {
          group.ailment = options[Math.floor(Math.random() * options.length)];
          pushMessage(`Your ${id} have developed ${group.ailment.label.toLowerCase()}. Visit the barn to check on them.`);
        }
      }
    }
    group.fedToday = false;
    group.wateredToday = false;
    group.cleanedToday = false;
    group.productCollectedToday = false;
    group.feathersCollectedToday = false;
  });
  if (autoWaterBarnAnimals({ showEffect: false, recordCare: false })) {
    pushMessage("Water left in the barn trough watered the animals automatically.");
  }
}

function resetSabbathPrep() {
  state.sabbathPrep = Object.fromEntries(sabbathTasks.map((task) => [task.id, false]));
}

function formatTime(minute) {
  const hour = Math.floor(minute / 60) % 24;
  const mins = Math.floor(minute % 60).toString().padStart(2, "0");
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${mins} ${suffix}`;
}

function openModal(type, titleOverride) {
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  document.getElementById("modalBackdrop").classList.remove("hidden");
  const panel = document.querySelector(".modal-panel");
  panel.classList.remove("hm-modal");
  panel.querySelectorAll(".hm-corner").forEach((el) => el.remove());

  if (type === "inventory") {
    modalTitle.textContent = titleOverride || "Inventory";
    modalBody.innerHTML = inventoryMarkup(true);
    document.querySelectorAll("[data-eat-item]").forEach((btn) => {
      btn.addEventListener("click", () => eatFood(btn.dataset.eatItem));
    });
  }
  if (type === "tools") {
    modalTitle.textContent = "Owned Tools";
    modalBody.innerHTML = toolsMarkup();
  }
  if (type === "character") {
    modalTitle.textContent = "Character & Clothing";
    modalBody.innerHTML = characterMarkup();
    bindCharacterButtons();
  }
  if (type === "crafting") {
    modalTitle.textContent = "Crafting";
    modalBody.innerHTML = recipeMarkup(craftingRecipes, "craft");
    bindRecipeButtons("craft");
  }
  if (type === "cooking") {
    modalTitle.textContent = "Cooking";
    modalBody.innerHTML = cookingMarkup();
    bindCookingButtons();
  }
  if (type === "foodPrep") {
    modalTitle.textContent = "Food Prep Area";
    modalBody.innerHTML = foodPrepMarkup();
    bindPrepButtons();
  }
  if (type === "ordering") {
    modalTitle.textContent = "Supply Catalog";
    modalBody.innerHTML = orderingMarkup();
    document.querySelectorAll("[data-order]").forEach((button) => button.addEventListener("click", () => placeOrder(button.dataset.order)));
  }
  if (type === "shop") {
    modalTitle.textContent = "Shop / Supply Catalog";
    modalBody.innerHTML = shopMarkup();
    bindShopButtons();
  }
  if (type === "marketStall") {
    modalTitle.textContent = "Market Stall";
    modalBody.innerHTML = marketStallMarkup();
    bindMarketStallButtons();
  }
  if (type === "barnCare") {
    openBarnCareModal();
  }
  if (type === "animalMaintenance") {
    openAnimalMaintenanceModal();
  }
  if (type === "homesteadMaintenance") {
    openHomesteadMaintenanceModal();
  }
  if (type === "iceBox") {
    modalTitle.textContent = "Ice Box";
    modalBody.innerHTML = iceBoxMarkup();
  }
  if (type === "bedRest") {
    modalTitle.textContent = "Bedroom Rest";
    modalBody.innerHTML = bedRestMarkup();
    bindBedRestButtons();
  }
  if (type === "journal") {
    modalTitle.textContent = titleOverride || "Journal";
    modalBody.innerHTML = journalMarkup();
    bindJournalButtons();
  }
  if (type === "sabbathPrep") {
    modalTitle.textContent = "Sabbath Preparation";
    modalBody.innerHTML = sabbathPrepMarkup();
  }
  if (type === "messages") {
    modalTitle.textContent = "Messages";
    modalBody.innerHTML = `<div class="recent-messages">${state.messages.map((message) => `<div class="message-item">${message}</div>`).join("")}</div>`;
  }
  if (type === "save") {
    modalTitle.textContent = "Save Manager";
    modalBody.innerHTML = saveManagerMarkup();
    bindSaveManager();
  }
  if (type === "tester") {
    modalTitle.textContent = "Hidden Tester Panel";
    modalBody.innerHTML = testerMarkup();
    bindTesterPanel();
  }
  if (type === "status") {
    modalTitle.textContent = "Homestead Status";
    modalBody.innerHTML = statusMarkup();
  }
  if (type === "areas") {
    modalTitle.textContent = "Areas";
    modalBody.innerHTML = areaMenuMarkup();
    document.querySelectorAll("[data-area-target]").forEach((button) => {
      button.addEventListener("click", () => {
        closeModal();
        navigate(button.dataset.areaTarget);
        render();
      });
    });
  }
  if (type === "overview") {
    modalTitle.textContent = scenes[state.currentScene].title;
    modalBody.innerHTML = sceneInfoMarkup();
  }
  if (type === "orders") {
    modalTitle.textContent = "Community Orders";
    modalBody.innerHTML = communityOrdersMarkup();
    document.querySelectorAll("[data-fill-order]").forEach((btn) => {
      btn.addEventListener("click", () => fulfillCommunityOrder(Number(btn.dataset.fillOrder)));
    });
  }
}

function openCustomModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modalBackdrop").classList.remove("hidden");
  const panel = document.querySelector(".modal-panel");
  panel.classList.remove("hm-modal");
  panel.querySelectorAll(".hm-corner").forEach((el) => el.remove());
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.add("hidden");
}

function bindRecipeButtons(type) {
  document.querySelectorAll(`[data-${type}]`).forEach((button) => {
    button.addEventListener("click", () => {
      if (type === "craft") craftItem(button.dataset.craft);
      if (type === "cook") cookItem(button.dataset.cook);
    });
  });
}

function bindCookingButtons() {
  document.querySelectorAll("[data-cook]").forEach((button) => {
    button.addEventListener("click", () => cookItem(button.dataset.cook, "direct"));
  });
  document.querySelectorAll("[data-cook-prepped]").forEach((button) => {
    button.addEventListener("click", () => cookPreppedFood());
  });
}

function bindPrepButtons() {
  document.querySelectorAll("[data-prep-recipe]").forEach((button) => {
    button.addEventListener("click", () => prepRecipe(button.dataset.prepRecipe));
  });
}

function inventoryMarkup(includeAll = false) {
  const rows = Object.entries(state.inventory)
    .filter(([, amount]) => includeAll || amount > 0)
    .map(([key, amount]) => inventoryItemMarkup(key, amount))
    .join("");
  return `<div class="inventory-list">${rows || "<p class=\"hint-text\">Inventory is empty.</p>"}</div>`;
}

function inventoryItemMarkup(key, amount) {
  const breakdown = qualityBreakdown(key);
  const eatBtn = FOOD_EAT_VALUES[key] && amount > 0
    ? `<button type="button" class="eat-btn" data-eat-item="${key}">Eat</button>`
    : "";
  return `<div class="inventory-item"><span>${itemLabels[key] || key}${breakdown ? `<br><small>${breakdown}</small>` : ""}</span><strong>${amount}</strong>${eatBtn}</div>`;
}

function toolsMarkup() {
  return `<div class="tool-list">${Object.entries(toolLabels).map(([key, label]) => `
    <div class="tool-item ${state.tools[key] ? "owned" : ""}"><strong>${label}</strong><br><small>${toolStatusText(key)}</small></div>
  `).join("")}</div>`;
}

function toolStatusText(key) {
  if (!state.tools[key]) return "Not owned yet";
  return toolDurabilityMax[key] ? toolDurabilitySummary(key) : "Owned";
}

function characterMarkup() {
  const current = activeClothing();
  const currentClothing = CLOTHING_DEFINITIONS[current];
  return `
    <div class="panel-section">
      <h3>Current Clothing</h3>
      <p><strong>${currentClothing.label}</strong> &middot; Rank ${activeClothingRank()}</p>
      <p class="hint-text">${currentClothing.detail}</p>
    </div>
    <h3>Skills</h3>
    ${skillDetailsMarkup()}
    <h3>Clothing</h3>
    <div class="card-grid">${Object.keys(CLOTHING_DEFINITIONS).map(clothingCard).join("")}</div>
  `;
}

function skillDetailsMarkup() {
  return `<div class="prep-list">${Object.entries(SKILL_DEFINITIONS).map(([id, skill]) => {
    const points = state.skills?.[id] || 0;
    const next = nextSkillThreshold(id);
    const stage = skillStage(id);
    const qualityText = skillQualitySteps(id) > 0 ? `${skillQualitySteps(id)} quality step${skillQualitySteps(id) === 1 ? "" : "s"}` : "quality growth pending";
    return `<div class="prep-item">
      <span>${skill.label}<br><small>${stage.label} &middot; ${points}${next ? `/${next}` : ""} practice &middot; ${skill.detail}</small></span>
      <strong>${qualityText}</strong>
    </div>`;
  }).join("")}</div>`;
}

function clothingCard(id) {
  const clothing = CLOTHING_DEFINITIONS[id];
  const rank = state.clothing?.items?.[id] || 1;
  const cost = clothingImproveCost(id);
  const focus = clothing.focus ? SKILL_DEFINITIONS[clothing.focus]?.label : "General";
  const active = activeClothing() === id;
  return `<article class="modal-card">
    <h3>${clothing.label}</h3>
    <p>${clothing.detail}</p>
    <p><strong>Focus:</strong> ${focus}</p>
    <p><strong>Rank:</strong> ${rank}/3</p>
    <p><strong>Improve:</strong> ${clothingCostText(cost)}</p>
    <button type="button" data-equip-clothing="${id}" ${active ? "disabled" : ""}>${active ? "Wearing" : "Wear"}</button>
    <button type="button" data-improve-clothing="${id}" ${!cost || !canAffordCost(cost) ? "disabled" : ""}>${cost ? "Improve" : "Fully Improved"}</button>
  </article>`;
}

function bindCharacterButtons() {
  document.querySelectorAll("[data-equip-clothing]").forEach((button) => {
    button.addEventListener("click", () => equipClothing(button.dataset.equipClothing));
  });
  document.querySelectorAll("[data-improve-clothing]").forEach((button) => {
    button.addEventListener("click", () => improveClothing(button.dataset.improveClothing));
  });
}

function equipClothing(id) {
  if (!CLOTHING_DEFINITIONS[id]) return;
  state.clothing.active = id;
  pushMessage(`${CLOTHING_DEFINITIONS[id].label} selected.`);
  render();
  openModal("character");
}

function improveClothing(id) {
  if (!CLOTHING_DEFINITIONS[id]) return;
  const cost = clothingImproveCost(id);
  if (!cost || !canAffordCost(cost)) {
    pushMessage("More cloth is needed before improving this clothing.");
    return;
  }
  spendIngredients(cost);
  state.clothing.items[id] = Math.min(3, (state.clothing.items[id] || 1) + 1);
  learnFrom("crafting", 2);
  pushMessage(`${CLOTHING_DEFINITIONS[id].label} improved to rank ${state.clothing.items[id]}.`);
  render();
  openModal("character");
}

function ingredientList(ingredients) {
  return Object.entries(ingredients).map(([key, amount]) => {
    const have = state.inventory[key] || 0;
    const label = `${amount} ${itemLabels[key] || key}`;
    return have >= amount
      ? label
      : `<span class="ingredient-missing">${label} <small>(have ${have})</small></span>`;
  }).join(", ");
}

function recipeMarkup(list, type) {
  const attr = type === "craft" ? "data-craft" : "data-cook";
  return `<div class="card-grid">${list.map((item) => {
    const needs = ingredientList(item.ingredients);
    const alreadyOwnedTool = type === "craft" && item.type === "tool" && state.tools[item.id];
    const disabled = alreadyOwnedTool || !hasIngredients(item.ingredients) || (type === "craft" && isSabbath()) || (type === "cook" && isSabbath());
    return `<article class="modal-card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>Needs:</strong> ${needs}</p>
      <p><strong>Clean status:</strong> ${item.cleanStatus}</p>
      <button type="button" ${attr}="${item.id}" ${disabled ? "disabled" : ""}>${alreadyOwnedTool ? "Owned" : type === "craft" ? "Craft" : "Cook"}</button>
    </article>`;
  }).join("")}</div>`;
}

function cookingMarkup() {
  const prepped = state.preppedFood;
  const preppedRecipe = prepped ? cookingRecipes.find((item) => item.id === prepped.recipeId) : null;
  const preppedCard = preppedRecipe ? `
    <article class="modal-card">
      <h3>Cook Prepped ${preppedRecipe.name}</h3>
      <p>Counter prep is ready. Cooking now will finish at ${QUALITY_LABELS[nextQuality(prepped.quality)]} quality.</p>
      <button type="button" data-cook-prepped="${preppedRecipe.id}">Cook Prepped Food</button>
    </article>
  ` : `
    <article class="modal-card">
      <h3>No Counter Prep</h3>
      <p>Use the Food Prep Area first for higher-quality cooking, or cook directly below.</p>
      <button type="button" disabled>Nothing Prepped</button>
    </article>
  `;
  return `
    <div class="card-grid">${preppedCard}</div>
    <h3>Cook Directly</h3>
    <p class="hint-text">Direct stove cooking skips counter prep and keeps food at ingredient quality.</p>
    ${recipeMarkup(cookingRecipes, "cook")}
  `;
}

function foodPrepMarkup() {
  const prepped = state.preppedFood;
  const preppedRecipe = prepped ? cookingRecipes.find((item) => item.id === prepped.recipeId) : null;
  const ingredientKeys = [...new Set(cookingRecipes.flatMap((item) => Object.keys(item.ingredients)))];
  const ingredientRows = ingredientKeys
    .map((key) => inventoryItemMarkup(key, state.inventory[key] || 0))
    .join("");
  return `
    <div class="panel-section">
      <p class="hint-text">Place clean ingredients here before cooking. Counter prep raises the finished food by one quality step.</p>
      ${preppedRecipe ? `<p><strong>Ready for stove:</strong> ${preppedRecipe.name} (${QUALITY_LABELS[prepped.quality]} prep)</p>` : ""}
      <div class="inventory-list">${ingredientRows}</div>
    </div>
    <div class="card-grid">${cookingRecipes.map((item) => {
      const needs = ingredientList(item.ingredients);
      const disabled = Boolean(state.preppedFood) || !hasIngredients(item.ingredients) || isSabbath();
      return `<article class="modal-card">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Needs:</strong> ${needs}</p>
        <button type="button" data-prep-recipe="${item.id}" ${disabled ? "disabled" : ""}>Prep on Counter</button>
      </article>`;
    }).join("")}</div>
  `;
}

function orderingMarkup() {
  const pending = state.pendingOrders.length
    ? state.pendingOrders.map((order) => `<li>${order.name}, arrives Day ${order.arriveDay}</li>`).join("")
    : "<li>No pending orders.</li>";
  return `<div class="card-grid">${catalogItems.map((item) => `
    <article class="modal-card">
      <h3>${item.name}</h3>
      <p>Cost: ${item.cost} coins. Arrival: ${item.days} day${item.days === 1 ? "" : "s"}.</p>
      <button type="button" data-order="${item.id}" ${state.inventory.coins < item.cost || isSabbath() ? "disabled" : ""}>Order</button>
    </article>
  `).join("")}</div><h3>Pending Orders</h3><ul>${pending}</ul><p class="hint-text">This is fictional in-game ordering only. It never uses real money, websites, APIs, or live shopping.</p>`;
}

function shopMarkup() {
  const TRACTOR_SKILL_REQ = 24;
  const buyCards = shopBuyItems.map((item) => {
    const ownedTool = item.type === "tool" && state.tools[item.id];
    const ownedUpgrade = item.type === "upgrade" && state.upgrades[item.id];
    const owned = ownedTool || ownedUpgrade;
    let skillNote = "";
    let meetsSkill = true;
    if (item.id === "tractor") {
      const pts = state.skills.gardening || 0;
      if (pts < TRACTOR_SKILL_REQ) {
        meetsSkill = false;
        skillNote = ` · Requires Skilled Gardening (${pts}/${TRACTOR_SKILL_REQ} pts)`;
      } else {
        skillNote = " · Gardening skill requirement met";
      }
    }
    const disabled = owned || state.inventory.coins < item.cost || isSabbath() || !meetsSkill;
    return `<article class="modal-card">
      <h3>${item.name}</h3>
      <p>${owned ? "Already owned." : `Buy for ${item.cost} coins.${skillNote}`}</p>
      <button type="button" data-shop-buy="${item.id}" ${disabled ? "disabled" : ""}>${owned ? "Owned" : "Buy"}</button>
    </article>`;
  }).join("");
  const sellCards = shopSellItems.map((item) => `
    <article class="modal-card">
      <h3>${itemLabels[item.id] || item.id}</h3>
      <p>Owned: ${state.inventory[item.id] || 0}. Base price ${item.price} coins${isQualityTracked(item.id) ? "; quality raises value" : ""}.</p>
      <button type="button" data-shop-sell="${item.id}" ${(state.inventory[item.id] || 0) <= 0 || isSabbath() ? "disabled" : ""}>Sell 1</button>
    </article>
  `).join("");
  const animalSellCards = Object.entries(animalCatalog).map(([id, animal]) => {
    const value = Math.floor(animal.buyCost / 2);
    return `<article class="modal-card">
      <h3>${animal.singular}</h3>
      <p>Owned: ${state.barnAnimals[id]?.count || 0}. Sell for ${value} coins each.</p>
      <button type="button" data-shop-sell-animal="${id}" ${(state.barnAnimals[id]?.count || 0) <= 0 || isSabbath() ? "disabled" : ""}>Sell 1</button>
    </article>`;
  }).join("");
  const pending = state.pendingOrders.length
    ? state.pendingOrders.map((order) => `<li>${order.name}, arrives Day ${order.arriveDay}</li>`).join("")
    : "<li>No pending orders.</li>";
  const orderCards = catalogItems.map((item) => `
    <article class="modal-card">
      <h3>${item.name}</h3>
      <p>Order for ${item.cost} coins. Arrives in ${item.days} day${item.days === 1 ? "" : "s"}.</p>
      <button type="button" data-order="${item.id}" ${state.inventory.coins < item.cost || isSabbath() ? "disabled" : ""}>Order</button>
    </article>
  `).join("");
  return `
    <p><strong>Coins:</strong> ${state.inventory.coins}</p>
    <h3>Buy Now</h3>
    <div class="card-grid">${buyCards}</div>
    <h3>Sell Goods</h3>
    <div class="card-grid">${sellCards}</div>
    <h3>Sell Animals</h3>
    <div class="card-grid">${animalSellCards}</div>
    <h3>Order Supplies</h3>
    <div class="card-grid">${orderCards}</div>
    <h3>Pending Orders</h3>
    <ul>${pending}</ul>
    <p class="hint-text">This is a fictional in-game shop only. It never uses real money, websites, APIs, or live shopping.</p>
  `;
}

function bindShopButtons() {
  document.querySelectorAll("[data-shop-buy]").forEach((button) => {
    button.addEventListener("click", () => buyShopItem(button.dataset.shopBuy));
  });
  document.querySelectorAll("[data-shop-sell]").forEach((button) => {
    button.addEventListener("click", () => sellShopItem(button.dataset.shopSell));
  });
  document.querySelectorAll("[data-shop-sell-animal]").forEach((button) => {
    button.addEventListener("click", () => sellShopAnimal(button.dataset.shopSellAnimal));
  });
  document.querySelectorAll("[data-order]").forEach((button) => {
    button.addEventListener("click", () => placeOrder(button.dataset.order));
  });
}

function buyShopItem(id) {
  const item = shopBuyItems.find((entry) => entry.id === id);
  if (!item || !canDoLabor("order")) return;
  if (item.type === "tool" && state.tools[item.id]) {
    pushMessage(`${item.name} is already owned.`);
    return;
  }
  if (item.type === "upgrade" && state.upgrades[item.id]) {
    pushMessage(`${item.name} is already owned.`);
    return;
  }
  if (item.id === "tractor" && (state.skills.gardening || 0) < 24) {
    pushMessage("Tractor requires Skilled Gardening (24+ gardening points).");
    return;
  }
  if (state.inventory.coins < item.cost) {
    pushMessage(`Not enough coins for ${item.name}.`);
    return;
  }
  state.inventory.coins -= item.cost;
  if (item.type === "tool") readyTool(item.id);
  if (item.type === "animal") state.barnAnimals[item.id].count += item.amount;
  if (item.type === "item") addItem(item.id, item.amount);
  if (item.type === "upgrade") {
    state.upgrades[item.id] = true;
    const upgradeMessages = {
      tractor: "Tractor purchased. Large fields are now unlocked.",
      irrigation: "Irrigation system installed. Garden beds will be watered automatically each morning.",
      plumbing: "Well pump & plumbing installed. The barn trough and watering can will refill automatically each morning."
    };
    pushMessage(upgradeMessages[item.id] || `${item.name} purchased.`);
    render();
    openModal("shop");
    return;
  }
  pushMessage(`Bought ${item.name}.`);
  render();
  openModal("shop");
}

function sellShopItem(id) {
  const item = shopSellItems.find((entry) => entry.id === id);
  if (!item || !canDoLabor("order")) return;
  if ((state.inventory[id] || 0) <= 0) {
    pushMessage(`No ${itemLabels[id] || id} available to sell.`);
    return;
  }
  const spent = spendQualityItem(id, 1);
  state.inventory[id] -= 1;
  const soldQuality = bestSpentQuality(spent);
  const price = qualityAdjustedPrice(item.price, soldQuality);
  state.inventory.coins += price;
  state.dailyStats.coinsEarned += price;
  const qualityText = spent.length ? `${qualityLabelForItem(id, soldQuality)} ` : "";
  pushMessage(`Sold 1 ${qualityText}${itemLabels[id] || id} for ${price} coins.`);
  render();
  openModal("shop");
}

function qualityAdjustedPrice(basePrice, quality) {
  return Math.max(1, Math.round(basePrice * (QUALITY_PRICE_MULTIPLIER[quality] || 1)));
}

function sellShopAnimal(id) {
  const animal = animalCatalog[id];
  const group = state.barnAnimals[id];
  if (!animal || !group || !canDoLabor("order")) return;
  if (group.count <= 0) {
    pushMessage(`No ${animal.name.toLowerCase()} available to sell.`);
    return;
  }
  group.count -= 1;
  state.inventory.coins += Math.floor(animal.buyCost / 2);
  pushMessage(`Sold 1 ${animal.singular.toLowerCase()}.`);
  render();
  openModal("shop");
}

function processPassiveStallSales() {
  const stall = state.marketStall;
  if (!stall?.isOpen) return;
  let iterations = 0;
  while (state.minute >= (stall.nextSaleMinute || 9999) && stall.isOpen && iterations < 20) {
    iterations++;
    const available = Object.keys(stall.listings).filter((id) => (state.inventory[id] || 0) > 0);
    if (!available.length) break;
    const itemId = available[Math.floor(Math.random() * available.length)];
    const itemDef = shopSellItems.find((e) => e.id === itemId);
    if (!itemDef) { delete stall.listings[itemId]; continue; }
    const spent = spendQualityItem(itemId, 1);
    state.inventory[itemId] -= 1;
    const soldQuality = bestSpentQuality(spent);
    const price = qualityAdjustedPrice(itemDef.price, soldQuality);
    state.inventory.coins += price;
    state.dailyStats.coinsEarned += price;
    const qualityText = spent.length ? `${qualityLabelForItem(itemId, soldQuality)} ` : "";
    stall.listings[itemId] = (stall.listings[itemId] || 1) - 1;
    if (stall.listings[itemId] <= 0) delete stall.listings[itemId];
    stall.recentSales = [{ label: `${qualityText}${itemLabels[itemId] || itemId}`, price }, ...(stall.recentSales || [])].slice(0, 15);
    stall.todayCoins = (stall.todayCoins || 0) + price;
    stall.nextSaleMinute = state.minute + 40 + Math.floor(Math.random() * 41);
  }
}

function marketStallMarkup() {
  const stall = state.marketStall;
  const isOpen = stall.isOpen;
  const canAct = !isSabbath();
  const listedEntries = Object.entries(stall.listings).filter(([, qty]) => qty > 0);

  const listedHtml = listedEntries.length
    ? listedEntries.map(([id, qty]) => {
        const inStock = state.inventory[id] || 0;
        const itemDef = shopSellItems.find((e) => e.id === id);
        const price = itemDef ? itemDef.price : "?";
        const lowStock = inStock === 0 ? " stall-out-of-stock" : "";
        return `<div class="stall-listing${lowStock}">
          <span class="stall-item-name">${itemLabels[id] || id}</span>
          <span class="stall-item-stock">${inStock} in stock · ${price}c base</span>
          <span class="stall-qty-controls">
            <button type="button" class="stall-qty-btn" data-stall-remove="${id}" ${!canAct ? "disabled" : ""}>−</button>
            <span class="stall-qty">${qty}</span>
            <button type="button" class="stall-qty-btn" data-stall-add="${id}" ${!canAct ? "disabled" : ""}>+</button>
          </span>
          <button type="button" data-stall-remove-all="${id}" ${!canAct ? "disabled" : ""}>Remove</button>
        </div>`;
      }).join("")
    : `<p class="hint-text">Nothing on the stall yet. Add items from your inventory below.</p>`;

  const notListedItems = shopSellItems.filter((item) => !(stall.listings[item.id] > 0));
  const addHtml = notListedItems.map((item) => {
    const inStock = state.inventory[item.id] || 0;
    return `<div class="stall-listing">
      <span class="stall-item-name">${itemLabels[item.id] || item.id}</span>
      <span class="stall-item-stock">${inStock} in stock · ${item.price}c base</span>
      <button type="button" data-stall-add="${item.id}" ${!canAct || inStock <= 0 ? "disabled" : ""}>Put on Stall</button>
    </div>`;
  }).join("");

  const salesHtml = stall.recentSales?.length
    ? `<ul class="stall-sales">${stall.recentSales.map((s) => `<li>${s.label} — ${s.price}c</li>`).join("")}</ul>`
    : `<p class="hint-text">No sales yet today.</p>`;

  const hasListings = listedEntries.length > 0;
  const openDisabled = !canAct || !hasListings ? "disabled" : "";
  const toggleBtn = isOpen
    ? `<button type="button" id="closeStallBtn" ${!canAct ? "disabled" : ""}>Close Stall for Today</button>`
    : `<button type="button" id="openStallBtn" ${openDisabled}>Open Stall for Today</button>`;

  return `
    <div class="stall-status ${isOpen ? "stall-open" : "stall-closed"}">
      <span>${isOpen ? "Open — selling passively" : "Closed — open to start passive sales"}</span>
      ${toggleBtn}
    </div>
    <p><strong>Today's stall earnings:</strong> ${stall.todayCoins || 0} coins</p>
    <h3>On the Stall</h3>
    ${listedHtml}
    <h3>Add to Stall</h3>
    <div class="stall-add-list">${addHtml}</div>
    <h3>Recent Sales</h3>
    ${salesHtml}
    <p class="hint-text">Use + / − to set how many of each item to put on the shelf. Listed items sell one at a time on a random timer while the stall is open. Listings carry over each day — just open the stall again tomorrow.</p>
  `;
}

function bindMarketStallButtons() {
  document.getElementById("openStallBtn")?.addEventListener("click", openMarketStall);
  document.getElementById("closeStallBtn")?.addEventListener("click", closeMarketStall);
  document.querySelectorAll("[data-stall-add]").forEach((btn) => btn.addEventListener("click", () => adjustStallListing(btn.dataset.stallAdd, 1)));
  document.querySelectorAll("[data-stall-remove]").forEach((btn) => btn.addEventListener("click", () => adjustStallListing(btn.dataset.stallRemove, -1)));
  document.querySelectorAll("[data-stall-remove-all]").forEach((btn) => btn.addEventListener("click", () => removeAllStallListing(btn.dataset.stallRemoveAll)));
}

function openMarketStall() {
  if (isSabbath()) { pushMessage("The stall rests on the Sabbath."); return; }
  const stall = state.marketStall;
  if (!Object.values(stall.listings).some((qty) => qty > 0)) { pushMessage("Put some items on the stall first."); openModal("marketStall"); return; }
  stall.isOpen = true;
  stall.nextSaleMinute = state.minute + 40 + Math.floor(Math.random() * 41);
  pushMessage("The market stall is open. Items will sell as buyers pass by.");
  render();
  openModal("marketStall");
}

function closeMarketStall() {
  state.marketStall.isOpen = false;
  state.marketStall.nextSaleMinute = 9999;
  pushMessage("The market stall is closed for today.");
  render();
  openModal("marketStall");
}

function adjustStallListing(id, delta) {
  if (isSabbath()) { pushMessage("Fair dealing rests on the Sabbath."); return; }
  const current = state.marketStall.listings[id] || 0;
  const newQty = current + delta;
  if (newQty <= 0) {
    delete state.marketStall.listings[id];
  } else {
    state.marketStall.listings[id] = newQty;
  }
  render();
  openModal("marketStall");
}

function removeAllStallListing(id) {
  if (isSabbath()) { pushMessage("Fair dealing rests on the Sabbath."); return; }
  delete state.marketStall.listings[id];
  pushMessage(`${itemLabels[id] || id} removed from the stall.`);
  render();
  openModal("marketStall");
}

function iceBoxMarkup() {
  const coldItems = ["milk", "cheese", "refrigeratedFood", "eggs", "cleanFish", "venison", "chickenMeat", "mutton", "goatMeat", "beef"];
  const rows = coldItems.map((key) => `
    <div class="inventory-item"><span>${itemLabels[key]}</span><strong>${state.inventory[key] || 0}</strong></div>
  `).join("");
  return `
    <p>The ice box is reserved for clean dairy and refrigerated prepared foods as those systems grow.</p>
    <div class="inventory-list">${rows}</div>
    <p class="hint-text">Only foods reviewed as biblically clean can be stored here or used in recipes.</p>
  `;
}

function bedRestMarkup() {
  const napUsed = state.dailyRest?.nap || 0;
  const napRemaining = Math.max(0, REST_LIMITS.nap - napUsed);
  const napReady = state.minute + 90 < NIGHTFALL_MINUTE;
  const sleepReady = state.minute >= SLEEP_THROUGH_NIGHT_MINUTE;
  return `<div class="card-grid">
    <article class="modal-card">
      <h3>Nap</h3>
      <p>Ease relaxation need without ending the day. Adds Refreshed for the next three labor actions.</p>
      <p><strong>Remaining today:</strong> ${napRemaining}</p>
      <button type="button" data-bed-rest="nap" ${napRemaining <= 0 || !napReady ? "disabled" : ""}>Nap</button>
    </article>
    <article class="modal-card">
      <h3>Sleep Through Night</h3>
      <p>Available after 6:00 PM. Begin the next morning restored, with Well Rested for the work day.</p>
      <button type="button" data-bed-rest="sleep" ${sleepReady ? "" : "disabled"}>Sleep Through Night</button>
    </article>
  </div>`;
}

function bindBedRestButtons() {
  document.querySelectorAll("[data-bed-rest]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.bedRest === "nap") napInBed();
      if (button.dataset.bedRest === "sleep") sleepThroughNight();
    });
  });
}

function napInBed() {
  if ((state.dailyRest?.nap || 0) >= REST_LIMITS.nap) {
    pushMessage("You have already napped today. Sleep through the night after 6:00 PM for a full reset.");
    closeModal();
    render();
    return;
  }
  if (state.minute + 90 >= NIGHTFALL_MINUTE) {
    pushMessage("It is too late for a nap. Sleep through the night for a full reset.");
    closeModal();
    render();
    return;
  }
  state.dailyRest.nap += 1;
  adjustNeeds({ relaxation: -65, hunger: 6, thirst: 8 });
  state.restBuffs.refreshed = Math.max(state.restBuffs.refreshed || 0, 3);
  triggerSceneEffect("rest");
  advanceTime(90);
  pushMessage("You took a quiet nap and feel refreshed. The next three labor actions add much less relaxation need.");
  closeModal();
  render();
}

function sleepThroughNight() {
  if (state.minute < SLEEP_THROUGH_NIGHT_MINUTE) {
    pushMessage("It is too early to sleep through the night. Evening sleep opens after 6:00 PM.");
    closeModal();
    render();
    return;
  }
  closeModal();
  showDaySummary(() => {
    state.needs = { ...createNeeds(), relaxation: 0 };
    state.restedBuffDays = 1;
    triggerSceneEffect("rest");
    pushMessage("You slept through the night and woke well rested. Labor raises needs more slowly today.");
    saveGame(false);
    render();
  });
}

function saveManagerMarkup() {
  const backup = readStoredSave(SAVE_BACKUP_KEY);
  const exportText = JSON.stringify({ version: SAVE_VERSION, savedAt: new Date().toISOString(), state }, null, 2);
  const namedSaves = getAllNamedSaves();
  const currentSeason = seasons[state.seasonIndex] || "Spring";
  const namedSlotsMarkup = namedSaves.map(({ index, raw }) => {
    if (!raw) {
      return `<article class="modal-card">
        <h3>Empty Slot ${index + 1}</h3>
        <p class="hint-text">No save in this slot.</p>
      </article>`;
    }
    const savedDate = raw.savedAt ? new Date(raw.savedAt).toLocaleString() : "Unknown date";
    const saveDay = raw.state?.day ?? "?";
    const saveSeason = seasons[raw.state?.seasonIndex] ?? "?";
    return `<article class="modal-card">
      <h3>${escapeAttribute(raw.name)}</h3>
      <p>Day ${saveDay} &middot; ${saveSeason}</p>
      <p class="hint-text">${savedDate}</p>
      <div class="save-actions">
        <button type="button" data-named-load="${index}">Continue</button>
        <button type="button" class="danger-action" data-named-delete="${index}">Delete</button>
      </div>
    </article>`;
  }).join("");
  return `
    <h3>Continue Game</h3>
    <p class="hint-text">Load a previously saved game from any slot below.</p>
    <div class="card-grid">${namedSlotsMarkup}</div>

    <h3>Save As</h3>
    <p class="hint-text">Save your current progress (Day ${state.day} &middot; ${currentSeason}) to a named slot.</p>
    <div class="save-actions">
      <input id="saveAsName" type="text" maxlength="32" placeholder="Enter a save name…" class="save-name-input">
      <button type="button" data-save-action="saveAs">Save As</button>
    </div>

    <h3>New Game</h3>
    <p class="hint-text">Start a fresh homestead. Your current game is auto-saved first so you can still export it.</p>
    <button type="button" class="danger-action" data-save-action="newGame">New Game</button>

    <h3>Auto-Save</h3>
    <p><strong>Status:</strong> ${lastSaveInfo.status}</p>
    <p><strong>Last saved:</strong> ${lastSaveInfo.savedAt ? new Date(lastSaveInfo.savedAt).toLocaleString() : "Not yet"}</p>
    ${lastSaveInfo.error ? `<p><strong>Error:</strong> ${lastSaveInfo.error}</p>` : ""}
    <div class="save-actions">
      <button type="button" data-save-action="saveNow">Save Now</button>
      <button type="button" data-save-action="restoreBackup" ${backup ? "" : "disabled"}>Restore Backup</button>
    </div>

    <h3>Export Save</h3>
    <p class="hint-text">Copy this text to keep a manual backup outside this browser.</p>
    <textarea class="save-textarea" readonly>${escapeTextarea(exportText)}</textarea>
    <h3>Import Save</h3>
    <p class="hint-text">Paste a Hebrew Homestead save export below, then import it.</p>
    <textarea id="importSaveText" class="save-textarea" placeholder="Paste exported save JSON here"></textarea>
    <div class="save-actions">
      <button type="button" data-save-action="importSave">Import Pasted Save</button>
    </div>
  `;
}

function bindSaveManager() {
  document.querySelectorAll("[data-save-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.saveAction;
      if (action === "saveNow") {
        saveGame(true);
        render();
        openModal("save");
      }
      if (action === "restoreBackup") restoreBackupSave();
      if (action === "importSave") importPastedSave();
      if (action === "saveAs") {
        const name = document.getElementById("saveAsName")?.value || "";
        saveToNamedSlot(name);
      }
      if (action === "newGame") {
        if (confirm("Start a new game? Your current progress will be auto-saved first.")) {
          startNewGame();
        }
      }
    });
  });
  document.querySelectorAll("[data-named-load]").forEach((button) => {
    button.addEventListener("click", () => loadFromNamedSlot(Number(button.dataset.namedLoad)));
  });
  document.querySelectorAll("[data-named-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Delete this saved game?")) deleteNamedSlot(Number(button.dataset.namedDelete));
    });
  });
}

function escapeTextarea(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function restoreBackupSave() {
  const backup = readStoredSave(SAVE_BACKUP_KEY);
  if (!backup) {
    pushMessage("No backup save is available.");
    openModal("save");
    return;
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify({ version: SAVE_VERSION, savedAt: new Date().toISOString(), state: backup.state }));
  state = hydrateState(backup.state);
  lastSaveInfo = { status: "Backup restored", savedAt: new Date().toISOString(), error: "" };
  pushMessage("Backup save restored.");
  closeModal();
  render();
}

function testerMarkup() {
  const itemOptions = Object.keys(itemLabels).map((key) => `<option value="${key}">${itemLabels[key]} (${key})</option>`).join("");
  const toolOptions = Object.entries(toolLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join("");
  const animalOptions = Object.entries(animalCatalog).map(([key, animal]) => `<option value="${key}">${animal.name}</option>`).join("");
  return `
    <p class="hint-text">Testing helpers are hidden from the normal game UI. Changes autosave like regular play.</p>
    <div class="card-grid">
      <article class="modal-card">
        <h3>Quick Bundles</h3>
        <button type="button" data-test-action="starter">Starter Testing Bundle</button>
        <button type="button" data-test-action="tools">Unlock All Tools</button>
        <button type="button" data-test-action="animals">Add Barn Animals</button>
        <button type="button" data-test-action="garden">Garden Testing Kit</button>
        <button type="button" data-test-action="sabbath">Complete Sabbath Prep</button>
        <button type="button" data-test-action="restore">Reset Needs</button>
      </article>
      <article class="modal-card">
        <h3>Grant Item</h3>
        <label class="tester-field">Item
          <select id="testerItem">${itemOptions}</select>
        </label>
        <label class="tester-field">Amount
          <input id="testerAmount" type="number" min="1" value="10">
        </label>
        <button type="button" data-test-action="grantItem">Add Item</button>
      </article>
      <article class="modal-card">
        <h3>Unlock Tool</h3>
        <label class="tester-field">Tool
          <select id="testerTool">${toolOptions}</select>
        </label>
        <button type="button" data-test-action="grantTool">Unlock Tool</button>
      </article>
      <article class="modal-card">
        <h3>Add Animals</h3>
        <label class="tester-field">Animal
          <select id="testerAnimal">${animalOptions}</select>
        </label>
        <label class="tester-field">Count
          <input id="testerAnimalAmount" type="number" min="1" value="2">
        </label>
        <button type="button" data-test-action="grantAnimal">Add Animals</button>
      </article>
      <article class="modal-card">
        <h3>Time</h3>
        <button type="button" data-test-action="nextDay">Next Day</button>
        <button type="button" data-test-action="prepDay">Jump to Preparation Day</button>
        <button type="button" data-test-action="sabbathDay">Jump to Sabbath</button>
      </article>
    </div>
  `;
}

function bindTesterPanel() {
  document.querySelectorAll("[data-test-action]").forEach((button) => {
    button.addEventListener("click", () => runTesterAction(button.dataset.testAction));
  });
}

function runTesterAction(action) {
  if (action === "starter") testerStarterBundle();
  if (action === "tools") testerUnlockAllTools();
  if (action === "animals") testerAddBarnAnimals();
  if (action === "garden") testerGardenKit();
  if (action === "sabbath") testerCompleteSabbathPrep();
  if (action === "restore") testerRestoreVitals();
  if (action === "grantItem") testerGrantItem();
  if (action === "grantTool") testerGrantTool();
  if (action === "grantAnimal") testerGrantAnimal();
  if (action === "nextDay") nextDay();
  if (action === "prepDay") testerJumpToWeekday(5);
  if (action === "sabbathDay") testerJumpToWeekday(6);
  if (action !== "nextDay") {
    saveGame(false);
    render();
    openModal("tester");
  }
}

function testerStarterBundle() {
  const grants = {
    coins: 250,
    water: 40,
    wateringCanWater: 6,
    wood: 30,
    logs: 8,
    stone: 30,
    herbs: 25,
    barley: 20,
    lentils: 20,
    cucumbers: 20,
    barleySeeds: 10,
    lentilSeeds: 10,
    cucumberSeeds: 10,
    plantMatter: 20,
    manure: 10,
    fertilizer: 10,
    flax: 10,
    wool: 10,
    cloth: 10,
    ironToolHead: 6,
    hay: 20,
    feed: 20,
    arrows: 20,
    preparedFood: 10
  };
  Object.entries(grants).forEach(([key, amount]) => addItem(key, amount));
  testerUnlockAllTools(false);
  testerAddBarnAnimals(false);
  pushMessage("Tester bundle added.");
}

function testerUnlockAllTools(showMessage = true) {
  Object.keys(toolLabels).forEach((key) => {
    readyTool(key);
  });
  if (showMessage) pushMessage("All tools unlocked for testing.");
}

function testerAddBarnAnimals(showMessage = true) {
  Object.keys(animalCatalog).forEach((key) => {
    state.barnAnimals[key].count += 2;
  });
  if (showMessage) pushMessage("Barn animals added for testing.");
}

function testerGardenKit() {
  addItem("barleySeeds", 12);
  addItem("lentilSeeds", 12);
  addItem("cucumberSeeds", 12);
  addItem("water", 30);
  state.inventory.wateringCanWater = 6;
  addItem("fertilizer", 12);
  readyTool("wateringCan");
  pushMessage("Garden testing kit added.");
}

function testerCompleteSabbathPrep() {
  Object.keys(state.sabbathPrep).forEach((key) => {
    state.sabbathPrep[key] = true;
  });
  readyTool("sabbathBasket");
  addItem("preparedFood", 5);
  addItem("water", 5);
  addItem("herbs", 5);
  pushMessage("Sabbath preparation checklist completed for testing.");
}

function testerRestoreVitals() {
  state.needs = createNeeds();
  state.restedBuffDays = 1;
  pushMessage("Needs reset and rested boost restored.");
}

function testerGrantItem() {
  const key = document.getElementById("testerItem")?.value;
  const amount = Math.max(1, Number(document.getElementById("testerAmount")?.value || 1));
  if (!key) return;
  addItem(key, amount);
  pushMessage(`Tester added ${amount} ${itemLabels[key] || key}.`);
}

function testerGrantTool() {
  const key = document.getElementById("testerTool")?.value;
  if (!key) return;
  readyTool(key);
  pushMessage(`Tester unlocked ${toolLabels[key] || key}.`);
}

function testerGrantAnimal() {
  const key = document.getElementById("testerAnimal")?.value;
  const amount = Math.max(1, Number(document.getElementById("testerAnimalAmount")?.value || 1));
  if (!key || !state.barnAnimals[key]) return;
  state.barnAnimals[key].count += amount;
  pushMessage(`Tester added ${amount} ${animalCatalog[key].name.toLowerCase()}.`);
}

function testerJumpToWeekday(targetIndex) {
  const currentIndex = (state.day - 1) % 7;
  const delta = (targetIndex - currentIndex + 7) % 7;
  state.day += delta;
  state.minute = 7 * 60;
  state.isSabbathRest = false;
  if (targetIndex === 5) resetSabbathPrep();
  pushMessage(targetIndex === 5 ? "Jumped to Preparation Day." : "Jumped to Sabbath.");
}

function importPastedSave() {
  const text = document.getElementById("importSaveText")?.value.trim();
  if (!text) {
    pushMessage("Paste exported save text before importing.");
    return;
  }
  try {
    const parsed = JSON.parse(text);
    const importedState = parsed?.state || parsed;
    if (!importedState || typeof importedState !== "object" || !importedState.inventory) {
      throw new Error("This does not look like a Hebrew Homestead save.");
    }
    const existing = localStorage.getItem(SAVE_KEY);
    if (existing) localStorage.setItem(SAVE_BACKUP_KEY, existing);
    state = hydrateState(importedState);
    saveGame(true);
    pushMessage("Imported save loaded.");
    closeModal();
    render();
  } catch (error) {
    lastSaveInfo = { ...lastSaveInfo, error: error.message };
    pushMessage("Import failed. The pasted save text could not be read.");
  }
}

function journalMarkup() {
  const unlocked = journalEntries.filter((item) => state.journalUnlocked[item.id]);
  const active = unlocked.find((item) => item.id === activeJournalId) || unlocked[0];
  if (active) activeJournalId = active.id;

  const gardeningTreeIds = new Set([
    "gardening", "herbs", "seasonalPlanting",
    ...Object.keys(cropTypes)
  ]);

  const cropsBySeason = { Spring: [], Summer: [], Autumn: [], Winter: [] };
  for (const [id, crop] of Object.entries(cropTypes)) {
    if (cropsBySeason[crop.season]) cropsBySeason[crop.season].push(id);
  }

  function entryBtn(item, extraClass = "") {
    const active = item.id === activeJournalId ? " active" : "";
    return `<button type="button" class="${extraClass}${active}" data-entry="${item.id}">${item.title}</button>`;
  }

  const gardeningRoot = unlocked.find((e) => e.id === "gardening");
  let gardeningTree = "";
  if (gardeningRoot) {
    const seasonBranches = ["Spring", "Summer", "Autumn", "Winter"].map((season) => {
      const cropIds = cropsBySeason[season].filter((id) => unlocked.some((e) => e.id === id));
      if (!cropIds.length) return "";
      const isOpen = cropIds.includes(activeJournalId) ? " open" : "";
      const cropBtns = cropIds.map((id) => {
        const e = unlocked.find((e) => e.id === id);
        if (!e) return "";
        const active = id === activeJournalId ? " active" : "";
        return `<button type="button" class="jt-leaf${active}" data-entry="${id}">${cropTypes[id].name}</button>`;
      }).join("");
      return `<details class="jt-season"${isOpen}><summary>${season}</summary><div class="jt-season-crops">${cropBtns}</div></details>`;
    }).join("");

    const extras = ["herbs", "seasonalPlanting"]
      .map((id) => unlocked.find((e) => e.id === id))
      .filter(Boolean)
      .map((e) => entryBtn(e, "jt-extra "))
      .join("");

    gardeningTree = `<div class="jt-root-wrap">${entryBtn(gardeningRoot, "jt-root ")}${seasonBranches}${extras}</div>`;
  }

  const flatEntries = unlocked
    .filter((item) => !gardeningTreeIds.has(item.id))
    .map((item) => entryBtn(item))
    .join("");

  return `<div class="entry-layout">
    <div class="entry-list">${gardeningTree}${flatEntries}</div>
    <article class="entry-text"><h3>${active?.title || "Journal"}</h3><p>${active?.body || ""}</p></article>
  </div>`;
}

function bindJournalButtons() {
  document.querySelectorAll("[data-entry]").forEach((button) => {
    button.addEventListener("click", () => {
      activeJournalId = button.dataset.entry;
      openModal("journal");
    });
  });
}

function sabbathPrepMarkup() {
  return `<div class="prep-list">${sabbathTasks.map((task) => `
    <div class="prep-item ${state.sabbathPrep[task.id] ? "done" : ""}">
      <span>${task.label}<br><small>${task.location}</small></span>
      <strong>${state.sabbathPrep[task.id] ? "Done" : "Open"}</strong>
    </div>
  `).join("")}</div>`;
}

function render() {
  if (state.pendingDaySummary) {
    state.pendingDaySummary = false;
    renderScene();
    renderVitalBar();
    checkDailyGoals();
    renderGoalStrip();
    showDaySummary();
    return;
  }
  renderScene();
  renderVitalBar();
  const messageBar = document.getElementById("messageBar");
  if (messageBar) messageBar.textContent = state.messages[0] || "";
  checkDailyGoals();
  renderGoalStrip();
}

function renderVitalBar() {
  const bar = document.getElementById("vitalBar");
  if (!bar) return;

  ensureNeeds();

  const displayLabels = {
    hunger: "Fullness",
    thirst: "Hydration",
    hygiene: "Cleanliness",
    relaxation: "Peace"
  };

  const needChips = Object.keys(NEED_LABELS).map((key) => {
    const needValue = Math.round(state.needs[key] || 0);
    const displayValue = 100 - needValue;
    const label = displayLabels[key] || NEED_LABELS[key];

    return `<span class="vb-need vb-need-${key}" title="${label}: ${displayValue}%">
      <span>${label}</span>
      <span class="vb-need-bar"><span class="vb-need-fill" style="width:${displayValue}%"></span></span>
    </span>`;
  }).join("");

  bar.innerHTML = `
    <span class="vb-time">${formatTime(state.minute)}</span>
    ${needChips}`;
}

function statusMarkup() {
  ensureNeeds();
  const hudItems = [
    ["Day", state.day],
    ["Weekday", weekdayName()],
    ["Season", seasons[state.seasonIndex]],
    ["Weather", weatherCycle[state.weatherIndex]],
    ["Time", formatTime(state.minute)],
    ["Hunger", `${Math.round(state.needs.hunger)}/100`],
    ["Thirst", `${Math.round(state.needs.thirst)}/100`],
    ["Hygiene", `${Math.round(state.needs.hygiene)}/100`],
    ["Relaxation", `${Math.round(state.needs.relaxation)}/100`],
    ["Water", state.inventory.water],
    ["Sabbath", sabbathStatus()],
    ["Shalom", state.shalomRestDays > 0 ? "Active" : "None"],
    ["Clothing", CLOTHING_DEFINITIONS[activeClothing()].label],
    ["Rest Buffs", restBuffSummary()],
    ["Active Buffs", activeBuffs().map((buff) => buff.label).join(", ") || "None"],
    ["Rest Uses", restUsesSummary()]
  ];
  return `<div class="status-grid">${hudItems.map(([label, value]) => `
    <div class="modal-card"><span class="hud-label">${label}</span><span class="hud-value">${value}</span></div>
  `).join("")}</div>
  <h3>Buff Effects</h3>
  ${buffDetailsMarkup()}
  <h3>Skills</h3>
  ${skillDetailsMarkup()}
  <h3>Goals</h3>
  <ul class="goal-list">${goals().map((goal) => `<li>${goal}</li>`).join("")}</ul>
  <h3>Barn Animals</h3>
  <p>${barnAnimalSummary()}</p>
  <h3>Sabbath Preparation</h3>
  ${sabbathPrepMarkup()}`;
}

function buffDetailsMarkup() {
  const buffs = activeBuffs();
  if (!buffs.length) return "<p class=\"hint-text\">No active buffs.</p>";
  return `<div class="prep-list">${buffs.map((buff) => `
    <div class="prep-item">
      <span>${buff.label}<br><small>${buff.detail}</small></span>
      <strong>${buff.count}</strong>
    </div>
  `).join("")}</div>`;
}

function areaMenuMarkup() {
  const areaButtons = [
    ["overview", "Homestead Overview"],
    ["cabin", "Cabin Entry"],
    ["livingRoom", "Living Room"],
    ["bedroom", "Bedroom"],
    ["bathroom", "Bathroom"],
    ["kitchen", "Kitchen"],
    ["pantry", "Pantry"],
    ["barn", "Barn"],
    ["garden", "Garden"],
    ["apiary", "Apiary"],
    ["workshed", "Workshed"],
    ["forest", "Forest"],
    ["treeFarm", "Tree Farm"],
    ["rockQuarry", "Rock Quarry"],
    ["marketplace", "Marketplace"],
    ["well", "Well / Water Area"],
    ["sabbath", "Sabbath Area"]
  ];
  return `<div class="area-list">${areaButtons.map(([id, label]) => `
    <button type="button" data-area-target="${id}"><strong>${label}</strong><br><small>${scenes[id].description}</small></button>
  `).join("")}</div>`;
}

function sceneInfoMarkup() {
  const scene = scenes[state.currentScene];
  return `<p>${scene.description}</p><h3>Available Hotspots</h3><div class="area-list">${visibleHotspots(scene).map((hotspot) => `
    <button type="button" disabled><strong>${hotspot.label}</strong><br><small>${hotspot.action}</small></button>
  `).join("")}</div>`;
}

function animalGroupNeedsAttention(animalId) {
  const group = state.barnAnimals[animalId];
  if (!group || group.count <= 0) return false;
  return !group.fedToday || !group.wateredToday || !group.cleanedToday || !group.productCollectedToday;
}

function hotspotNeedsAlert(hotspot) {
  const animalSceneMap = { chickenCoop: "chickens", cowPasture: "cattle", goatPen: "goats", sheepPasture: "sheep" };
  if (hotspot.action === "navigate" && animalSceneMap[hotspot.target]) return animalGroupNeedsAttention(animalSceneMap[hotspot.target]);
  if (hotspot.action === "animal" && hotspot.animal) return animalGroupNeedsAttention(hotspot.animal);
  return false;
}

function generateSeasonParticles(season) {
  const r = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
  if (season === "Spring") {
    const drops = Array.from({ length: 24 }, () =>
      `<span class="sp-rain" style="--x:${r(0,100)}%;--delay:${r(0,4)}s;--dur:${r(0.55,1)}s;--op:${r(0.28,0.52)}"></span>`
    ).join("");
    const petals = Array.from({ length: 16 }, () =>
      `<span class="sp-petal" style="--x:${r(2,98)}%;--delay:${r(0,14)}s;--dur:${r(5,10)}s;--hue:${r(315,360)}deg"></span>`
    ).join("");
    return drops + petals;
  }
  if (season === "Summer") {
    const motes = Array.from({ length: 14 }, () =>
      `<span class="sp-mote" style="--x:${r(5,95)}%;--y:${r(15,82)}%;--delay:${r(0,12)}s;--dur:${r(5,13)}s;--dx:${r(-28,28)}px"></span>`
    ).join("");
    return motes;
  }
  if (season === "Autumn") {
    const leaves = Array.from({ length: 22 }, () =>
      `<span class="sp-leaf" style="--x:${r(0,100)}%;--delay:${r(0,18)}s;--dur:${r(6,13)}s;--rot:${r(0,360)}deg;--dx:${r(-40,40)}px;--hue:${r(15,45)}deg"></span>`
    ).join("");
    return leaves;
  }
  if (season === "Winter") {
    const flakes = Array.from({ length: 36 }, () =>
      `<span class="sp-snow" style="--x:${r(0,100)}%;--delay:${r(0,10)}s;--dur:${r(4,10)}s;--size:${r(2.5,6)}px;--dx:${r(-18,18)}px"></span>`
    ).join("");
    return flakes;
  }
  return "";
}

function updateNightOverlay() {
  const overlay = document.getElementById("nightOverlay");
  if (!overlay) return;

  const isOutdoor = OUTDOOR_SCENES.has(state.currentScene);
  const m = state.minute;

  const GOLDEN_START = 16.5 * 60; // 4:30 PM — warm afternoon light begins
  const DUSK_START   = 18.5 * 60; // 6:30 PM — golden fades to purple
  const NIGHT_START  = 20 * 60;   // 8:00 PM — full night colour
  const NIGHTFALL    = 22 * 60;   // 10:00 PM

  if (!isOutdoor || m < GOLDEN_START) {
    overlay.style.background = "transparent";
    return;
  }

  let bg;
  if (m < DUSK_START) {
    const t = (m - GOLDEN_START) / (DUSK_START - GOLDEN_START);
    bg = `rgba(240, 130, 30, ${(t * 0.18).toFixed(3)})`;
  } else if (m < NIGHT_START) {
    const t = (m - DUSK_START) / (NIGHT_START - DUSK_START);
    const r = Math.round(240 - 215 * t);
    const g = Math.round(130 - 95 * t);
    const b = Math.round(30 + 65 * t);
    bg = `rgba(${r}, ${g}, ${b}, ${(0.18 + t * 0.32).toFixed(3)})`;
  } else {
    const t = Math.min(1, (m - NIGHT_START) / (NIGHTFALL - NIGHT_START));
    bg = `rgba(12, 20, 75, ${(0.50 + t * 0.18).toFixed(3)})`;
  }

  overlay.style.background = bg;
}

function updateSeasonLayer() {
  const layer = document.getElementById("seasonLayer");
  if (!layer) return;
  const season = seasons[state.seasonIndex];
  const isOutdoor = OUTDOOR_SCENES.has(state.currentScene);
  const cacheKey = isOutdoor ? season : "indoor";
  if (layer.dataset.renderedSeason === cacheKey) return;
  layer.dataset.renderedSeason = cacheKey;
  layer.innerHTML = isOutdoor ? generateSeasonParticles(season) : "";
}

function renderScene() {
  const scene = scenes[state.currentScene];
  const stage = document.getElementById("sceneStage");
  setSceneBackground(stage, scene);
  stage.classList.toggle("debug-hotspots", state.hotspotDebug);
  document.getElementById("sceneTitleOverlay").textContent = scene.title;
  document.getElementById("sceneDescriptionOverlay").textContent = scene.description;
  stage.dataset.season = seasons[state.seasonIndex].toLowerCase();
  updateSeasonLayer();
  updateNightOverlay();
  document.getElementById("sceneDecorations").innerHTML = decorationMarkup(scene.id);
  if (pendingSceneEffect) {
    playSceneEffect(pendingSceneEffect);
    pendingSceneEffect = null;
  }
  const hotspots = visibleHotspots(scene);
  document.getElementById("hotspotLayer").innerHTML = hotspots.map((hotspot) => {
    const alertClass = hotspotNeedsAlert(hotspot) ? " hotspot--alert" : "";
    return `<button type="button" class="hotspot${alertClass}" data-hotspot="${hotspot.id}" style="left:${hotspot.x}%; top:${hotspot.y}%; width:${hotspot.w}%; height:${hotspot.h}%;">
      <span>${hotspot.label}${hotspot.requirement ? `<span class="requirement">Needs ${toolLabels[hotspot.requirement]}</span>` : ""}</span>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-hotspot]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = hotspots.find((hotspot) => hotspot.id === button.dataset.hotspot);
      handleHotspot(selected);
    });
  });
}

function visibleHotspots(scene) {
  return scene.hotspots.filter((hotspot) => {
    if (hotspot.sabbathOnly) return isSabbath();
    if (hotspot.prepOnly) return isPreparationDay();
    if (hotspot.action === "cleanRoomChore") return Boolean(state.roomChores?.[hotspot.room]?.[hotspot.chore]);
    if (hotspot.action === "washDishes") return Boolean(state.kitchenChores?.dishes);
    if (hotspot.action === "cleanCounters") return Boolean(state.kitchenChores?.counters);
    if (hotspot.action === "sweepKitchen") return Boolean(state.kitchenChores?.floor);
    return true;
  });
}

function decorationMarkup(sceneId) {
  const effect = `<span id="sceneEffectLayer" class="scene-effect-layer"></span>`;
  const buffs = buffEmblemsMarkup();
  if (sceneId === "cabin") {
    return `
      ${effect}
      ${buffs}
      <span class="lantern-glow" style="--x: 46.2%; --y: 5.8%; --w: 7.2%; --h: 13%;"></span>
      <span class="lantern-glow" style="--x: 11.8%; --y: 18.6%; --w: 6.6%; --h: 12%;"></span>
      <span class="lantern-glow" style="--x: 74%; --y: 45%; --w: 6.2%; --h: 10%;"></span>
      ${roomChoreObjects("cabin")}
    `;
  }
  if (sceneId === "livingRoom") {
    return `${effect}${buffs}${roomChoreObjects("livingRoom")}`;
  }
  if (sceneId === "bedroom") {
    return `
      ${effect}
      ${buffs}
      <span class="lantern-glow" style="--x: 76%; --y: 26%; --w: 8%; --h: 13%;"></span>
    `;
  }
  if (sceneId === "bathroom") {
    return `
      ${effect}
      ${buffs}
      <span class="lantern-glow" style="--x: 14%; --y: 20%; --w: 8%; --h: 14%;"></span>
      <span class="well-shimmer" style="--x: 75%; --y: 64%; --w: 25%; --h: 18%;"></span>
      <span class="well-shimmer" style="--x: 27%; --y: 49%; --w: 23%; --h: 12%;"></span>
    `;
  }
  if (sceneId === "forest" || sceneId === "treeFarm") {
    return `
      ${effect}
      ${buffs}
      <span class="well-shimmer" style="--x: 45%; --y: 35%; --w: 22%; --h: 13%;"></span>
      <span class="leaf" style="--x: 18%; --duration: 16s; --delay: -4s;"></span>
      <span class="leaf" style="--x: 82%; --duration: 20s; --delay: -10s;"></span>
    `;
  }
  if (sceneId === "rockQuarry") {
    return `${effect}${buffs}`;
  }
  if (sceneId === "garden" || sceneId === "fields") {
    return `
      ${effect}
      ${buffs}
      ${cropBedObjects(sceneId)}
      <span class="garden-ambient butterfly" style="--x: 16%; --y: 49%; --delay: -2s;"></span>
      <span class="garden-ambient butterfly" style="--x: 52%; --y: 35%; --delay: -5.5s;"></span>
      <span class="garden-ambient butterfly" style="--x: 74%; --y: 55%; --delay: -1s;"></span>
      <span class="garden-ambient bee" style="--x: 70%; --y: 72%; --delay: -5s;"></span>
      <span class="dew-shimmer" style="--x: 62%; --y: 70%; --w: 20%; --h: 12%;"></span>
      <span class="compost-steam" style="--x: 83%; --y: 27%; --delay: 0s;"></span>
      <span class="compost-steam" style="--x: 87%; --y: 25%; --delay: 1.4s;"></span>
    `;
  }
  if (sceneId === "apiary") {
    return `
      ${effect}
      ${buffs}
      <span class="garden-ambient bee" style="--x: 35%; --y: 48%; --delay: -2s;"></span>
      <span class="garden-ambient bee" style="--x: 64%; --y: 43%; --delay: -5s;"></span>
      <span class="dew-shimmer" style="--x: 51%; --y: 66%; --w: 20%; --h: 12%;"></span>
    `;
  }
  if (sceneId === "kitchen") {
    return `
      ${effect}
      ${buffs}
      <span class="lantern-glow" style="--x: 55%; --y: 4.5%; --w: 7%; --h: 13%;"></span>
      <span class="lantern-glow" style="--x: 31%; --y: 52%; --w: 10%; --h: 16%;"></span>
      <span class="lantern-glow" style="--x: 13%; --y: 17%; --w: 6%; --h: 10%;"></span>
      ${kitchenChoreObjects()}
    `;
  }
  if (["pantry", "workshed", "barn"].includes(sceneId)) {
    return `${effect}${buffs}${roomChoreObjects(sceneId)}`;
  }
  if (sceneId === "well") {
    return `
      ${effect}
      ${buffs}
      <span class="well-shimmer" style="--x: 9%; --y: 71%; --w: 30%; --h: 17%;"></span>
      <span class="laundry-basin"></span>
    `;
  }
  if (sceneId !== "overview") return `${effect}${buffs}`;
  return `
    ${effect}
    ${buffs}
    <span class="smoke" style="--x: 23.6%; --y: 16%; --size: 42px; --delay: 0s;"></span>
    <span class="smoke" style="--x: 24.7%; --y: 15%; --size: 34px; --delay: 6.6s;"></span>
    <span class="smoke" style="--x: 22.8%; --y: 15.8%; --size: 48px; --delay: 13.2s;"></span>
    <span class="lantern-glow" style="--x: 49.6%; --y: 42.6%; --w: 5.6%; --h: 9.5%;"></span>
    <span class="lantern-glow" style="--x: 87.8%; --y: 67.8%; --w: 5.4%; --h: 8%;"></span>
    <span class="well-shimmer" style="--x: 61.7%; --y: 72%; --w: 7.4%; --h: 7.5%;"></span>
    <span class="drift" style="--y: 9%; --w: 18%; --h: 7%; --duration: 52s; --delay: -12s;"></span>
    <span class="drift" style="--y: 15%; --w: 11%; --h: 4%; --duration: 64s; --delay: -34s;"></span>
    <span class="leaf" style="--x: 72%; --duration: 14s; --delay: -2s;"></span>
    <span class="leaf" style="--x: 78%; --duration: 18s; --delay: -9s;"></span>
  `;
}

function kitchenChoreObjects() {
  const chores = state.kitchenChores || {};
  return `
    ${state.preppedFood ? `<span class="chore-object food-prep-board" style="--x: 49%; --y: 61%;"></span>` : ""}
    ${chores.dishes ? `<span class="chore-object dirty-dishes" style="--x: 9.5%; --y: 48%;"></span>` : ""}
    ${chores.counters ? `<span class="chore-object crumbs" style="--x: 53%; --y: 45%;"></span>` : ""}
    ${chores.floor ? `<span class="chore-object dust-bunny" style="--x: 39%; --y: 76%;"></span>` : ""}
  `;
}

function roomChoreObjects(room) {
  const chores = state.roomChores?.[room] || {};
  const positions = {
    cabin: {
      dust: `<span class="chore-object dust-bunny" style="--x: 13%; --y: 78%;"></span>`,
      books: `<span class="chore-object book-stack" style="--x: 74%; --y: 52%;"></span>`
    },
    livingRoom: {
      dust: `<span class="chore-object dust-bunny" style="--x: 31%; --y: 70%;"></span>`,
      books: `<span class="chore-object book-stack" style="--x: 64%; --y: 52%;"></span>`
    },
    pantry: {
      dust: `<span class="chore-object shelf-dust" style="--x: 73%; --y: 38%;"></span>`,
      crates: `<span class="chore-object clutter-crates" style="--x: 47%; --y: 66%;"></span>`
    },
    workshed: {
      sawdust: `<span class="chore-object sawdust-pile" style="--x: 27%; --y: 73%;"></span>`
    },
    barn: {
      straw: `<span class="chore-object straw-pile" style="--x: 52%; --y: 72%;"></span>`
    }
  }[room] || {};
  return Object.entries(chores).map(([chore, active]) => active ? positions[chore] || "" : "").join("");
}

function cropBedObjects(sceneId) {
  return Object.entries(gardenBeds)
    .filter(([, bed]) => bed.scene === sceneId)
    .map(([bedId, bed]) => cropBedObject(bedId, bed))
    .join("");
}

function plantSpriteFile(cropType, stage) {
  const cat = { barley: "grain", wheat: "grain", lentils: "legume", cucumbers: "cucumber",
    onions: "allium", garlic: "allium", leeks: "allium", figs: "fig", grapes: "grape",
    hyssop: "herb", mint: "herb", cumin: "herb", coriander: "herb", dill: "herb" }[cropType] || "herb";
  return `assets/images/plants/${cat}-${stage}.svg`;
}


function cropBedObject(bedId, bedMeta) {
  const bed = state.crops[bedId];
  if (!bed) return "";
  const soilClass = bed.wateredToday ? "watered" : bed.fertilized || bed.composted ? "healthy" : bed.hasWeeds ? "overgrown" : "dry";
  const spriteHeights = ["40%", "65%", "100%", "145%", "190%"];
  const plantings = (bed.plantings || []).slice(0, 5).map((planting, index) => {
    const crop = cropTypes[planting.cropType];
    const total = Math.min(bed.plantings.length, 5);
    const rowTop = 28 + index * (42 / Math.max(total, 1));
    const rowHeight = Math.max(12, Math.min(28, 40 / Math.max(total, 1)));
    const spriteH = spriteHeights[planting.growthStage] ?? "190%";
    const readyCls = planting.readyToHarvest ? " ready" : "";
    const patch = `<span class="crop-patch ${planting.cropType} stage-${planting.growthStage}${readyCls}" style="--i:${index}; --row-top:${rowTop}%; --row-h:${rowHeight}%;" title="${crop.name}"></span>`;
    const sprite = `<img class="plant-sprite${readyCls}" src="${plantSpriteFile(planting.cropType, planting.growthStage)}" alt="" aria-hidden="true" style="--sprite-h:${spriteH}; --delay:${(index * 0.65).toFixed(2)}s; bottom:calc(100% - ${rowTop + rowHeight / 2}%);">`;
    return patch + sprite;
  }).join("");
  return `
    <span class="crop-bed-visual ${bedId} ${soilClass}" style="--x:${bedMeta.x}%; --y:${bedMeta.y}%; --w:${bedMeta.w || 17}%; --h:${bedMeta.h || 12}%; --angle:${bedMeta.angle || 0}deg;${bedMeta.clip ? ` clip-path:${bedMeta.clip};` : ""}">
      ${plantings}
      ${bed.hasWeeds ? `<span class="weed-cluster"></span>` : ""}
      ${bed.composted || bed.fertilized ? `<span class="soil-life"></span>` : ""}
    </span>
  `;
}

function triggerSceneEffect(type, target = null) {
  pendingSceneEffect = { type, target };
}

function playSceneEffect(effect) {
  const layer = document.getElementById("sceneEffectLayer");
  if (!layer) return;
  const type = typeof effect === "string" ? effect : effect.type;
  const target = typeof effect === "string" ? null : effect.target;
  const targetBed = typeof target === "string" ? gardenBeds[target] : null;
  const targetPoint = !targetBed && target && typeof target === "object" ? target : null;
  let effectStyle = "";
  if (targetBed) {
    effectStyle = ` style="--fx-x:${targetBed.x}%; --fx-y:${targetBed.y}%;"`;
  } else if (targetPoint) {
    effectStyle = ` style="--fx-x:${targetPoint.x}%; --fx-y:${targetPoint.y}%;"`;
  }
  const bedEffect = (inner) => targetBed ? `<span class="bed-effect"${effectStyle}>${inner}</span>` : inner;
  const positionedEffect = (inner) => effectStyle ? `<span class="resource-effect"${effectStyle}>${inner}</span>` : inner;
  const markup = {
    tidy: `
      <span class="tidy-sparkle" style="--x: 18%; --y: 70%; --delay: 0s;"></span>
      <span class="tidy-sparkle" style="--x: 33%; --y: 58%; --delay: 0.15s;"></span>
      <span class="tidy-sparkle" style="--x: 56%; --y: 65%; --delay: 0.3s;"></span>
      <span class="tidy-sparkle" style="--x: 73%; --y: 51%; --delay: 0.45s;"></span>
      <span class="tidy-sweep"></span>
    `,
    cook: `
      <span class="cooking-steam" style="--x: 31%; --y: 40%; --delay: 0s;"></span>
      <span class="cooking-steam" style="--x: 35%; --y: 42%; --delay: 0.28s;"></span>
      <span class="stove-warmth"></span>
    `,
    prep: `
      <span class="food-prep-board prep-effect" style="--x: 49%; --y: 61%;"></span>
      <span class="tidy-sparkle" style="--x: 45%; --y: 57%; --delay: 0s;"></span>
      <span class="tidy-sparkle" style="--x: 53%; --y: 62%; --delay: 0.2s;"></span>
    `,
    wash: `
      <span class="water-bubble" style="--x: 8%; --y: 47%; --delay: 0s;"></span>
      <span class="water-bubble" style="--x: 12%; --y: 50%; --delay: 0.18s;"></span>
      <span class="water-sparkle"></span>
    `,
    laundry: `
      <span class="water-bubble" style="--x: 9%; --y: 70%; --delay: 0s;"></span>
      <span class="water-bubble" style="--x: 17%; --y: 73%; --delay: 0.18s;"></span>
      <span class="water-bubble" style="--x: 25%; --y: 69%; --delay: 0.34s;"></span>
      <span class="laundry-basin"></span>
    `,
    hygiene: `
      <span class="water-bubble" style="--x: 28%; --y: 49%; --delay: 0s;"></span>
      <span class="water-bubble" style="--x: 74%; --y: 64%; --delay: 0.16s;"></span>
      <span class="tidy-sparkle" style="--x: 24%; --y: 36%; --delay: 0.15s;"></span>
      <span class="tidy-sparkle" style="--x: 81%; --y: 54%; --delay: 0.35s;"></span>
    `,
    rest: `
      <span class="rest-glow"></span>
      <span class="tidy-sparkle" style="--x: 36%; --y: 42%; --delay: 0s;"></span>
      <span class="tidy-sparkle" style="--x: 54%; --y: 36%; --delay: 0.22s;"></span>
      <span class="tidy-sparkle" style="--x: 67%; --y: 48%; --delay: 0.42s;"></span>
    `,
    plant: bedEffect(`
      <span class="plant-hand"></span>
      <span class="seed-drop" style="--x: 51%; --y: 54%; --delay: 0s;"></span>
      <span class="dirt-puff" style="--x: 50%; --y: 58%; --delay: 0.16s;"></span>
    `),
    waterCrop: bedEffect(`
      <span class="watering-can-effect"></span>
      <span class="water-stream"></span>
      <span class="water-bubble" style="--x: 46%; --y: 58%; --delay: 0s;"></span>
      <span class="water-bubble" style="--x: 55%; --y: 60%; --delay: 0.18s;"></span>
      <span class="soil-darken"></span>
    `),
    weed: bedEffect(`
      <span class="weed-pull"></span>
      <span class="dirt-puff" style="--x: 51%; --y: 60%; --delay: 0s;"></span>
      <span class="dirt-puff" style="--x: 55%; --y: 62%; --delay: 0.18s;"></span>
    `),
    harvest: bedEffect(`
      <span class="harvest-sweep"></span>
      <span class="basket-fill"></span>
      <span class="tidy-sparkle" style="--x: 48%; --y: 58%; --delay: 0s;"></span>
      <span class="tidy-sparkle" style="--x: 58%; --y: 55%; --delay: 0.25s;"></span>
    `),
    compost: bedEffect(`
      <span class="compost-toss"></span>
      <span class="soil-darken"></span>
      <span class="compost-steam burst" style="--x: 52%; --y: 56%; --delay: 0s;"></span>
    `),
    woodHarvest: positionedEffect(`
      <span class="falling-wood" style="--x:38%;--delay:0s;--rot:-18deg;"></span>
      <span class="falling-wood" style="--x:51%;--delay:0.12s;--rot:12deg;"></span>
      <span class="falling-wood" style="--x:63%;--delay:0.24s;--rot:28deg;"></span>
      <span class="falling-wood small" style="--x:45%;--delay:0.32s;--rot:-34deg;"></span>
      <span class="falling-wood small" style="--x:58%;--delay:0.42s;--rot:22deg;"></span>
      <span class="resource-ground-shadow"></span>
    `),
    stoneHarvest: positionedEffect(`
      <span class="falling-stone" style="--x:37%;--delay:0s;--rot:-20deg;"></span>
      <span class="falling-stone" style="--x:50%;--delay:0.1s;--rot:14deg;"></span>
      <span class="falling-stone" style="--x:63%;--delay:0.2s;--rot:32deg;"></span>
      <span class="falling-stone small" style="--x:44%;--delay:0.3s;--rot:-38deg;"></span>
      <span class="falling-stone small" style="--x:57%;--delay:0.4s;--rot:24deg;"></span>
      <span class="resource-ground-shadow stone"></span>
    `),
    barnFeed: `
      <span class="hay-strand" style="--x: 32%; --y: 35%; --rot: -18deg; --rot2: 14deg; --delay: 0s;"></span>
      <span class="hay-strand" style="--x: 42%; --y: 30%; --rot: 10deg; --rot2: -22deg; --delay: 0.1s;"></span>
      <span class="hay-strand" style="--x: 53%; --y: 33%; --rot: -8deg; --rot2: 20deg; --delay: 0.18s;"></span>
      <span class="hay-strand" style="--x: 63%; --y: 28%; --rot: 20deg; --rot2: -12deg; --delay: 0.06s;"></span>
      <span class="hay-strand" style="--x: 37%; --y: 42%; --rot: -22deg; --rot2: 8deg; --delay: 0.26s;"></span>
      <span class="hay-strand" style="--x: 58%; --y: 38%; --rot: 14deg; --rot2: -18deg; --delay: 0.34s;"></span>
      <span class="hay-strand" style="--x: 46%; --y: 26%; --rot: -6deg; --rot2: 24deg; --delay: 0.14s;"></span>
    `,
    barnWater: `
      <span class="water-pour-arc"></span>
      <span class="trough-ripple"></span>
      <span class="trough-ripple-inner"></span>
    `,
    barnCollect: `
      <span class="collect-glow"></span>
      <span class="product-star" style="--x: 28%; --y: 38%; --delay: 0s;"></span>
      <span class="product-star" style="--x: 44%; --y: 30%; --delay: 0.18s;"></span>
      <span class="product-star" style="--x: 60%; --y: 36%; --delay: 0.32s;"></span>
      <span class="product-star" style="--x: 72%; --y: 44%; --delay: 0.1s;"></span>
      <span class="product-star" style="--x: 38%; --y: 50%; --delay: 0.44s;"></span>
    `,
    barnFeathers: `
      <span class="feather-float" style="--x: 26%; --y: 28%; --dx: 20px; --rot: 14deg; --duration: 1.6s; --delay: 0s;"></span>
      <span class="feather-float" style="--x: 40%; --y: 22%; --dx: -16px; --rot: -22deg; --duration: 1.45s; --delay: 0.12s;"></span>
      <span class="feather-float" style="--x: 54%; --y: 26%; --dx: 24px; --rot: 6deg; --duration: 1.75s; --delay: 0.06s;"></span>
      <span class="feather-float" style="--x: 66%; --y: 20%; --dx: -20px; --rot: -16deg; --duration: 1.55s; --delay: 0.22s;"></span>
      <span class="feather-float" style="--x: 34%; --y: 36%; --dx: 14px; --rot: 24deg; --duration: 1.65s; --delay: 0.3s;"></span>
      <span class="feather-float" style="--x: 60%; --y: 34%; --dx: -10px; --rot: -10deg; --duration: 1.5s; --delay: 0.4s;"></span>
    `,
    barnHarvest: `
      <span class="barn-harvest-glow"></span>
      <span class="tidy-sparkle" style="--x: 34%; --y: 46%; --delay: 0.2s;"></span>
      <span class="tidy-sparkle" style="--x: 56%; --y: 40%; --delay: 0.4s;"></span>
      <span class="tidy-sparkle" style="--x: 68%; --y: 52%; --delay: 0.6s;"></span>
    `,
    sabbathWorship: `
      <span class="sabbath-glow"></span>
      <span class="sabbath-ray" style="--x:28%;--angle:-22deg;--delay:0s;"></span>
      <span class="sabbath-ray" style="--x:38%;--angle:-10deg;--delay:0.08s;"></span>
      <span class="sabbath-ray" style="--x:49%;--angle:0deg;--delay:0.04s;"></span>
      <span class="sabbath-ray" style="--x:58%;--angle:10deg;--delay:0.12s;"></span>
      <span class="sabbath-ray" style="--x:67%;--angle:22deg;--delay:0.06s;"></span>
      <span class="sabbath-petal" style="--x:22%;--y:56%;--rot:30deg;--duration:2.2s;--delay:0.3s;"></span>
      <span class="sabbath-petal" style="--x:41%;--y:62%;--rot:-20deg;--duration:1.9s;--delay:0.5s;"></span>
      <span class="sabbath-petal" style="--x:60%;--y:53%;--rot:45deg;--duration:2.3s;--delay:0.2s;"></span>
      <span class="sabbath-petal" style="--x:74%;--y:59%;--rot:-35deg;--duration:2s;--delay:0.6s;"></span>
      <span class="sabbath-petal" style="--x:33%;--y:70%;--rot:15deg;--duration:2.1s;--delay:0.4s;"></span>
    `
  }[type];
  if (!markup) return;
  layer.innerHTML = markup;
  clearTimeout(effectTimeout);
  effectTimeout = setTimeout(() => {
    layer.innerHTML = "";
  }, 2400);
}

function setSceneBackground(stage, scene) {
  stage.style.backgroundImage = `url("${scene.background}")`;
  stage.classList.toggle("has-image", imageStatus[scene.background] === true);
  if (imageStatus[scene.background] !== undefined) return;

  const image = new Image();
  image.onload = () => {
    imageStatus[scene.background] = true;
    if (state.currentScene === scene.id) renderScene();
  };
  image.onerror = () => {
    imageStatus[scene.background] = false;
    if (state.currentScene === scene.id) renderScene();
  };
  image.src = scene.background;
}

function generateDailyGoals() {
  if (isSabbath()) { state.dailyGoals = []; return; }
  const eligible = DAILY_GOAL_POOL.filter((goal) => !goal.check(state));
  const shuffled = eligible.sort(() => Math.random() - 0.5);
  state.dailyGoals = shuffled.slice(0, 3).map((goal) => ({ id: goal.id, completed: false, rewarded: false }));
}

function resolveGoal(saved) {
  const def = DAILY_GOAL_POOL.find((g) => g.id === saved.id);
  if (!def) return null;
  return { ...def, completed: saved.completed, rewarded: saved.rewarded };
}

function checkDailyGoals() {
  if (!state.dailyGoals?.length) return;
  state.dailyGoals.forEach((saved) => {
    const goal = resolveGoal(saved);
    if (!goal) return;
    if (!saved.completed && goal.check(state)) {
      saved.completed = true;
    }
    if (saved.completed && !saved.rewarded) {
      saved.rewarded = true;
      addItem("coins", goal.reward);
      state.dailyStats.coinsEarned += goal.reward;
      pushMessage(`Goal complete: "${goal.label}" — earned ${goal.reward} coins!`);
    }
  });
}

function renderGoalStrip() {
  const strip = document.getElementById("goalStrip");
  if (!strip) return;
  if (!state.dailyGoals?.length) {
    strip.innerHTML = "";
    updateMobileGoalToggle();
    return;
  }
  strip.innerHTML = state.dailyGoals.map((saved) => {
    const goal = resolveGoal(saved);
    if (!goal) return "";
    return `<div class="goal-item${saved.completed ? " goal-done" : ""}">
      <span class="goal-check">${saved.completed ? "✓" : "○"}</span>
      <span>${goal.label}</span>
      <span class="goal-reward">+${goal.reward}¢</span>
    </div>`;
  }).join("");
  updateMobileGoalToggle();
}

function updateMobileGoalToggle() {
  const button = document.getElementById("goalToggleBtn");
  const strip = document.getElementById("goalStrip");
  if (!button || !strip) return;
  const goals = state.dailyGoals || [];
  const completed = goals.filter((goal) => goal.completed).length;
  button.hidden = goals.length === 0;
  button.setAttribute("aria-expanded", String(dailyGoalsOpen));
  button.textContent = goals.length ? `Daily Goals ${completed}/${goals.length}` : "Daily Goals";
  strip.classList.toggle("open", dailyGoalsOpen);
}

function updateMobileMenuToggle() {
  const button = document.getElementById("mobileMenuBtn");
  const actions = document.getElementById("topActions");
  if (!button || !actions) return;
  button.setAttribute("aria-expanded", String(mobileMenuOpen));
  button.textContent = mobileMenuOpen ? "Hide Menu" : "Menu";
  actions.classList.toggle("open", mobileMenuOpen);
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  updateMobileMenuToggle();
}

function toggleGoalStrip() {
  dailyGoalsOpen = !dailyGoalsOpen;
  updateMobileGoalToggle();
}

function showDaySummary(afterNextDay = null) {
  const markup = daySummaryMarkup();
  openCustomModal(`End of Day ${state.day}`, markup);
  document.getElementById("beginNewDayBtn")?.addEventListener("click", () => {
    closeModal();
    nextDay();
    if (afterNextDay) afterNextDay();
  });
}

function daySummaryMarkup() {
  const s = state.dailyStats;
  const goals = state.dailyGoals || [];
  const verse = SUMMARY_VERSES[state.day % SUMMARY_VERSES.length];

  const statItems = [
    { val: s.cropsWatered,            label: "Beds Watered" },
    { val: s.cropsHarvested,          label: "Harvests" },
    { val: s.cropsPlanted,            label: "Seeds Planted" },
    { val: s.mealsCooked,             label: "Meals Cooked" },
    { val: s.itemsCrafted,            label: "Items Crafted" },
    { val: s.animalProductsCollected, label: "Animal Products" },
    { val: s.fishCaught,              label: "Fish Caught" },
    { val: s.deerHunted,              label: "Deer Hunted" },
    { val: s.ordersFilled,            label: "Orders Filled" },
    { val: s.choresCompleted,         label: "Chores Done" },
    { val: s.coinsEarned,             label: "Coins Earned" },
  ].filter((item) => item.val > 0);

  const statsHtml = statItems.length
    ? `<div class="summary-stats">${statItems.map((item) => `
        <div class="summary-stat">
          <span class="stat-val">${item.val}</span>
          <span class="stat-label">${item.label}</span>
        </div>`).join("")}</div>`
    : `<p class="hint-text">A quiet day on the homestead.</p>`;

  const resolvedGoals = goals.map(resolveGoal).filter(Boolean);
  const goalsHtml = resolvedGoals.length
    ? `<div class="summary-goals">
        <h4>Daily Goals</h4>
        ${resolvedGoals.map((g) => `<div class="summary-goal-row">
          <span class="sgr-check">${g.completed ? "✅" : "⬜"}</span>
          <span>${g.label}</span>
          <span class="sgr-reward">${g.completed ? `+${g.reward}¢` : `${g.reward}¢`}</span>
        </div>`).join("")}
      </div>`
    : "";

  const verseHtml = verse
    ? `<blockquote class="summary-verse">"${verse.text}"<cite>— ${verse.ref}</cite></blockquote>`
    : "";

  return `<div class="day-summary-header">
    <h3>Day ${state.day} Complete</h3>
    <p>${weekdayName()} · ${seasons[state.seasonIndex]} · ${weatherCycle[state.weatherIndex]}</p>
  </div>
  ${statsHtml}
  ${goalsHtml}
  ${verseHtml}
  <button class="summary-begin-btn" id="beginNewDayBtn" type="button">Begin Day ${state.day + 1}</button>`;
}

function goals() {
  const list = [];
  if (isPreparationDay()) list.push("Complete Sabbath preparation, then enter Sabbath Rest.");
  if (isSabbath()) list.push("Rest, read, navigate peacefully, and water only as necessary.");
  if (!isSabbath()) list.push("Order seeds, tend crop beds, gather resources, cook clean food, and craft useful items.");
  if (state.pendingOrders.length) list.push("Check the delivery crate for arrived orders.");
  list.push("Use H to toggle hotspot borders while adjusting scenes.");
  return list;
}

function pushMessage(message) {
  state.messages = [message, ...(state.messages || [])].slice(0, 8);
  showToast(message);
  scheduleAutosave();
}

function showToast(message) {
  const messageBar = document.getElementById("messageBar");
  if (!messageBar) return;
  messageBar.textContent = message;
  messageBar.classList.add("visible");
  clearTimeout(messageTimeout);
  messageTimeout = setTimeout(() => {
    messageBar.classList.remove("visible");
  }, 4200);
}

function startGameTick() {
  if (gameTick) clearInterval(gameTick);
  gameTick = setInterval(onGameTick, GAME_TICK_MS);
}

function onGameTick() {
  // Pause while any modal is open
  if (!document.getElementById("modalBackdrop")?.classList.contains("hidden")) return;
  // Pause during Sabbath rest
  if (state.isSabbathRest) return;

  // Advance time by 1 game minute
  applyTimeNeeds(1);
  state.minute += 1;
  if (state.minute >= NIGHTFALL_MINUTE) {
    state.minute = NIGHTFALL_MINUTE;
    showDaySummary();
    return;
  }
  render();
}

function bindEvents() {
  document.querySelector(".topbar h1")?.addEventListener("click", handleTitleTesterTap);
  document.getElementById("mobileMenuBtn")?.addEventListener("click", toggleMobileMenu);
  document.getElementById("goalToggleBtn")?.addEventListener("click", toggleGoalStrip);
  document.getElementById("topActions")?.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      mobileMenuOpen = false;
      updateMobileMenuToggle();
    }
  });
  document.getElementById("homesteadBtn").addEventListener("click", () => openHomesteadMaintenanceModal());
  document.getElementById("statusBtn").addEventListener("click", () => openModal("status"));
  document.getElementById("areasBtn").addEventListener("click", () => openModal("areas"));
  document.getElementById("inventoryBtn").addEventListener("click", () => openModal("inventory"));
  document.getElementById("craftingBtn").addEventListener("click", () => openModal("crafting"));
  document.getElementById("cookingBtn").addEventListener("click", () => openModal("cooking"));
  document.getElementById("journalBtn").addEventListener("click", () => openModal("journal"));
  document.getElementById("messagesBtn").addEventListener("click", () => openModal("messages"));
  document.getElementById("ordersBtn").addEventListener("click", () => openModal("orders"));
  document.getElementById("debugBtn").addEventListener("click", toggleDebug);
  document.getElementById("saveBtn").addEventListener("click", () => openModal("save"));
  document.getElementById("nextDayBtn").addEventListener("click", showDaySummary);
  document.getElementById("resetSaveBtn").addEventListener("click", resetSave);
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  const landscapeHint = document.getElementById("landscapeHint");
  if (landscapeHint) {
    landscapeHint.addEventListener("click", () => { landscapeHint.style.display = "none"; });
  }
  document.getElementById("modalBackdrop").addEventListener("click", (event) => {
    if (event.target.id === "modalBackdrop") closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (handleHiddenTesterShortcut(event)) return;
    if (isTextEntryTarget(event.target)) return;
    const key = event.key.toLowerCase();
    if (key === "escape") closeModal();
    if (key === "j") openModal("journal");
    if (key === "i") openModal("inventory");
    if (key === "c") openModal("crafting");
    if (key === "k") openModal("cooking");
    if (key === "h") toggleDebug();
    if (key === "r") {
      restAtCabin();
      render();
    }
    if (key === "s" && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      saveGame(true);
      render();
    }
  });
  window.addEventListener("beforeunload", () => saveGame(false));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveGame(false);
  });
}

function isTextEntryTarget(target) {
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName);
}

function handleHiddenTesterShortcut(event) {
  if (isTextEntryTarget(event.target)) return false;
  const key = event.key.toLowerCase();
  if (event.ctrlKey && event.shiftKey && key === "t") {
    event.preventDefault();
    openModal("tester");
    pushMessage("Hidden tester panel opened.");
    return true;
  }
  if (key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return false;
  hiddenTesterBuffer = `${hiddenTesterBuffer}${key}`.slice(-TESTER_CODE.length);
  if (hiddenTesterBuffer === TESTER_CODE) {
    hiddenTesterBuffer = "";
    openModal("tester");
    pushMessage("Hidden tester panel opened.");
    return true;
  }
  if (TESTER_CODE.startsWith(hiddenTesterBuffer)) return true;
  return false;
}

function handleTitleTesterTap() {
  const now = Date.now();
  titleTapCount = now - lastTitleTap > 1600 ? 1 : titleTapCount + 1;
  lastTitleTap = now;
  if (titleTapCount >= 7) {
    titleTapCount = 0;
    openModal("tester");
    pushMessage("Hidden tester panel opened.");
  }
}

function toggleDebug() {
  state.hotspotDebug = !state.hotspotDebug;
  pushMessage(`Hotspot debug ${state.hotspotDebug ? "enabled" : "disabled"}.`);
  render();
}

function init() {
  loadGame();
  if (!state.dailyGoals?.length) generateDailyGoals();
  bindEvents();
  updateMobileMenuToggle();
  render();
  startGameTick();
}

init();
