import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="details"
        options={{
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          // sheetAllowedDetents: [0.5, 0.9], // Removed the 0.5 detent for a nicer ux (at least for me, but feel free to add it back if you like it!)
          sheetAllowedDetents: [0.9],
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
