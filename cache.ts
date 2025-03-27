import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        return item ?? null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    saveToken: async (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export const tokenCache = Platform.OS === "web" ? null : createTokenCache();
