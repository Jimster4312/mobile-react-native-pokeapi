import "@/global.css";
import {
  getBackgroundColor,
  getTextColor,
  type Pokemon,
} from "@/utils/pokemon";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * See API reference;
 * https://pokeapi.co/docs/v2
 */

// I would recommend a max of 40, ideally below (the API is fair use, but we don't want to overload it with too many requests at once)
const INITIAL_LOAD_LIMIT = 30;
const LOAD_MORE_LIMIT = 20;

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the initial pokemon data from the API
    fetchPokemonData(INITIAL_LOAD_LIMIT, 0);
  }, []);

  async function fetchPokemonData(limit: number, currentOffset: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${currentOffset}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if there are more pokemon to load
      setHasMore(data.next !== null);

      // Fetch individual more detailed info for each pokemon
      const details = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
          const res = await fetch(p.url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const result = await res.json();

          return {
            id: result.id,
            name: p.name,
            url: p.url,
            image: result.sprites.front_default || "",
            types: result.types,
          };
        }),
      );

      // Append new pokemon to existing list
      setPokemon((prev) => [...prev, ...details]);
      // Update offset for next fetch
      setOffset(currentOffset + limit);
    } catch (e) {
      const errorMsg =
        e instanceof Error ? e.message : "Failed to fetch Pokemon data";
      console.error(`Encountered an error while fetching data: ${errorMsg}`);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    if (!loading) {
      fetchPokemonData(LOAD_MORE_LIMIT, offset);
    }
  }

  return (
    <ScrollView className="bg-white w-full">
      {/* Error State */}
      {error && (
        <View className="px-4 py-4 mx-2 mt-2 bg-red-100 rounded-lg">
          <Text className="text-red-700 font-semibold">Error: {error}</Text>
          <TouchableOpacity
            onPress={() => fetchPokemonData(INITIAL_LOAD_LIMIT, 0)}
            className="mt-2 bg-red-500 rounded-lg py-2 px-4 items-center"
          >
            <Text className="text-white font-bold">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Initial Loading State, Sure it could be replaced with a spinner, maybe later */}
      {loading && pokemon.length === 0 && (
        <View className="flex-1 justify-center items-center py-20">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 font-semibold">
            Loading Pokemon...
          </Text>
        </View>
      )}

      {/* Page Content */}
      <View className="flex-row flex-wrap p-2 gap-2 mb-4">
        {pokemon.map((p) => (
          <Link
            href={{ pathname: "/details", params: { name: p.name } }}
            key={p.id}
            className={`rounded-lg w-[49%] h-fit py-1 ${getBackgroundColor(p.types[0].type.name)}`}
          >
            <View className="flex flex-col items-center w-full">
              <Text className="font-bold text-4xl">{p.name}</Text>
              <Text
                className={`font-semibold text-xl ${getTextColor(p.types[0].type.name)}`}
              >
                {p.types[0].type.name}
              </Text>
              <View className="flex-row h-32 w-full justify-center">
                <Image
                  source={{
                    uri: p.image,
                  }}
                  className="aspect-square"
                />
              </View>
            </View>
          </Link>
        ))}
      </View>

      {/* Load More Button */}
      {hasMore && !error && (
        <View className="px-4 pb-10">
          <TouchableOpacity
            onPress={loadMore}
            disabled={loading}
            className={`rounded-lg py-4 items-center ${loading ? "bg-blue-300" : "bg-blue-500"}`}
          >
            <Text className="text-white font-bold text-lg">
              {loading ? "Loading..." : "Load More"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
