export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
  types: PokemonType[];
}

export interface PokemonType {
  slot?: number;
  type: {
    name: string;
    url: string;
  };
}

// Basically a copy of the API response
// (see https://pokeapi.co/docs/v2#pokemon for reference)
export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

// Type to background color mapping
const TYPE_COLORS: Record<string, string> = {
  grass: "bg-green-200",
  fire: "bg-orange-200",
  water: "bg-blue-200",
  bug: "bg-lime-200",
  normal: "bg-neutral-200",
  poison: "bg-purple-200",
  electric: "bg-yellow-200",
  ground: "bg-yellow-300",
  fairy: "bg-pink-200",
  fighting: "bg-red-200",
  psychic: "bg-pink-300",
  rock: "bg-amber-300",
  ghost: "bg-purple-300",
  ice: "bg-cyan-200",
  dragon: "bg-indigo-200",
  dark: "bg-gray-400",
  steel: "bg-gray-300",
  flying: "bg-indigo-100",
};

// Type to accent color mapping
const TYPE_ACCENT_COLORS: Record<string, string> = {
  grass: "bg-green-300",
  fire: "bg-orange-300",
  water: "bg-blue-300",
  bug: "bg-lime-300",
  normal: "bg-neutral-300",
  poison: "bg-purple-300",
  electric: "bg-yellow-300",
  ground: "bg-yellow-400",
  fairy: "bg-pink-300",
  fighting: "bg-red-300",
  psychic: "bg-pink-400",
  rock: "bg-amber-400",
  ghost: "bg-purple-400",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-300",
  dark: "bg-gray-500",
  steel: "bg-gray-400",
  flying: "bg-indigo-200",
};

// Types that should use darker text
const LIGHT_TYPES = ["grass", "bug"];

// Maximum stat value for progress bar calculations
export const MAX_STAT_VALUE = 255;

// Get background color class for a Pokemon type
export function getBackgroundColor(type: string): string {
  return TYPE_COLORS[type] || "bg-neutral-200";
}

// Get accent color class for a Pokemon type
export function getAccentColor(type: string): string {
  return TYPE_ACCENT_COLORS[type] || "bg-neutral-300";
}

// Get text color class for a Pokemon type
export function getTextColor(type: string): string {
  return LIGHT_TYPES.includes(type) ? "text-neutral-500" : "text-white";
}

// Capitalize first letter of a string
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format stat name (e.g., "special-attack" -> "Special Attack")
export function formatStatName(name: string): string {
  return name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}
