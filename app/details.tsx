import {
  capitalize,
  formatStatName,
  getAccentColor,
  getBackgroundColor,
  getTextColor,
  MAX_STAT_VALUE,
  type PokemonDetails,
} from "@/utils/pokemon";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const [info, setInfo] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPokemonDetailsByName(params.name as string);
  }, [params]);

  // There could definitely be some caching here, but for simplicity I'll leave it out for now.
  async function fetchPokemonDetailsByName(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInfo(data);
    } catch (e) {
      const errorMsg =
        e instanceof Error ? e.message : "Failed to fetch Pokemon data";
      console.error(`Encountered an error fetching pokemon by id: ${errorMsg}`);
      setError(errorMsg);
    }
  }

  // Handle error state
  if (error) {
    return (
      <>
        <Stack.Screen options={{ title: "Error" }} />
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-red-600 text-lg font-semibold">{error}</Text>
        </View>
      </>
    );
  }

  // Show loading so the user knows something is happening while we fetch the data
  if (!info) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading..." }} />
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#EF4444" />
        </View>
      </>
    );
  }

  const primaryType = info.types[0].type.name;
  const typeString = info.types.map((t) => t.type.name).join(" / ");

  return (
    <>
      <Stack.Screen
        options={{
          title: capitalize(info.name),
        }}
      />
      <ScrollView className={`flex-1 ${getBackgroundColor(primaryType)}`}>
        {/* Pokemon Header */}
        <View className="items-center pt-6 pb-4">
          <Text className="font-bold text-4xl capitalize">{info.name}</Text>
          <Text
            className={`font-semibold text-xl ${getTextColor(primaryType)}`}
          >
            {typeString}
          </Text>
        </View>

        {/* Pokemon Image */}
        <View className="items-center">
          <Image
            source={{
              uri: info.sprites.other["official-artwork"].front_default,
            }}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Stats Section */}
        <View className="px-4 pt-4 pb-6">
          {/* Basic Info */}
          <View className="mb-4">
            <Text className="font-bold text-2xl mb-2">Info</Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="bg-white/50 rounded-lg px-4 py-2">
                <Text className="font-semibold">
                  Height: {info.height / 10}m
                </Text>
              </View>
              <View className="bg-white/50 rounded-lg px-4 py-2">
                <Text className="font-semibold">
                  Weight: {info.weight / 10}kg
                </Text>
              </View>
              <View className="bg-white/50 rounded-lg px-4 py-2">
                <Text className="font-semibold">
                  Base XP: {info.base_experience}
                </Text>
              </View>
            </View>
          </View>

          {/* Abilities */}
          <View className="mb-4">
            <Text className="font-bold text-2xl mb-2">Abilities</Text>
            <View className="flex-row flex-wrap gap-2">
              {info.abilities.map((ability) => (
                <View
                  key={ability.ability.name}
                  className="bg-white/50 rounded-lg px-4 py-2 flex-row items-center gap-2"
                >
                  <Text className="font-semibold capitalize">
                    {ability.ability.name.replace(/-/g, " ")}
                  </Text>
                  {ability.is_hidden && (
                    <Text className="text-xs font-bold">(Hidden)</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Base Stats */}
          <View>
            <Text className="font-bold text-2xl mb-2">Base Stats</Text>
            <View className="gap-2">
              {info.stats.map((stat) => {
                const statName = formatStatName(stat.stat.name);
                const statPercentage = (stat.base_stat / MAX_STAT_VALUE) * 100;

                return (
                  <View
                    key={stat.stat.name}
                    className="bg-white/50 rounded-lg px-4 py-2"
                  >
                    <View className="flex-row justify-between mb-1">
                      <Text className="font-semibold">{statName}</Text>
                      <Text className="font-bold">{stat.base_stat}</Text>
                    </View>
                    <View className="bg-white/70 rounded-full h-2 overflow-hidden">
                      <View
                        className={`${getAccentColor(primaryType)} h-2 rounded-full`}
                        style={{ width: `${statPercentage}%` }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
