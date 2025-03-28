import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";

import { tokenCache } from "@/cache";

import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";

import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ConvexReactClient } from "convex/react";

import { useAuth } from "@clerk/clerk-expo";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function ClerkAndConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkPubKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey as string}
      tokenCache={tokenCache as TokenCache}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
