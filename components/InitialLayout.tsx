import { Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSegments } from "expo-router";

export default function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)/home");
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
