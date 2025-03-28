import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

// User info component to display at the top
function UserHeaderInfo() {
  // Mock user data - in a real app, this would come from your auth context or user state
  const user = {
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView style={[styles.headerContainer, { padding: 4 }]}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.photo }} style={styles.profileImage} />
        <View style={styles.userTextInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            signOut();
            router.push("/(auth)/login");
          }}
        >
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function TabsLayout() {
  return (
    <>
      <UserHeaderInfo />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="enquiry"
          options={{
            title: "Enquiry",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbox-ellipses" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="properties"
          options={{
            title: "Properties",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="business" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />

        {/* Add more tabs as needed */}
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary,
  },
  userEmail: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
