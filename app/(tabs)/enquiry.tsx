import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

// Define Enquiry type
type Enquiry = {
  id: string;
  customerName: string;
  mobileNumber: string;
  date: string;
  flatRequirement: string;
  message: string;
  budget: string;
  numberOfVisits: number;
  status: string;
  propertyIds?: string[];
  avatar?: string;
};

// Mock data for enquiries
const ENQUIRIES: Enquiry[] = [
  {
    id: "e1",
    customerName: "Rahul Sharma",
    mobileNumber: "9876543210",
    date: "2023-06-15",
    flatRequirement: "3 BHK",
    message:
      "Looking for a family apartment in South Delhi with good security.",
    budget: "₹1.8 Cr - ₹2.5 Cr",
    numberOfVisits: 2,
    status: "Visited",
    propertyIds: ["p1", "p3"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "e2",
    customerName: "Priya Patel",
    mobileNumber: "9812345670",
    date: "2023-06-18",
    flatRequirement: "Penthouse",
    message: "Interested in luxury penthouses with terrace gardens.",
    budget: "Above ₹3 Cr",
    numberOfVisits: 3,
    status: "Negotiating",
    propertyIds: ["p4"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "e3",
    customerName: "Amit Kumar",
    mobileNumber: "9898765432",
    date: "2023-07-10",
    flatRequirement: "Villa",
    message: "Looking for a weekend home near natural surroundings.",
    budget: "₹2 Cr - ₹3 Cr",
    numberOfVisits: 1,
    status: "New",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: "e4",
    customerName: "Neha Singh",
    mobileNumber: "9876123450",
    date: "2023-07-22",
    flatRequirement: "2 BHK",
    message: "First-time buyer looking for apartment in Gurgaon.",
    budget: "₹80 L - ₹1.2 Cr",
    numberOfVisits: 0,
    status: "Contacted",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: "e5",
    customerName: "Vikram Malhotra",
    mobileNumber: "9823456710",
    date: "2023-08-05",
    flatRequirement: "Bungalow",
    message: "Upgrading to a larger home for extended family.",
    budget: "₹1.5 Cr - ₹2 Cr",
    numberOfVisits: 2,
    status: "Visited",
    propertyIds: ["p6"],
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    id: "e6",
    customerName: "Aisha Kapoor",
    mobileNumber: "9765432180",
    date: "2023-08-15",
    flatRequirement: "1 BHK",
    message: "Investment property for rental purposes.",
    budget: "Under ₹80 L",
    numberOfVisits: 0,
    status: "New",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

// Filter options
const STATUS_OPTIONS = [
  "All",
  "New",
  "Contacted",
  "Visited",
  "Negotiating",
  "Closed",
];
const PROPERTY_TYPES = [
  "All",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "Penthouse",
  "Villa",
  "Bungalow",
];
const BUDGET_RANGES = [
  "All",
  "Under ₹1 Cr",
  "₹1 Cr - ₹2 Cr",
  "₹2 Cr - ₹3 Cr",
  "Above ₹3 Cr",
];
const VISIT_OPTIONS = ["All", "No Visits", "1-2 Visits", "3+ Visits"];
const DATE_RANGES = [
  "All",
  "Last Week",
  "Last Month",
  "Last 3 Months",
  "This Year",
];

export default function Enquiries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState(ENQUIRIES);
  const [filters, setFilters] = useState({
    status: "All",
    propertyType: "All",
    budget: "All",
    visits: "All",
    dateRange: "All",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("Recent First");

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...ENQUIRIES];

    // Apply search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (enquiry) =>
          enquiry.customerName.toLowerCase().includes(lowercasedQuery) ||
          enquiry.mobileNumber.includes(searchQuery) ||
          enquiry.flatRequirement.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Apply status filter
    if (filters.status !== "All") {
      result = result.filter((enquiry) => enquiry.status === filters.status);
    }

    // Apply property type filter
    if (filters.propertyType !== "All") {
      result = result.filter(
        (enquiry) => enquiry.flatRequirement === filters.propertyType
      );
    }

    // Apply budget filter
    if (filters.budget !== "All") {
      switch (filters.budget) {
        case "Under ₹1 Cr":
          result = result.filter(
            (enquiry) =>
              enquiry.budget.includes("Under") ||
              enquiry.budget.includes("L") ||
              (enquiry.budget.includes("Cr") &&
                parseFloat(enquiry.budget.split("₹")[1]) < 1)
          );
          break;
        case "₹1 Cr - ₹2 Cr":
          result = result.filter(
            (enquiry) =>
              (enquiry.budget.includes("₹1") &&
                enquiry.budget.includes("Cr")) ||
              (enquiry.budget.includes("₹2") &&
                enquiry.budget.includes("Cr") &&
                !enquiry.budget.includes("₹2.5"))
          );
          break;
        case "₹2 Cr - ₹3 Cr":
          result = result.filter(
            (enquiry) =>
              enquiry.budget.includes("₹2") || enquiry.budget.includes("₹3")
          );
          break;
        case "Above ₹3 Cr":
          result = result.filter(
            (enquiry) =>
              enquiry.budget.includes("Above") ||
              (enquiry.budget.includes("Cr") &&
                parseFloat(enquiry.budget.split("₹")[1]) > 3)
          );
          break;
      }
    }

    // Apply visits filter
    if (filters.visits !== "All") {
      switch (filters.visits) {
        case "No Visits":
          result = result.filter((enquiry) => enquiry.numberOfVisits === 0);
          break;
        case "1-2 Visits":
          result = result.filter(
            (enquiry) =>
              enquiry.numberOfVisits >= 1 && enquiry.numberOfVisits <= 2
          );
          break;
        case "3+ Visits":
          result = result.filter((enquiry) => enquiry.numberOfVisits >= 3);
          break;
      }
    }

    // Apply date range filter
    if (filters.dateRange !== "All") {
      const today = new Date();
      let startDate = new Date();

      switch (filters.dateRange) {
        case "Last Week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "Last Month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "Last 3 Months":
          startDate.setMonth(today.getMonth() - 3);
          break;
        case "This Year":
          startDate = new Date(today.getFullYear(), 0, 1);
          break;
      }

      result = result.filter((enquiry) => new Date(enquiry.date) >= startDate);
    }

    // Apply sorting
    if (sortOption === "Recent First") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOption === "Oldest First") {
      result.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortOption === "Visits (High to Low)") {
      result.sort((a, b) => b.numberOfVisits - a.numberOfVisits);
    }

    setFilteredEnquiries(result);
  }, [searchQuery, filters, sortOption]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: "All",
      propertyType: "All",
      budget: "All",
      visits: "All",
      dateRange: "All",
    });
    setSortOption("Recent First");
    setSearchQuery("");
  };

  // Apply a specific filter
  const applyFilter = (filterType: string, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "#4CAF50";
      case "Contacted":
        return "#2196F3";
      case "Visited":
        return "#FF9800";
      case "Negotiating":
        return "#9C27B0";
      case "Closed":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  // Render enquiry card
  const renderEnquiryCard = ({ item }: { item: Enquiry }) => (
    <TouchableOpacity style={styles.enquiryCard}>
      <View style={styles.enquiryHeader}>
        <View style={styles.customerInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName} numberOfLines={1}>
              {item.customerName}
            </Text>
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={14} color="#666" />
              <Text style={styles.contactText} numberOfLines={1}>
                {item.mobileNumber}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.enquiryDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="footsteps-outline" size={14} color="#666" />
            <Text style={styles.detailLabel}>Visits:</Text>
            <Text style={styles.detailValue}>{item.numberOfVisits}</Text>
          </View>
        </View>

        <View style={styles.requirementRow}>
          <View style={styles.detailItem}>
            <Ionicons name="home-outline" size={14} color="#666" />
            <Text style={styles.detailLabel}>Req:</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {item.flatRequirement}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="wallet-outline" size={14} color="#666" />
            <Text style={styles.detailLabel}>Budget:</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {item.budget}
            </Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Ionicons name="chatbubble-outline" size={14} color="#666" />
          <Text style={styles.messageLabel}>Note:</Text>
          <Text style={styles.messageText} numberOfLines={2}>
            {item.message}
          </Text>
        </View>

        {item.propertyIds && item.propertyIds.length > 0 && (
          <View style={styles.interestedProperties}>
            <Text style={styles.interestedLabel}>
              Interested in {item.propertyIds.length}{" "}
              {item.propertyIds.length === 1 ? "property" : "properties"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.enquiryFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={14} color={colors.primary} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={14} color={colors.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar" size={14} color={colors.primary} />
          <Text style={styles.actionText}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone number"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          {/* Status Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {STATUS_OPTIONS.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterOption,
                    filters.status === status && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("status", status)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.status === status &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Date Range</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {DATE_RANGES.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterOption,
                    filters.dateRange === range && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("dateRange", range)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.dateRange === range &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Property Type Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Property Requirement</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {PROPERTY_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    filters.propertyType === type && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("propertyType", type)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.propertyType === type &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Budget Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Budget</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {BUDGET_RANGES.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterOption,
                    filters.budget === range && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("budget", range)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.budget === range && styles.activeFilterOptionText,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Visits Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Visits</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {VISIT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    filters.visits === option && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("visits", option)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.visits === option &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sorting Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.sortingContainer}>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortOption === "Recent First" && styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Recent First")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Recent First" &&
                      styles.activeSortOptionText,
                  ]}
                >
                  Recent First
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortOption === "Oldest First" && styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Oldest First")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Oldest First" &&
                      styles.activeSortOptionText,
                  ]}
                >
                  Oldest First
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortOption === "Visits (High to Low)" &&
                    styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Visits (High to Low)")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Visits (High to Low)" &&
                      styles.activeSortOptionText,
                  ]}
                >
                  Visits (High to Low)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Results Summary */}
      <View style={styles.resultsSummary}>
        <Text style={styles.resultsCount}>
          {filteredEnquiries.length} Enquiries Found
        </Text>
        {(filters.status !== "All" ||
          filters.propertyType !== "All" ||
          filters.budget !== "All" ||
          filters.visits !== "All" ||
          filters.dateRange !== "All") && (
          <TouchableOpacity
            onPress={resetFilters}
            style={styles.clearFiltersButton}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Enquiry Listings */}
      <FlatList
        data={filteredEnquiries}
        renderItem={renderEnquiryCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No enquiries found</Text>
            <Text style={styles.emptySubText}>Try adjusting your filters</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: colors.primary,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  resetText: {
    fontSize: 14,
    color: colors.primary,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 8,
  },
  filterOptionsContainer: {
    paddingBottom: 5,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeFilterOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: "#555",
  },
  activeFilterOptionText: {
    color: "#fff",
    fontWeight: "500",
  },
  sortingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeSortOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortOptionText: {
    fontSize: 14,
    color: "#555",
  },
  activeSortOptionText: {
    color: "#fff",
    fontWeight: "500",
  },
  resultsSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
  },
  resultsCount: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  clearFiltersButton: {
    padding: 5,
  },
  clearFiltersText: {
    fontSize: 14,
    color: colors.primary,
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  enquiryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  enquiryHeader: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 12,
  },
  enquiryDetails: {
    padding: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  requirementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
    marginRight: 2,
  },
  detailValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 4,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  messageLabel: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
    marginRight: 2,
  },
  messageText: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },
  interestedProperties: {
    marginTop: 8,
    backgroundColor: "#f0f8ff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  interestedLabel: {
    fontSize: 12,
    color: colors.primary,
  },
  enquiryFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionText: {
    fontSize: 13,
    color: colors.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 30,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
