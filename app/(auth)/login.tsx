import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { authStyles } from "@/styles/auth.styles";
import { SignIn } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const { startSSOFlow } = useSSO();

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const handleGoogleSSOLogin = async () => {
    try {
      const { setActive, createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
      }

      if (createdSessionId) {
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error during SSO flow:", error);
    }
  };

  if (isSignedIn) {
    router.push("/(tabs)/home");
  }

  return (
    <View style={authStyles.container}>
      <View style={authStyles.authContainer}>
        <Text style={authStyles.authHeader}>
          Manage your customers at fingertips
        </Text>
        <Text style={authStyles.authSubHeader}>
          Login to your account to continue
        </Text>
      </View>
      <View style={authStyles.subContainer}>
        {/* Tab Header */}
        <View style={authStyles.tabHeader}>
          <TouchableOpacity
            style={[
              authStyles.tabButton,
              activeTab === "login" && authStyles.activeTabButton,
            ]}
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={[
                authStyles.tabButtonText,
                activeTab === "login" && authStyles.activeTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              authStyles.tabButton,
              activeTab === "signup" && authStyles.activeTabButton,
            ]}
            onPress={() => setActiveTab("signup")}
          >
            <Text
              style={[
                authStyles.tabButtonText,
                activeTab === "signup" && authStyles.activeTabText,
              ]}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "login" ? (
          <SignIn handleGoogleSSOLogin={handleGoogleSSOLogin} />
        ) : (
          <SignUp handleGoogleSSOLogin={handleGoogleSSOLogin} />
        )}
      </View>
    </View>
  );
}
