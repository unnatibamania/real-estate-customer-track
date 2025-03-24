import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

export default function Profile() {
  // State for toggle switches
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  // Mock user data
  const user = {
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    phone: "+91 98765 43210",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "May 2023",
    savedProperties: 12,
    enquiries: 8,
    visits: 5,
  };

  // Menu sections
  const accountItems = [
    { icon: "person-outline" as const, label: "Personal Information" },
    { icon: "lock-closed-outline" as const, label: "Change Password" },
    { icon: "card-outline" as const, label: "Payment Methods" },
    { icon: "notifications-outline" as const, label: "Notifications" },
  ];

  const propertyItems = [
    {
      icon: "heart-outline" as const,
      label: "Saved Properties",
      count: user.savedProperties,
    },
    {
      icon: "chatbubble-outline" as const,
      label: "My Enquiries",
      count: user.enquiries,
    },
    {
      icon: "calendar-outline" as const,
      label: "Property Visits",
      count: user.visits,
    },
    { icon: "document-text-outline" as const, label: "Documents" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f5f7fa" barStyle="dark-content" />

      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons
            name={"create-outline" as const}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View> */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.photo }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.contactRow}>
              <Ionicons name={"mail-outline" as const} size={16} color="#666" />
              <Text style={styles.contactText}>{user.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name={"call-outline" as const} size={16} color="#666" />
              <Text style={styles.contactText}>{user.phone}</Text>
            </View>
            <View style={styles.membershipRow}>
              <Ionicons
                name={"calendar-outline" as const}
                size={14}
                color={colors.primary}
              />
              <Text style={styles.memberText}>
                Member since {user.joinDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Property Related Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>My Properties</Text>
          <View style={styles.menuItems}>
            {propertyItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.count !== undefined ? (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                ) : (
                  <Ionicons
                    name={"chevron-forward" as const}
                    size={20}
                    color="#999"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Settings Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.menuItems}>
            {accountItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons
                  name={"chevron-forward" as const}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        {/* <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuItems}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={"notifications-outline" as const}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.menuLabel}>Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#c8d5ce" }}
                thumbColor={notifications ? colors.primary : "#f4f4f4"}
                onValueChange={() => setNotifications(!notifications)}
                value={notifications}
              />
            </View>

            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={"moon-outline" as const}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.menuLabel}>Dark Mode</Text>
              </View>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#c8d5ce" }}
                thumbColor={darkMode ? colors.primary : "#f4f4f4"}
                onValueChange={() => setDarkMode(!darkMode)}
                value={darkMode}
              />
            </View>

            <View style={styles.toggleItem}>
              <View style={styles.toggleLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={"location-outline" as const}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.menuLabel}>Location Services</Text>
              </View>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#c8d5ce" }}
                thumbColor={locationServices ? colors.primary : "#f4f4f4"}
                onValueChange={() => setLocationServices(!locationServices)}
                value={locationServices}
              />
            </View>
          </View>
        </View> */}

        {/* Help & Support */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={"help-circle-outline" as const}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.menuLabel}>Help Center</Text>
              <Ionicons
                name={"chevron-forward" as const}
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={"chatbox-outline" as const}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.menuLabel}>Contact Support</Text>
              <Ionicons
                name={"chevron-forward" as const}
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={"document-text-outline" as const}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.menuLabel}>Terms & Privacy</Text>
              <Ionicons
                name={"chevron-forward" as const}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name={"log-out-outline" as const} size={22} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Real Estate App v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.secondary,
  },
  editButton: {
    padding: 6,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 3,
    borderColor: "#f0f0f0",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  membershipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  memberText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: "500",
  },
  menuSection: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 15,
  },
  menuItems: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.secondary,
  },
  countBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  versionInfo: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 13,
    color: "#999",
  },
});
