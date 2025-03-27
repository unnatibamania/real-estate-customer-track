import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";

import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
import { useColorScheme } from "@/hooks/useColorScheme";
import InitialLayout from "@/components/InitialLayout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const clerkPubKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Publishable Ke");
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache as TokenCache}
      publishableKey={clerkPubKey as string}
    >
      <ClerkLoaded>
        <Stack>
          <InitialLayout />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
