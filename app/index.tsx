import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }
  return <Redirect href="/(auth)/login" />;
}
