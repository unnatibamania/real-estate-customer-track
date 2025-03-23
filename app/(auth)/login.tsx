import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { authStyles } from "@/styles/auth.styles";
import { SignIn } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

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
        {activeTab === "login" ? <SignIn /> : <SignUp />}
      </View>
    </View>
  );
}
