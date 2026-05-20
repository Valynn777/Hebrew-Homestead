"use strict";

const SAVE_VERSION = 4;
const SAVE_KEY = "hebrew-homestead-click-v1";
const SAVE_BACKUP_KEY = `${SAVE_KEY}-backup`;

const weekdays = ["Day One", "Day Two", "Day Three", "Day Four", "Day Five", "Preparation Day", "Sabbath"];
const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const weatherCycle = ["Clear", "Gentle Clouds", "Light Rain", "Warm Breeze", "Still Evening", "Soft Rain"];

const sceneImages = {
  overview: "assets/images/scenes/homestead-overview.png",
  cabin: "assets/images/scenes/cabin-entry.png",
  kitchen: "assets/images/scenes/kitchen.png",
  livingRoom: "assets/images/scenes/living-room.png",
  bedroom: "assets/images/scenes/bedroom.png",
  pantry: "assets/images/scenes/pantry.png",
  barn: "assets/images/scenes/barn.png",
  garden: "assets/images/scenes/garden.png",
  workshed: "assets/images/scenes/workshed.png",
  forest: "assets/images/scenes/forest.png",
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
      hs("sabbath", "Sabbath Area", 77, 61, 21, 30, "navigate", { target: "sabbath" })
    ]
  },
  cabin: {
    id: "cabin",
    title: "Cabin Entry",
    description: "A quiet entry room for rest, tidying, and preparing the household for the week.",
    background: sceneImages.cabin,
    hotspots: [
      hs("kitchen", "Kitchen", 15, 20, 16, 43, "navigate", { target: "kitchen" }),
      hs("livingRoom", "Living Room", 84, 20, 14, 48, "navigate", { target: "livingRoom" }),
      hs("outside", "Back Outside", 39, 16, 15, 51, "navigate", { target: "overview" }),
      hs("journal", "Journal", 65, 40, 17, 19, "modal", { modal: "journal" }),
      hs("dustBench", "Sweep Dust", 2, 61, 22, 27, "cleanRoomChore", { room: "cabin", chore: "dust", effect: "tidy", message: "The entry bench is swept clean." }),
      hs("putAwayBooks", "Put Books Away", 65, 40, 17, 19, "cleanRoomChore", { room: "cabin", chore: "books", effect: "tidy", message: "The books are set neatly in place." })
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
      hs("dresser", "Dresser", 80, 36, 15, 26, "modal", { modal: "inventory" }),
      hs("back", "Back to Living Room", 0, 13, 14, 48, "navigate", { target: "livingRoom" })
    ]
  },
  kitchen: {
    id: "kitchen",
    title: "Kitchen",
    description: "Clean food is prepared here with simple ingredients, water, and gratitude.",
    background: sceneImages.kitchen,
    hotspots: [
      hs("sink", "Wash Dishes", 4, 38, 15, 24, "washDishes"),
      hs("stove", "Stove / Cooking", 25, 40, 17, 27, "modal", { modal: "cooking" }),
      hs("iceBox", "Ice Box", 64, 21, 18, 53, "modal", { modal: "iceBox" }),
      hs("pantryDoor", "Pantry", 82, 18, 14, 35, "navigate", { target: "pantry" }),
      hs("counters", "Clean Counters", 45, 42, 19, 19, "cleanCounters"),
      hs("basket", "Sabbath Basket", 47, 56, 17, 14, "setSabbathBasket"),
      hs("jar", "Water Jar", 47, 65, 12, 18, "waterJar"),
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
      hs("chickens", "Chickens", 34, 63, 22, 24, "animal", { animal: "chickens" }),
      hs("goats", "Goats", 2, 70, 29, 26, "animal", { animal: "goats" }),
      hs("sheep", "Sheep", 50, 56, 22, 26, "animal", { animal: "sheep" }),
      hs("cattle", "Cattle", 43, 36, 35, 26, "animal", { animal: "cattle" }),
      hs("feedTrough", "Add Feed", 7, 53, 21, 18, "addFeedTrough"),
      hs("waterTrough", "Add Water", 73, 62, 22, 23, "addWaterTrough"),
      hs("cleanBarn", "Clean Barn", 37, 55, 30, 28, "cleanBarn"),
      hs("storage", "Storage Loft", 16, 2, 45, 18, "modal", { modal: "inventory" }),
      hs("shop", "Animal Market", 28, 30, 18, 18, "modal", { modal: "shop" }),
      hs("sweepHay", "Sweep Loose Straw", 38, 62, 28, 22, "cleanRoomChore", { room: "barn", chore: "straw", effect: "tidy", message: "Loose straw is swept into a neat pile." }),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  garden: {
    id: "garden",
    title: "Garden",
    description: "Clean crop beds, herbs, compost, and a watering can provide steady lessons in patience.",
    background: sceneImages.garden,
    hotspots: [
      hs("wateringCan", "Refill Watering Can", 15, 69, 14, 16, "refillWateringCan"),
      hs("barleyBed", "Barley Bed", 33, 35, 24, 18, "crop", { crop: "barley" }),
      hs("lentilBed", "Lentil Bed", 54, 39, 25, 17, "crop", { crop: "lentils" }),
      hs("cucumberBed", "Cucumber Bed", 25, 55, 29, 20, "crop", { crop: "cucumbers" }),
      hs("herbPatch", "Herb Patch", 59, 67, 24, 25, "gatherHerbs"),
      hs("compost", "Compost Area", 74, 23, 19, 21, "compost"),
      hs("fieldsGate", "More Fields", 46, 12, 18, 19, "navigate", { target: "fields" }),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  fields: {
    id: "fields",
    title: "Additional Fields",
    description: "New beds beyond the fence give the homestead room to grow more clean food.",
    background: sceneImages.garden,
    hotspots: [
      hs("barleyField", "Barley Field", 31, 34, 25, 18, "crop", { crop: "barleyField" }),
      hs("lentilField", "Lentil Field", 54, 39, 25, 17, "crop", { crop: "lentilField" }),
      hs("cucumberField", "Cucumber Field", 66, 55, 25, 17, "crop", { crop: "cucumberField" }),
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
      hs("trees", "Harvest Trees", 0, 0, 31, 51, "harvestTrees"),
      hs("stonePile", "Stone Pile", 58, 63, 27, 24, "stonePile"),
      hs("herbs", "Herb Forage", 74, 51, 20, 30, "forestGather", { resource: "herbs", amount: 2, stamina: 4, prep: "gatherHerbs" }),
      hs("pond", "Pond / Stream", 43, 33, 24, 16, "fishPond"),
      hs("deer", "Deer", 52, 26, 24, 18, "huntDeer"),
      hs("home", "Back Home", 4, 8, 17, 13, "navigate", { target: "overview" })
    ]
  },
  well: {
    id: "well",
    title: "Well / Water Area",
    description: "Water for the home, garden, cooking, and Sabbath preparation is gathered here.",
    background: sceneImages.well,
    hotspots: [
      hs("gatherWater", "Gather Water", 31, 45, 22, 25, "gatherWater"),
      hs("fillJar", "Fill Water Jar", 58, 46, 20, 21, "fillWaterJar"),
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
      hs("enter", "Enter Sabbath Rest", 66, 38, 23, 20, "enterSabbath"),
      hs("reflection", "Read Sabbath Reflection", 34, 67, 30, 17, "sabbathReflection"),
      hs("outside", "Back Outside", 4, 8, 17, 13, "navigate", { target: "overview" })
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
  barley: "Barley",
  lentils: "Lentils",
  cucumbers: "Cucumbers",
  preparedFood: "Prepared Food",
  plantMatter: "Plant Matter",
  coins: "Coins",
  barleySeeds: "Barley Seeds",
  lentilSeeds: "Lentil Seeds",
  cucumberSeeds: "Cucumber Seeds",
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
  beefStew: "Beef Stew"
};

const starterInventory = {
  water: 6,
  wood: 0,
  logs: 0,
  stone: 0,
  herbs: 5,
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
  beefStew: 0
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

const cropCatalog = {
  barley: {
    name: "Barley",
    cleanStatus: "clean",
    category: "grain",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Water once each growing day.",
    seedItem: "barleySeeds",
    harvestItem: "barley",
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
    gardeningNote: "Cucumbers grow quickly in warmth and appreciate regular watering."
  },
  barleyField: {
    name: "Barley Field",
    cleanStatus: "clean",
    category: "grain",
    season: "Spring",
    daysToMature: 3,
    waterNeeds: "Water once each growing day.",
    seedItem: "barleySeeds",
    harvestItem: "barley",
    gardeningNote: "An expanded barley bed gives more room for clean grain."
  },
  lentilField: {
    name: "Lentil Field",
    cleanStatus: "clean",
    category: "legume",
    season: "Spring",
    daysToMature: 4,
    waterNeeds: "Keep evenly watered while sprouting.",
    seedItem: "lentilSeeds",
    harvestItem: "lentils",
    gardeningNote: "An expanded lentil bed supports clean legumes for the pantry."
  },
  cucumberField: {
    name: "Cucumber Field",
    cleanStatus: "clean",
    category: "vegetable",
    season: "Summer",
    daysToMature: 3,
    waterNeeds: "Needs steady moisture for crisp fruit.",
    seedItem: "cucumberSeeds",
    harvestItem: "cucumbers",
    gardeningNote: "An expanded cucumber bed makes room for more summer produce."
  }
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
  beefStew: { cleanStatus: "clean", category: "prepared clean food" }
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
  recipe("sabbathBasket", "Sabbath Basket", { wood: 1, herbs: 1, preparedFood: 1, water: 1 }, "A basket set aside before Sabbath.", "tool")
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
  recipe("beefStew", "Beef Stew", { beef: 1, herbs: 1, water: 1 }, "Clean cattle meat prepared with care and without blood.", "food", { preparedFood: 1 })
];

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
    cleanNote: "Chickens are handled here as reviewed clean birds. Meat is prepared without blood."
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
    cleanNote: "Sheep are clean livestock. Wool can be gathered with shears."
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
    cleanNote: "Goats are clean livestock. Milk requires a bucket."
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
    cleanNote: "Cattle are clean livestock. Milk requires a bucket."
  }
};

const shopBuyItems = [
  shopItem("hay", "Hay", 2, "item", 3),
  shopItem("feed", "Feed", 3, "item", 3),
  shopItem("fertilizer", "Fertilizer", 4, "item", 1),
  shopItem("flax", "Flax", 2, "item", 2),
  shopItem("barleySeeds", "Barley Seeds", 2, "item", 1),
  shopItem("lentilSeeds", "Lentil Seeds", 2, "item", 1),
  shopItem("cucumberSeeds", "Cucumber Seeds", 2, "item", 1),
  shopItem("cloth", "Cloth", 3, "item", 1),
  shopItem("ironToolHead", "Iron Tool Head", 5, "item", 1),
  shopItem("wateringCan", "Watering Can", 6, "tool", 1),
  shopItem("bucket", "Bucket", 7, "tool", 1),
  shopItem("shears", "Shears", 7, "tool", 1),
  shopItem("chickens", "Chicken", animalCatalog.chickens.buyCost, "animal", 1),
  shopItem("sheep", "Sheep", animalCatalog.sheep.buyCost, "animal", 1),
  shopItem("goats", "Goat", animalCatalog.goats.buyCost, "animal", 1),
  shopItem("cattle", "Cow", animalCatalog.cattle.buyCost, "animal", 1)
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
  sellItem("herbs", 2),
  sellItem("wood", 1),
  sellItem("stone", 1)
];

function shopItem(id, name, cost, type, amount) {
  return { id, name, cost, type, amount };
}

function sellItem(id, price) {
  return { id, price };
}

const sabbathTasks = [
  { id: "gatherWater", label: "Gather water", location: "Well / Water Area" },
  { id: "prepareFood", label: "Prepare clean food", location: "Kitchen" },
  { id: "gatherHerbs", label: "Gather herbs", location: "Garden or Forest" },
  { id: "tidyCottage", label: "Tidy the cottage", location: "Cabin Entry" },
  { id: "putToolsAway", label: "Put tools away", location: "Workshed" },
  { id: "sabbathBasket", label: "Set aside Sabbath basket", location: "Kitchen or Sabbath Area" }
];

const journalEntries = [
  entry("welcome", "Welcome to Hebrew Homestead", "This homestead is a place to work, rest, and learn with gratitude. Click scenes, tend clean crops, prepare for Sabbath, and notice how Yehovah's instructions bring order and delight."),
  entry("gardening", "Gardening Basics", "Plant clean seed, water faithfully, and give crops time. Growth is not rushed; the player waters, waits, and receives the increase with thanks."),
  entry("barley", "Barley", "Barley is a clean grain and an early crop in the land. It likes cooler weather and well-drained soil."),
  entry("lentils", "Lentils", "Lentils are clean legumes, simple and nourishing. They grow best in loose soil with steady moisture while sprouting."),
  entry("cucumbers", "Cucumbers", "Cucumbers are clean garden produce. They enjoy warmth and regular water."),
  entry("herbs", "Herbal Notes and Safety", "Herbs are educational here. They may be traditionally used for fragrance, food, or gentle support. Use caution; herb notes do not replace medical care."),
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
  entry("shalomRest", "Shalom Rest", "After Sabbath, stamina and energy are restored. Rest strengthens the next work day and reminds the homestead that trust is part of provision.")
];

function entry(id, title, body) {
  return { id, title, body };
}

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

const TESTER_CODE = "blessing";

function createNewState() {
  return {
    currentScene: "overview",
    day: 1,
    minute: 7 * 60,
    seasonIndex: 0,
    weatherIndex: 0,
    stamina: 100,
    energy: 100,
    inventory: { ...starterInventory },
    tools: { ...starterTools },
    crops: Object.fromEntries(Object.keys(cropCatalog).map((key) => [key, emptyCrop()])),
    barnAnimals: createBarnAnimals(),
    kitchenChores: { dishes: false, counters: false, floor: false },
    roomChores: createRoomChores(),
    pendingOrders: [],
    sabbathPrep: Object.fromEntries(sabbathTasks.map((task) => [task.id, false])),
    shalomRestDays: 0,
    restedBuffDays: 0,
    isSabbathRest: false,
    hotspotDebug: false,
    journalUnlocked: Object.fromEntries(journalEntries.map((item) => [item.id, item.id !== "shalomRest"])),
    messages: ["Welcome to Hebrew Homestead. Click a scene hotspot to begin."]
  };
}

function emptyCrop() {
  return { planted: false, growthStage: 0, daysWatered: 0, wateredToday: false, weededToday: false, fertilized: false, hasWeeds: false, readyToHarvest: false };
}

function createBarnAnimals() {
  return Object.fromEntries(Object.keys(animalCatalog).map((key) => [key, emptyAnimalGroup()]));
}

function emptyAnimalGroup() {
  return { count: 0, fedToday: false, wateredToday: false, cleanedToday: false, productCollectedToday: false, feathersCollectedToday: false };
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
  return {
    ...createNewState(),
    ...savedState,
    inventory: { ...starterInventory, ...(savedState.inventory || {}) },
    tools: { ...starterTools, ...(savedState.tools || {}) },
    crops: { ...createNewState().crops, ...(savedState.crops || {}) },
    barnAnimals: mergeBarnAnimals(savedState.barnAnimals || {}),
    kitchenChores: { dishes: false, counters: false, floor: false, ...(savedState.kitchenChores || {}) },
    roomChores: mergeRoomChores(savedState.roomChores || {}),
    sabbathPrep: { ...Object.fromEntries(sabbathTasks.map((task) => [task.id, false])), ...(savedState.sabbathPrep || {}) },
    journalUnlocked: { ...Object.fromEntries(journalEntries.map((item) => [item.id, item.id !== "shalomRest"])), ...(savedState.journalUnlocked || {}) },
    messages: savedState.messages?.length ? savedState.messages : ["Saved homestead loaded."]
  };
}

function mergeBarnAnimals(savedAnimals) {
  const base = createBarnAnimals();
  return Object.fromEntries(Object.entries(base).map(([animal, data]) => [
    animal,
    { ...data, ...(savedAnimals[animal] || {}) }
  ]));
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
  return state.shalomRestDays > 0 || state.restedBuffDays > 0;
}

function canDoLabor(action) {
  if (!isSabbath()) return true;
  if (action === "water" || action === "read" || action === "navigate" || action === "rest" || action === "animalCare") return true;
  pushMessage("Sabbath rest has begun. Ordinary labor waits; peaceful navigation, reading, and necessary care remain open.");
  return false;
}

function spendStamina(amount) {
  const cost = Math.max(1, amount - (hasRestedStaminaBoost() ? 1 : 0));
  if (!hasStamina(amount)) return false;
  state.stamina -= cost;
  advanceTime(20);
  return true;
}

function hasStamina(amount) {
  const cost = Math.max(1, amount - (hasRestedStaminaBoost() ? 1 : 0));
  if (state.stamina >= cost) return true;
  pushMessage("You are low on stamina. Rest in the cabin.");
  return false;
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
  if (action === "storeHarvest") openModal("inventory", "Pantry Inventory");
  if (action === "crop") openCropModal(hotspot.crop);
  if (action === "gatherHerbs") gatherHerbs();
  if (action === "compost") compostArea();
  if (action === "refillWateringCan") refillWateringCan();
  if (action === "putToolsAway") putToolsAway();
  if (action === "forestGather") forestGather(hotspot);
  if (action === "smallTree") chopSmallTree();
  if (action === "harvestTrees") harvestTrees();
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
  if (action === "enterSabbath") enterSabbathRest();
  if (action === "sabbathReflection") sabbathReflection();
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
  state.energy = Math.min(100, state.energy + 35);
  state.stamina = Math.min(100, state.stamina + 35);
  advanceTime(90);
  pushMessage("You rested in the cabin and recovered energy.");
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
  if (!canDoLabor("tidy") || !spendStamina(2)) return;
  state.roomChores[room][chore] = false;
  if (room === "cabin") markPrep("tidyCottage");
  triggerSceneEffect(effect);
  pushMessage(message);
}

function washDishes() {
  if (!state.kitchenChores.dishes) {
    pushMessage("The dishes are already clean.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(2)) return;
  state.kitchenChores.dishes = false;
  triggerSceneEffect("wash");
  pushMessage("The dishes are washed and set in order.");
}

function cleanCounters() {
  if (!state.kitchenChores.counters) {
    pushMessage("The counters are already clean.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(2)) return;
  state.kitchenChores.counters = false;
  triggerSceneEffect("tidy");
  pushMessage("The counters are wiped clean.");
}

function sweepKitchen() {
  if (!state.kitchenChores.floor) {
    pushMessage("The kitchen floor is already tidy.");
    return;
  }
  if (!canDoLabor("tidy") || !spendStamina(3)) return;
  state.kitchenChores.floor = false;
  triggerSceneEffect("tidy");
  pushMessage("The kitchen floor is swept and peaceful.");
}

function putToolsAway() {
  if (!canDoLabor("tidy") || !spendStamina(3)) return;
  markPrep("putToolsAway");
  pushMessage("Tools are put away for Sabbath preparation.");
}

function gatherWater() {
  addItem("water", 3);
  markPrep("gatherWater");
  advanceTime(15);
  pushMessage("Gathered water for the homestead.");
}

function fillWaterJar() {
  addItem("water", 2);
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

function gatherHerbs() {
  if (!canDoLabor("gather") || !spendStamina(4)) return;
  addItem("herbs", 2);
  markPrep("gatherHerbs");
  pushMessage("Gathered clean herbs. Herbal learning remains cautious and educational.");
}

function compostArea() {
  if (!canDoLabor("compost") || !spendStamina(3)) return;
  addItem("plantMatter", 1);
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
  const needed = Math.max(0, 6 - (state.inventory.wateringCanWater || 0));
  if (!needed) {
    pushMessage("The watering can is already full.");
    return;
  }
  const amount = Math.min(needed, state.inventory.water);
  state.inventory.water -= amount;
  addItem("wateringCanWater", amount);
  pushMessage(`Refilled the watering can with ${amount} water.`);
}

function forestGather(hotspot) {
  if (!canDoLabor("gather") || !spendStamina(hotspot.stamina)) return;
  addItem(hotspot.resource, hotspot.amount);
  if (hotspot.prep) markPrep(hotspot.prep);
  pushMessage(`Gathered ${hotspot.amount} ${itemLabels[hotspot.resource]}.`);
}

function chopSmallTree() {
  if (!state.tools.basicAxe) {
    pushMessage("You need an axe to chop this tree.");
    return;
  }
  if (!canDoLabor("chop") || !spendStamina(12)) return;
  addItem("wood", 4);
  addItem("logs", 1);
  pushMessage("Used the basic axe to chop a small tree and gather extra wood.");
}

function harvestTrees() {
  if (!state.tools.basicAxe) {
    pushMessage("You need an axe to harvest trees.");
    return;
  }
  if (!canDoLabor("chop") || !spendStamina(12)) return;
  addItem("wood", 5);
  addItem("logs", 2);
  pushMessage("Used the basic axe to harvest wood from the forest trees.");
}

function stonePile() {
  if (!canDoLabor("mine")) return;
  if (state.tools.pickaxe) {
    if (!spendStamina(8)) return;
    addItem("stone", 4);
    pushMessage("Used the pickaxe to gather stone from the forest pile.");
    return;
  }
  if (!spendStamina(5)) return;
  addItem("stone", 1);
  pushMessage("Picked up loose stones by hand. A pickaxe would gather more.");
}

function fishPond() {
  if (!state.tools.fishingPole && !state.tools.fishingNet) {
    pushMessage("You need a fishing pole or net to catch clean fish here.");
    return;
  }
  if (!canDoLabor("fish") || !spendStamina(state.tools.fishingNet ? 6 : 8)) return;
  addItem("cleanFish", state.tools.fishingNet ? 2 : 1);
  pushMessage("Caught clean fish from the pond, keeping only fish with fins and scales.");
}

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
  state.inventory.arrows -= 1;
  addItem("venison", 2);
  addItem("hide", 1);
  addItem("fur", 1);
  pushMessage("Harvested clean wild game with care: venison, hide, and fur were added.");
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
  state.inventory.preparedFood -= 1;
  state.inventory.water -= 1;
  state.inventory.herbs -= 1;
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

function openAnimalModal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!catalog || !group) return;
  const cards = [
    `<article class="modal-card">
      <h3>${catalog.name}</h3>
      <p><strong>Owned:</strong> ${group.count}</p>
      <p><strong>Status:</strong> ${animalStatus(group)}</p>
      <p>${catalog.cleanNote}</p>
    </article>`,
    buttonCard("Feed", `Requires ${catalog.feedNeed} hay or feed. Feeding is ordinary care and may be done as necessity.`, () => feedAnimal(animalId), group.count <= 0 || !hasAnimalFeed(catalog.feedNeed)),
    buttonCard("Clean", "Clean the stall and keep the animals healthy.", () => cleanAnimal(animalId), group.count <= 0),
    buttonCard(catalog.productLabel, animalProductText(catalog), () => collectAnimalProduct(animalId), group.count <= 0 || group.productCollectedToday || !animalProductToolReady(catalog) || isSabbath()),
    animalId === "chickens" ? buttonCard("Collect Feathers", "Gather loose feathers for arrow crafting.", () => collectChickenFeathers(), group.count <= 0 || group.feathersCollectedToday || isSabbath()) : "",
    buttonCard("Harvest", `Harvest one ${catalog.singular.toLowerCase()} for clean meat and useful materials. This is never available on Sabbath.`, () => harvestAnimal(animalId), group.count <= 0 || !canPreviewLabor("harvest"))
  ];
  openCustomModal(catalog.name, `<div class="card-grid">${cards.join("")}</div>`);
  bindModalActions({
    feed: () => feedAnimal(animalId),
    clean: () => cleanAnimal(animalId),
    [catalog.productLabel.toLowerCase()]: () => collectAnimalProduct(animalId),
    "collect feathers": () => collectChickenFeathers(),
    harvest: () => harvestAnimal(animalId)
  });
}

function animalStatus(group) {
  return [
    group.fedToday ? "fed" : "needs feed",
    group.wateredToday ? "watered" : "needs water",
    group.cleanedToday ? "clean" : "needs cleaning",
    group.productCollectedToday ? "product collected" : "product available if fed"
  ].join(", ");
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
  state.inventory.feed -= feedUsed;
  const remaining = amount - feedUsed;
  if (remaining > 0) state.inventory.hay -= remaining;
}

function feedAnimal(animalId) {
  const catalog = animalCatalog[animalId];
  const group = state.barnAnimals[animalId];
  if (!group.count) {
    pushMessage(`You do not own any ${catalog.name.toLowerCase()} yet.`);
    return;
  }
  if (!hasAnimalFeed(catalog.feedNeed)) {
    pushMessage(`You need ${catalog.feedNeed} hay or feed for the ${catalog.name.toLowerCase()}.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(2)) return;
  spendAnimalFeed(catalog.feedNeed);
  group.fedToday = true;
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
  addItem(catalog.product, Math.max(1, group.count * catalog.productAmount));
  group.productCollectedToday = true;
  closeModal();
  pushMessage(`${catalog.productLabel} complete: ${itemLabels[catalog.product]} added.`);
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
  addItem(catalog.meatItem, catalog.meatAmount);
  if (catalog.secondaryItem) addItem(catalog.secondaryItem, catalog.secondaryAmount);
  closeModal();
  pushMessage(`Harvested one ${catalog.singular.toLowerCase()} with care. Clean meat was prepared without blood.`);
}

function openBarnCareModal() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
  const canWater = totalAnimals > 0 && (state.inventory.water || 0) >= totalAnimals;
  const neededFeed = Object.entries(animalCatalog).reduce((sum, [id, catalog]) => {
    return sum + ((state.barnAnimals[id]?.count || 0) > 0 ? catalog.feedNeed : 0);
  }, 0);
  openCustomModal("Water / Cleaning", `<div class="card-grid">
    <article class="modal-card">
      <h3>Add Feed</h3>
      <p>Requires ${neededFeed} hay or feed for all owned animal groups.</p>
      <button type="button" data-modal-action="addfeed" ${totalAnimals > 0 && hasAnimalFeed(neededFeed) ? "" : "disabled"}>Add Feed</button>
    </article>
    <article class="modal-card">
      <h3>Water Animals</h3>
      <p>Requires ${totalAnimals} water for all owned barn animals.</p>
      <button type="button" data-modal-action="wateranimals" ${canWater ? "" : "disabled"}>Water Animals</button>
    </article>
    <article class="modal-card">
      <h3>Clean Barn</h3>
      <p>Collect manure for fertilizer while tidying the barn.</p>
      <button type="button" data-modal-action="cleanbarn" ${totalAnimals > 0 ? "" : "disabled"}>Clean Barn</button>
    </article>
    <article class="modal-card">
      <h3>Barn Summary</h3>
      <p>${barnAnimalSummary()}</p>
    </article>
  </div>`);
  bindModalActions({ addfeed: addFeedTrough, wateranimals: waterBarnAnimals, cleanbarn: cleanBarnForManure });
}

function waterBarnAnimals() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
  if (!totalAnimals) {
    pushMessage("There are no animals to water yet.");
    return;
  }
  if ((state.inventory.water || 0) < totalAnimals) {
    pushMessage("Gather more water before watering all animals.");
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  state.inventory.water -= totalAnimals;
  Object.values(state.barnAnimals).forEach((group) => {
    if (group.count > 0) group.wateredToday = true;
  });
  markPrep("gatherWater");
  closeModal();
  pushMessage("All barn animals were watered.");
}

function addFeedTrough() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
  if (!totalAnimals) {
    pushMessage("Buy animals before filling the feed trough.");
    return;
  }
  const needed = Object.entries(animalCatalog).reduce((sum, [id, catalog]) => {
    return sum + ((state.barnAnimals[id]?.count || 0) > 0 ? catalog.feedNeed : 0);
  }, 0);
  if (!hasAnimalFeed(needed)) {
    pushMessage(`You need ${needed} hay or feed to fill the trough for all animal groups.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  spendAnimalFeed(needed);
  Object.values(state.barnAnimals).forEach((group) => {
    if (group.count > 0) group.fedToday = true;
  });
  closeModal();
  pushMessage("Feed was added to the trough. All animal groups are fed.");
}

function addWaterTrough() {
  const totalAnimals = Object.values(state.barnAnimals).reduce((sum, group) => sum + group.count, 0);
  if (!totalAnimals) {
    pushMessage("Buy animals before filling the water trough.");
    return;
  }
  if ((state.inventory.water || 0) < totalAnimals) {
    pushMessage(`You need ${totalAnimals} water to fill the trough for all animals.`);
    return;
  }
  if (!canDoLabor("animalCare") || !spendStamina(3)) return;
  state.inventory.water -= totalAnimals;
  Object.values(state.barnAnimals).forEach((group) => {
    if (group.count > 0) group.wateredToday = true;
  });
  markPrep("gatherWater");
  closeModal();
  pushMessage("Water was added to the trough. All animals are watered.");
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
  addItem("manure", Math.max(1, Math.ceil(totalAnimals / 2)));
  triggerSceneEffect("tidy");
  closeModal();
  pushMessage("The barn was cleaned and manure was collected for fertilizer.");
}

function barnAnimalSummary() {
  return Object.entries(animalCatalog)
    .map(([id, catalog]) => `${catalog.name}: ${state.barnAnimals[id]?.count || 0}`)
    .join("<br>");
}

function openCropModal(cropId) {
  const catalog = cropCatalog[cropId];
  const crop = state.crops[cropId];
  const cards = [];

  if (!crop.planted) {
    cards.push(buttonCard("Plant", `Use 1 ${itemLabels[catalog.seedItem]} to plant ${catalog.name}.`, () => plantCrop(cropId), state.inventory[catalog.seedItem] <= 0 || !canPreviewLabor("plant")));
  } else {
    cards.push(buttonCard("Water", catalog.waterNeeds, () => waterCrop(cropId), state.inventory.wateringCanWater <= 0));
    cards.push(buttonCard("Weed", "Remove weeds so the bed can grow well.", () => weedCrop(cropId), !crop.hasWeeds || !canPreviewLabor("weed")));
    cards.push(buttonCard("Apply Fertilizer", "Use fertilizer to support stronger growth.", () => fertilizeCrop(cropId), crop.fertilized || state.inventory.fertilizer <= 0 || !canPreviewLabor("fertilize")));
    cards.push(buttonCard("Harvest", "Harvest mature clean produce and plant matter.", () => harvestCrop(cropId), !crop.readyToHarvest || !canPreviewLabor("harvest")));
  }
  cards.push(`<article class="modal-card"><h3>Inspect Notes</h3><p>${catalog.gardeningNote}</p><p><strong>Status:</strong> ${cropStatus(cropId)}</p><p><strong>Clean status:</strong> ${catalog.cleanStatus}</p></article>`);

  openCustomModal(`${catalog.name} Bed`, `<div class="card-grid">${cards.join("")}</div>`);
  bindModalActions({
    plant: () => plantCrop(cropId),
    water: () => waterCrop(cropId),
    weed: () => weedCrop(cropId),
    "apply fertilizer": () => fertilizeCrop(cropId),
    harvest: () => harvestCrop(cropId)
  });
}

function canPreviewLabor(action) {
  return !isSabbath() || action === "water";
}

function buttonCard(title, text, handler, disabled = false) {
  const action = title.toLowerCase();
  return `<article class="modal-card"><h3>${title}</h3><p>${text}</p><button type="button" data-modal-action="${action}" ${disabled ? "disabled" : ""}>${title}</button></article>`;
}

function bindModalActions(actions) {
  document.querySelectorAll("[data-modal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      actions[button.dataset.modalAction]?.();
      render();
    });
  });
}

function plantCrop(cropId) {
  const catalog = cropCatalog[cropId];
  if (!canDoLabor("plant")) return;
  if (state.inventory[catalog.seedItem] <= 0) {
    pushMessage(`You need ${itemLabels[catalog.seedItem]} to plant ${catalog.name}.`);
    return;
  }
  state.inventory[catalog.seedItem] -= 1;
  state.crops[cropId] = { ...emptyCrop(), planted: true, growthStage: 1 };
  closeModal();
  pushMessage(`Planted clean ${catalog.name}.`);
}

function waterCrop(cropId) {
  const crop = state.crops[cropId];
  if (!crop.planted) return;
  if ((state.inventory.wateringCanWater || 0) <= 0) {
    pushMessage("Refill the watering can before watering crops.");
    return;
  }
  if (!canDoLabor("water")) return;
  if (!hasStamina(2)) return;
  state.inventory.wateringCanWater -= 1;
  crop.wateredToday = true;
  spendStamina(2);
  closeModal();
  pushMessage(`${cropCatalog[cropId].name} watered.`);
}

function weedCrop(cropId) {
  const crop = state.crops[cropId];
  if (!crop.planted || !crop.hasWeeds) {
    pushMessage("This bed does not need weeding.");
    return;
  }
  if (!canDoLabor("weed") || !spendStamina(3)) return;
  crop.hasWeeds = false;
  crop.weededToday = true;
  addItem("plantMatter", 1);
  closeModal();
  pushMessage(`${cropCatalog[cropId].name} bed weeded. Plant matter was collected for compost.`);
}

function fertilizeCrop(cropId) {
  const crop = state.crops[cropId];
  if (!crop.planted) return;
  if (crop.fertilized) {
    pushMessage("This bed has already been fertilized.");
    return;
  }
  if ((state.inventory.fertilizer || 0) <= 0) {
    pushMessage("Craft or buy fertilizer first.");
    return;
  }
  if (!canDoLabor("fertilize") || !spendStamina(2)) return;
  state.inventory.fertilizer -= 1;
  crop.fertilized = true;
  closeModal();
  pushMessage(`${cropCatalog[cropId].name} bed fertilized.`);
}

function harvestCrop(cropId) {
  const catalog = cropCatalog[cropId];
  const crop = state.crops[cropId];
  if (!crop.readyToHarvest) {
    pushMessage(`${catalog.name} is not ready to harvest.`);
    return;
  }
  if (!canDoLabor("harvest") || !spendStamina(5)) return;
  addItem(catalog.harvestItem, crop.fertilized ? 4 : 3);
  addItem("plantMatter", 1);
  state.crops[cropId] = emptyCrop();
  closeModal();
  pushMessage(`Harvested clean ${catalog.name}.`);
}

function cropStatus(cropId) {
  const crop = state.crops[cropId];
  if (!crop.planted) return "Empty bed";
  if (crop.readyToHarvest) return "Ready to harvest";
  return `Growing, stage ${crop.growthStage}, watered today: ${crop.wateredToday ? "yes" : "no"}, weeds: ${crop.hasWeeds ? "yes" : "no"}, fertilized: ${crop.fertilized ? "yes" : "no"}`;
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
  spendIngredients(item.ingredients);
  if (item.type === "tool") {
    state.tools[id] = true;
  } else {
    Object.entries(item.bonus || { [id]: 1 }).forEach(([key, value]) => addItem(key, value));
  }
  pushMessage(`Crafted ${item.name}.`);
  render();
  openModal("crafting");
}

function cookItem(id) {
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
  spendIngredients(item.ingredients);
  addItem(item.id, 1);
  Object.entries(item.bonus || {}).forEach(([key, value]) => addItem(key, value));
  markPrep("prepareFood");
  state.kitchenChores.dishes = true;
  state.kitchenChores.counters = true;
  closeModal();
  triggerSceneEffect("cook");
  pushMessage(`Prepared clean food: ${item.name}.`);
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
  Object.entries(ingredients).forEach(([key, amount]) => {
    state.inventory[key] -= amount;
  });
}

function addItem(key, amount) {
  state.inventory[key] = (state.inventory[key] || 0) + amount;
}

function advanceTime(minutes) {
  state.minute += minutes;
  if (state.minute >= 21 * 60) nextDay();
}

function nextDay() {
  const previousWeekdayIndex = (state.day - 1) % 7;
  const wasSabbathRest = state.isSabbathRest;
  const hadShalom = state.shalomRestDays > 0;
  const hadRested = state.restedBuffDays > 0;
  state.day += 1;
  state.minute = 7 * 60;
  state.weatherIndex = (state.weatherIndex + 1) % weatherCycle.length;
  state.seasonIndex = Math.floor((state.day - 1) / 28) % seasons.length;
  if (state.day % 2 === 0) state.kitchenChores.floor = true;
  updateRoomChoresForNewDay();
  resetBarnAnimalDailyCare();

  for (const [cropId, crop] of Object.entries(state.crops)) {
    if (!crop.planted) continue;
    if (crop.wateredToday && !crop.hasWeeds) {
      crop.daysWatered += crop.fertilized ? 2 : 1;
      crop.growthStage = Math.min(4, crop.growthStage + (crop.fertilized ? 2 : 1));
      crop.readyToHarvest = crop.daysWatered >= cropCatalog[cropId].daysToMature;
    }
    if (!crop.readyToHarvest && !crop.weededToday && ((state.day + cropId.length) % 3 === 0)) crop.hasWeeds = true;
    crop.wateredToday = false;
    crop.weededToday = false;
  }

  if (wasSabbathRest && previousWeekdayIndex === 6) {
    state.isSabbathRest = false;
    state.stamina = 100;
    state.energy = 100;
    state.shalomRestDays = 1;
    state.journalUnlocked.shalomRest = true;
    resetSabbathPrep();
    pushMessage("Sabbath has ended. Shalom Rest strengthens this work day.");
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
  Object.values(state.barnAnimals).forEach((group) => {
    group.fedToday = false;
    group.wateredToday = false;
    group.cleanedToday = false;
    group.productCollectedToday = false;
    group.feathersCollectedToday = false;
  });
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

  if (type === "inventory") {
    modalTitle.textContent = titleOverride || "Inventory";
    modalBody.innerHTML = inventoryMarkup(true);
  }
  if (type === "tools") {
    modalTitle.textContent = "Owned Tools";
    modalBody.innerHTML = toolsMarkup();
  }
  if (type === "crafting") {
    modalTitle.textContent = "Crafting";
    modalBody.innerHTML = recipeMarkup(craftingRecipes, "craft");
    bindRecipeButtons("craft");
  }
  if (type === "cooking") {
    modalTitle.textContent = "Cooking";
    modalBody.innerHTML = recipeMarkup(cookingRecipes, "cook");
    bindRecipeButtons("cook");
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
  if (type === "barnCare") {
    openBarnCareModal();
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
}

function openCustomModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modalBackdrop").classList.remove("hidden");
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

function inventoryMarkup(includeAll = false) {
  const rows = Object.entries(state.inventory)
    .filter(([, amount]) => includeAll || amount > 0)
    .map(([key, amount]) => `<div class="inventory-item"><span>${itemLabels[key] || key}</span><strong>${amount}</strong></div>`)
    .join("");
  return `<div class="inventory-list">${rows || "<p class=\"hint-text\">Inventory is empty.</p>"}</div>`;
}

function toolsMarkup() {
  return `<div class="tool-list">${Object.entries(toolLabels).map(([key, label]) => `
    <div class="tool-item ${state.tools[key] ? "owned" : ""}"><strong>${label}</strong><br><small>${state.tools[key] ? "Owned" : "Not owned yet"}</small></div>
  `).join("")}</div>`;
}

function recipeMarkup(list, type) {
  const attr = type === "craft" ? "data-craft" : "data-cook";
  return `<div class="card-grid">${list.map((item) => {
    const needs = Object.entries(item.ingredients).map(([key, amount]) => `${amount} ${itemLabels[key] || key}`).join(", ");
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
  const buyCards = shopBuyItems.map((item) => {
    const owned = item.type === "tool" && state.tools[item.id];
    const disabled = owned || state.inventory.coins < item.cost || isSabbath();
    return `<article class="modal-card">
      <h3>${item.name}</h3>
      <p>Buy ${item.amount} for ${item.cost} coins.</p>
      <button type="button" data-shop-buy="${item.id}" ${disabled ? "disabled" : ""}>${owned ? "Owned" : "Buy"}</button>
    </article>`;
  }).join("");
  const sellCards = shopSellItems.map((item) => `
    <article class="modal-card">
      <h3>${itemLabels[item.id] || item.id}</h3>
      <p>Owned: ${state.inventory[item.id] || 0}. Sell for ${item.price} coins each.</p>
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
  if (state.inventory.coins < item.cost) {
    pushMessage(`Not enough coins for ${item.name}.`);
    return;
  }
  state.inventory.coins -= item.cost;
  if (item.type === "tool") state.tools[item.id] = true;
  if (item.type === "animal") state.barnAnimals[item.id].count += item.amount;
  if (item.type === "item") addItem(item.id, item.amount);
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
  state.inventory[id] -= 1;
  state.inventory.coins += item.price;
  pushMessage(`Sold 1 ${itemLabels[id] || id}.`);
  render();
  openModal("shop");
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
  return `<div class="card-grid">
    <article class="modal-card">
      <h3>Nap</h3>
      <p>Recover a little stamina and energy without ending the day.</p>
      <button type="button" data-bed-rest="nap">Nap</button>
    </article>
    <article class="modal-card">
      <h3>Sleep Through Night</h3>
      <p>Begin the next morning restored, with a gentle rested boost for the work day.</p>
      <button type="button" data-bed-rest="sleep">Sleep Through Night</button>
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
  state.stamina = Math.min(100, state.stamina + 25);
  state.energy = Math.min(100, state.energy + 20);
  triggerSceneEffect("rest");
  advanceTime(75);
  pushMessage("You took a quiet nap and recovered strength.");
  closeModal();
  render();
}

function sleepThroughNight() {
  closeModal();
  nextDay();
  state.stamina = 100;
  state.energy = 100;
  state.restedBuffDays = 1;
  triggerSceneEffect("rest");
  pushMessage("You slept through the night and woke rested for the day ahead.");
  saveGame(false);
  render();
}

function saveManagerMarkup() {
  const primary = readStoredSave(SAVE_KEY);
  const backup = readStoredSave(SAVE_BACKUP_KEY);
  const exportText = JSON.stringify({ version: SAVE_VERSION, savedAt: new Date().toISOString(), state }, null, 2);
  return `
    <div class="card-grid">
      <article class="modal-card">
        <h3>Current Save</h3>
        <p><strong>Status:</strong> ${lastSaveInfo.status}</p>
        <p><strong>Last saved:</strong> ${lastSaveInfo.savedAt ? new Date(lastSaveInfo.savedAt).toLocaleString() : "Not yet"}</p>
        ${lastSaveInfo.error ? `<p><strong>Last error:</strong> ${lastSaveInfo.error}</p>` : ""}
        <button type="button" data-save-action="saveNow">Save Now</button>
      </article>
      <article class="modal-card">
        <h3>Stored Copies</h3>
        <p><strong>Primary:</strong> ${primary?.savedAt ? new Date(primary.savedAt).toLocaleString() : "No saved copy"}</p>
        <p><strong>Backup:</strong> ${backup?.savedAt ? new Date(backup.savedAt).toLocaleString() : "No backup copy"}</p>
        <button type="button" data-save-action="restoreBackup" ${backup ? "" : "disabled"}>Restore Backup</button>
      </article>
    </div>
    <h3>Export Save</h3>
    <p class="hint-text">Keep this text somewhere safe if you want a manual backup outside this browser.</p>
    <textarea class="save-textarea" readonly>${escapeTextarea(exportText)}</textarea>
    <h3>Import Save</h3>
    <p class="hint-text">Paste a Hebrew Homestead save export below, then import it. This replaces the current browser save.</p>
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
        <button type="button" data-test-action="restore">Restore Stamina/Energy</button>
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
    state.tools[key] = true;
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
  state.tools.wateringCan = true;
  pushMessage("Garden testing kit added.");
}

function testerCompleteSabbathPrep() {
  Object.keys(state.sabbathPrep).forEach((key) => {
    state.sabbathPrep[key] = true;
  });
  state.tools.sabbathBasket = true;
  addItem("preparedFood", 5);
  addItem("water", 5);
  addItem("herbs", 5);
  pushMessage("Sabbath preparation checklist completed for testing.");
}

function testerRestoreVitals() {
  state.stamina = 100;
  state.energy = 100;
  state.restedBuffDays = 1;
  pushMessage("Stamina, energy, and rested boost restored.");
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
  state.tools[key] = true;
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
  return `<div class="entry-layout">
    <div class="entry-list">${unlocked.map((item) => `<button type="button" class="${item.id === activeJournalId ? "active" : ""}" data-entry="${item.id}">${item.title}</button>`).join("")}</div>
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
  renderScene();
  const messageBar = document.getElementById("messageBar");
  if (messageBar) messageBar.textContent = state.messages[0] || "";
}

function statusMarkup() {
  const hudItems = [
    ["Day", state.day],
    ["Weekday", weekdayName()],
    ["Season", seasons[state.seasonIndex]],
    ["Weather", weatherCycle[state.weatherIndex]],
    ["Time", formatTime(state.minute)],
    ["Stamina", `${state.stamina}/100`],
    ["Energy", `${state.energy}/100`],
    ["Water", state.inventory.water],
    ["Sabbath", sabbathStatus()],
    ["Shalom", state.shalomRestDays > 0 ? "Active" : "None"],
    ["Rested", state.restedBuffDays > 0 ? "Active" : "None"]
  ];
  return `<div class="status-grid">${hudItems.map(([label, value]) => `
    <div class="modal-card"><span class="hud-label">${label}</span><span class="hud-value">${value}</span></div>
  `).join("")}</div>
  <h3>Goals</h3>
  <ul class="goal-list">${goals().map((goal) => `<li>${goal}</li>`).join("")}</ul>
  <h3>Barn Animals</h3>
  <p>${barnAnimalSummary()}</p>
  <h3>Sabbath Preparation</h3>
  ${sabbathPrepMarkup()}`;
}

function areaMenuMarkup() {
  const areaButtons = [
    ["overview", "Homestead Overview"],
    ["cabin", "Cabin Entry"],
    ["livingRoom", "Living Room"],
    ["bedroom", "Bedroom"],
    ["kitchen", "Kitchen"],
    ["pantry", "Pantry"],
    ["barn", "Barn"],
    ["garden", "Garden"],
    ["fields", "Additional Fields"],
    ["workshed", "Workshed"],
    ["forest", "Forest"],
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

function renderScene() {
  const scene = scenes[state.currentScene];
  const stage = document.getElementById("sceneStage");
  setSceneBackground(stage, scene);
  stage.classList.toggle("debug-hotspots", state.hotspotDebug);
  document.getElementById("sceneTitleOverlay").textContent = scene.title;
  document.getElementById("sceneDescriptionOverlay").textContent = scene.description;
  document.getElementById("sceneDecorations").innerHTML = decorationMarkup(scene.id);
  if (pendingSceneEffect) {
    playSceneEffect(pendingSceneEffect);
    pendingSceneEffect = null;
  }
  const hotspots = visibleHotspots(scene);
  document.getElementById("hotspotLayer").innerHTML = hotspots.map((hotspot) => `
    <button type="button" class="hotspot" data-hotspot="${hotspot.id}" style="left:${hotspot.x}%; top:${hotspot.y}%; width:${hotspot.w}%; height:${hotspot.h}%;">
      <span>${hotspot.label}${hotspot.requirement ? `<span class="requirement">Needs ${toolLabels[hotspot.requirement]}</span>` : ""}</span>
    </button>
  `).join("");
  document.querySelectorAll("[data-hotspot]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = hotspots.find((hotspot) => hotspot.id === button.dataset.hotspot);
      handleHotspot(selected);
    });
  });
}

function visibleHotspots(scene) {
  return scene.hotspots.filter((hotspot) => {
    if (hotspot.action === "cleanRoomChore") return Boolean(state.roomChores?.[hotspot.room]?.[hotspot.chore]);
    if (hotspot.action === "washDishes") return Boolean(state.kitchenChores?.dishes);
    if (hotspot.action === "cleanCounters") return Boolean(state.kitchenChores?.counters);
    if (hotspot.action === "sweepKitchen") return Boolean(state.kitchenChores?.floor);
    return true;
  });
}

function decorationMarkup(sceneId) {
  const effect = `<span id="sceneEffectLayer" class="scene-effect-layer"></span>`;
  if (sceneId === "cabin") {
    return `
      ${effect}
      <span class="lantern-glow" style="--x: 46.2%; --y: 5.8%; --w: 7.2%; --h: 13%;"></span>
      <span class="lantern-glow" style="--x: 11.8%; --y: 18.6%; --w: 6.6%; --h: 12%;"></span>
      <span class="lantern-glow" style="--x: 74%; --y: 45%; --w: 6.2%; --h: 10%;"></span>
      ${roomChoreObjects("cabin")}
    `;
  }
  if (sceneId === "livingRoom") {
    return `${effect}${roomChoreObjects("livingRoom")}`;
  }
  if (sceneId === "bedroom") {
    return `
      ${effect}
      <span class="lantern-glow" style="--x: 76%; --y: 26%; --w: 8%; --h: 13%;"></span>
    `;
  }
  if (sceneId === "forest") {
    return `
      ${effect}
      <span class="well-shimmer" style="--x: 45%; --y: 35%; --w: 22%; --h: 13%;"></span>
      <span class="leaf" style="--x: 18%; --duration: 16s; --delay: -4s;"></span>
      <span class="leaf" style="--x: 82%; --duration: 20s; --delay: -10s;"></span>
    `;
  }
  if (sceneId === "kitchen") {
    return `
      ${effect}
      <span class="lantern-glow" style="--x: 55%; --y: 4.5%; --w: 7%; --h: 13%;"></span>
      <span class="lantern-glow" style="--x: 31%; --y: 52%; --w: 10%; --h: 16%;"></span>
      <span class="lantern-glow" style="--x: 13%; --y: 17%; --w: 6%; --h: 10%;"></span>
      ${kitchenChoreObjects()}
    `;
  }
  if (["pantry", "workshed", "barn"].includes(sceneId)) {
    return `${effect}${roomChoreObjects(sceneId)}`;
  }
  if (sceneId !== "overview") return "";
  return `
    ${effect}
    <span class="smoke" style="--x: 23.6%; --y: 16%; --size: 42px; --delay: 0s;"></span>
    <span class="smoke" style="--x: 24.7%; --y: 15%; --size: 34px; --delay: 1.8s;"></span>
    <span class="smoke" style="--x: 22.8%; --y: 15.8%; --size: 48px; --delay: 3.4s;"></span>
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

function triggerSceneEffect(type) {
  pendingSceneEffect = type;
}

function playSceneEffect(type) {
  const layer = document.getElementById("sceneEffectLayer");
  if (!layer) return;
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
    wash: `
      <span class="water-bubble" style="--x: 8%; --y: 47%; --delay: 0s;"></span>
      <span class="water-bubble" style="--x: 12%; --y: 50%; --delay: 0.18s;"></span>
      <span class="water-sparkle"></span>
    `,
    rest: `
      <span class="rest-glow"></span>
      <span class="tidy-sparkle" style="--x: 36%; --y: 42%; --delay: 0s;"></span>
      <span class="tidy-sparkle" style="--x: 54%; --y: 36%; --delay: 0.22s;"></span>
      <span class="tidy-sparkle" style="--x: 67%; --y: 48%; --delay: 0.42s;"></span>
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

function bindEvents() {
  document.querySelector(".topbar h1")?.addEventListener("click", handleTitleTesterTap);
  document.getElementById("statusBtn").addEventListener("click", () => openModal("status"));
  document.getElementById("areasBtn").addEventListener("click", () => openModal("areas"));
  document.getElementById("inventoryBtn").addEventListener("click", () => openModal("inventory"));
  document.getElementById("craftingBtn").addEventListener("click", () => openModal("crafting"));
  document.getElementById("cookingBtn").addEventListener("click", () => openModal("cooking"));
  document.getElementById("journalBtn").addEventListener("click", () => openModal("journal"));
  document.getElementById("messagesBtn").addEventListener("click", () => openModal("messages"));
  document.getElementById("debugBtn").addEventListener("click", toggleDebug);
  document.getElementById("saveBtn").addEventListener("click", () => openModal("save"));
  document.getElementById("nextDayBtn").addEventListener("click", nextDay);
  document.getElementById("resetSaveBtn").addEventListener("click", resetSave);
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
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
  bindEvents();
  render();
}

init();
