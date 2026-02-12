/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./utils/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  safelist: [
    // See utils/pokemon.ts for how these are used.
    // Pokemon type background colors
    "bg-green-200",
    "bg-orange-200",
    "bg-blue-200",
    "bg-lime-200",
    "bg-neutral-200",
    "bg-purple-200",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-pink-200",
    "bg-red-200",
    "bg-pink-300",
    "bg-amber-300",
    "bg-purple-300",
    "bg-cyan-200",
    "bg-indigo-200",
    "bg-gray-400",
    "bg-gray-300",
    "bg-indigo-100",
    // Pokemon type accent colors
    "bg-green-300",
    "bg-orange-300",
    "bg-blue-300",
    "bg-lime-300",
    "bg-neutral-300",
    "bg-purple-300",
    "bg-yellow-400",
    "bg-pink-300",
    "bg-red-300",
    "bg-pink-400",
    "bg-amber-400",
    "bg-purple-400",
    "bg-cyan-300",
    "bg-indigo-300",
    "bg-gray-500",
    "bg-gray-400",
    "bg-indigo-200",
    // Text colors
    "text-neutral-500",
    "text-white",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
