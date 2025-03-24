import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

// Get screen dimensions for responsive sizing
const { width, height } = Dimensions.get("window");

// Mock data for properties
const PROPERTIES = [
  {
    id: "p1",
    name: "Luxury Villa",
    location: "South Delhi",
    price: "₹2.5 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    enquiries: 24,
  },
  {
    id: "p2",
    name: "Beachfront Apartment",
    location: "Mumbai",
    price: "₹1.8 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    enquiries: 18,
  },
  {
    id: "p3",
    name: "Garden Townhouse",
    location: "Bangalore",
    price: "₹1.2 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    enquiries: 31,
  },
];

// Mock data for customers
const CUSTOMERS = [
  {
    id: "c1",
    name: "Rahul Sharma",
    phone: "9876543210",
    visits: 8,
    lastVisit: "2023-06-15",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "c2",
    name: "Priya Patel",
    phone: "9812345670",
    visits: 12,
    lastVisit: "2023-06-18",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "c3",
    name: "Amit Kumar",
    phone: "9898765432",
    visits: 5,
    lastVisit: "2023-06-10",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

// Mock data for weekly enquiries
const generateWeeklyData = (startDate: Date) => {
  const weekData = [];
  const date = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    weekData.push({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      date: new Date(date).getDate(),
      enquiries: Math.floor(Math.random() * 10) + 1,
    });
    date.setDate(date.getDate() + 1);
  }

  return weekData;
};

export default function Home() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState<
    {
      day: string;
      date: number;
      enquiries: number;
    }[]
  >([]);

  // Get the most enquired property
  const topProperty = [...PROPERTIES].sort(
    (a, b) => b.enquiries - a.enquiries
  )[0];

  // Get the customer with most visits
  const topCustomer = [...CUSTOMERS].sort((a, b) => b.visits - a.visits)[0];

  // Generate weekly data whenever the current week changes
  useEffect(() => {
    setWeeklyData(generateWeeklyData(currentWeekStart));
  }, [currentWeekStart]);

  // Navigate to previous week
  const goToPrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  // Format the current week range for display
  const formatWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() + 6);

    const startFormatted = currentWeekStart.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    const endFormatted = endDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  // Find the maximum enquiries in current week for scaling
  const maxEnquiries = Math.max(...weeklyData.map((day) => day.enquiries));

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar backgroundColor="#f5f7fa" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
        overScrollMode="always"
      >
        {/* Top Insights Section */}
        <Text style={styles.sectionTitle}>Top Insights</Text>
        <View style={styles.cardsContainer}>
          {/* Most Enquired Property Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Most Enquired</Text>
              <Ionicons name="home" size={22} color={colors.primary} />
            </View>

            {topProperty && (
              <View style={styles.propertyCard}>
                <Image
                  source={{ uri: topProperty.image }}
                  style={styles.propertyImage}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyName}>{topProperty.name}</Text>
                  <Text style={styles.propertyLocation}>
                    {topProperty.location}
                  </Text>
                  <Text style={styles.propertyPrice}>{topProperty.price}</Text>
                  <View style={styles.enquiryBadge}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={14}
                      color="#fff"
                    />
                    <Text style={styles.enquiryText}>
                      {topProperty.enquiries} Enquiries
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Most Frequent Customer Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Frequent Customer</Text>
              <Ionicons name="person" size={22} color={colors.primary} />
            </View>

            {topCustomer && (
              <View style={styles.customerCard}>
                <Image
                  source={{ uri: topCustomer.image }}
                  style={styles.customerImage}
                />
                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{topCustomer.name}</Text>
                  <View style={styles.customerContact}>
                    <Ionicons name="call-outline" size={14} color="#555" />
                    <Text style={styles.contactText}>{topCustomer.phone}</Text>
                  </View>
                  <View style={styles.visitInfo}>
                    <View style={styles.visitBadge}>
                      <Text style={styles.visitText}>
                        {topCustomer.visits} Visits
                      </Text>
                    </View>
                    <Text style={styles.lastVisitText}>
                      Last:{" "}
                      {new Date(topCustomer.lastVisit).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "short" }
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Weekly Enquiry Chart Section */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Enquiries</Text>

          <View style={styles.weekNavigation}>
            <TouchableOpacity onPress={goToPrevWeek} style={styles.navButton}>
              <Ionicons name="chevron-back" size={20} color="#555" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <Text style={styles.weekRangeText}>{formatWeekRange()}</Text>

            <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}>
              <Text style={styles.navButtonText}>Next</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(day.enquiries / maxEnquiries) * 100}%`,
                        backgroundColor:
                          day.enquiries >= maxEnquiries
                            ? colors.primary
                            : colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
                <Text style={styles.dateLabel}>{day.date}</Text>
                <Text style={styles.enquiryCount}>{day.enquiries}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chartFooter}>
            <View style={styles.totalEnquiries}>
              <Text style={styles.totalLabel}>Total Enquiries</Text>
              <Text style={styles.totalValue}>
                {weeklyData.reduce((sum, day) => sum + day.enquiries, 0)}
              </Text>
            </View>

            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Details</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra padding at the bottom */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    width: width > 600 ? (width - 60) / 2 : width - 40,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  propertyCard: {
    flexDirection: "column",
  },
  propertyImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  propertyPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 6,
  },
  enquiryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  enquiryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  customerCard: {
    flexDirection: "row",
  },
  customerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
    justifyContent: "center",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  customerContact: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  visitInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  visitBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  visitText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  lastVisitText: {
    fontSize: 12,
    color: "#777",
  },
  chartSection: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  weekNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  navButtonText: {
    fontSize: 14,
    color: "#555",
  },
  weekRangeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    marginBottom: 20,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
  },
  barContainer: {
    width: 20,
    height: 150,
    justifyContent: "flex-end",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 6,
  },
  dateLabel: {
    fontSize: 11,
    color: "#777",
    marginTop: 1,
  },
  enquiryCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    top: 140,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  chartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalEnquiries: {
    flexDirection: "column",
  },
  totalLabel: {
    fontSize: 12,
    color: "#777",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 5,
  },
  bottomPadding: {
    height: 30,
  },
});
