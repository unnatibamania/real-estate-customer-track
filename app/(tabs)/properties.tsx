import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  features: string[];
};

const { width } = Dimensions.get("window");

// Enhanced mock data for properties
const PROPERTIES = [
  {
    id: "p1",
    name: "Luxury Villa with Pool",
    location: "South Delhi",
    price: "₹2.5 Cr",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 5,
    area: "3500 sq ft",
    features: ["Pool", "Garden", "Security"],
  },
  {
    id: "p2",
    name: "Beachfront Apartment",
    location: "Mumbai",
    price: "₹1.8 Cr",
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq ft",
    features: ["Sea View", "Gym", "Parking"],
  },
  {
    id: "p3",
    name: "Garden Townhouse",
    location: "Bangalore",
    price: "₹1.2 Cr",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 3,
    area: "2200 sq ft",
    features: ["Garden", "Modular Kitchen", "Power Backup"],
  },
  {
    id: "p4",
    name: "Modern Penthouse",
    location: "Gurgaon",
    price: "₹3.1 Cr",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: "4100 sq ft",
    features: ["Terrace", "Smart Home", "Private Elevator"],
  },
  {
    id: "p5",
    name: "Mountain View Cottage",
    location: "Shimla",
    price: "₹90 L",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Cottage",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft",
    features: ["Mountain View", "Fireplace", "Wooden Interiors"],
  },
  {
    id: "p6",
    name: "Riverside Bungalow",
    location: "Pune",
    price: "₹1.5 Cr",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Bungalow",
    bedrooms: 3,
    bathrooms: 3,
    area: "2800 sq ft",
    features: ["River View", "Lawn", "Open Kitchen"],
  },
];

// Filter options
const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Cottage",
  "Bungalow",
];
const PRICE_RANGES = [
  "All",
  "Under ₹1 Cr",
  "₹1 Cr - ₹2 Cr",
  "₹2 Cr - ₹3 Cr",
  "Above ₹3 Cr",
];
const BEDROOM_OPTIONS = ["All", "1", "2", "3", "4+"];
const LOCATIONS = [
  "All",
  "South Delhi",
  "Mumbai",
  "Bangalore",
  "Gurgaon",
  "Pune",
  "Shimla",
];

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(PROPERTIES);
  const [filters, setFilters] = useState({
    type: "All",
    priceRange: "All",
    bedrooms: "All",
    location: "All",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("Default");

  // Apply filters and search
  useEffect(() => {
    let result = [...PROPERTIES];

    // Apply search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (property) =>
          property.name.toLowerCase().includes(lowercasedQuery) ||
          property.location.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Apply property type filter
    if (filters.type !== "All") {
      result = result.filter((property) => property.type === filters.type);
    }

    // Apply location filter
    if (filters.location !== "All") {
      result = result.filter(
        (property) => property.location === filters.location
      );
    }

    // Apply bedroom filter
    if (filters.bedrooms !== "All") {
      if (filters.bedrooms === "4+") {
        result = result.filter((property) => property.bedrooms >= 4);
      } else {
        result = result.filter(
          (property) => property.bedrooms === parseInt(filters.bedrooms)
        );
      }
    }

    // Apply price range filter
    if (filters.priceRange !== "All") {
      switch (filters.priceRange) {
        case "Under ₹1 Cr":
          result = result.filter((property) => {
            const price = parseInt(property.price.replace(/[^\d]/g, ""));
            return price < 10000000;
          });
          break;
        case "₹1 Cr - ₹2 Cr":
          result = result.filter((property) => {
            const price = parseInt(property.price.replace(/[^\d]/g, ""));
            return price >= 10000000 && price <= 20000000;
          });
          break;
        case "₹2 Cr - ₹3 Cr":
          result = result.filter((property) => {
            const price = parseInt(property.price.replace(/[^\d]/g, ""));
            return price > 20000000 && price <= 30000000;
          });
          break;
        case "Above ₹3 Cr":
          result = result.filter((property) => {
            const price = parseInt(property.price.replace(/[^\d]/g, ""));
            return price > 30000000;
          });
          break;
      }
    }

    // Apply sorting
    if (sortOption === "Price (Low to High)") {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
        return priceA - priceB;
      });
    } else if (sortOption === "Price (High to Low)") {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
        return priceB - priceA;
      });
    }

    setFilteredProperties(result);
  }, [searchQuery, filters, sortOption]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: "All",
      priceRange: "All",
      bedrooms: "All",
      location: "All",
    });
    setSortOption("Default");
    setSearchQuery("");
  };

  // Apply a specific filter
  const applyFilter = (filterType: string, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  // Render property card
  const renderPropertyCard = ({ item }: { item: Property }) => (
    <TouchableOpacity style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyTag}>
        <Text style={styles.propertyTagText}>{item.type}</Text>
      </View>
      <View style={styles.propertyContent}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyName}>{item.name}</Text>
        <View style={styles.propertyLocationRow}>
          <Ionicons name="location-outline" size={16} color="#777" />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>
        <View style={styles.propertyDetailsRow}>
          <View style={styles.propertyDetail}>
            <Ionicons name="bed-outline" size={16} color="#777" />
            <Text style={styles.propertyDetailText}>{item.bedrooms} Beds</Text>
          </View>
          <View style={styles.propertyDetail}>
            <Ionicons name="water-outline" size={16} color="#777" />
            <Text style={styles.propertyDetailText}>
              {item.bathrooms} Baths
            </Text>
          </View>
          <View style={styles.propertyDetail}>
            <Ionicons name="resize-outline" size={16} color="#777" />
            <Text style={styles.propertyDetailText}>{item.area}</Text>
          </View>
        </View>
        <View style={styles.featuresContainer}>
          {item.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
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
            placeholder="Search properties by name or location"
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

          {/* Property Type Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Property Type</Text>
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
                    filters.type === type && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("type", type)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.type === type && styles.activeFilterOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Price Range</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {PRICE_RANGES.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterOption,
                    filters.priceRange === range && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("priceRange", range)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.priceRange === range &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Bedrooms Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Bedrooms</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {BEDROOM_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    filters.bedrooms === option && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("bedrooms", option)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.bedrooms === option &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Location Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Location</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsContainer}
            >
              {LOCATIONS.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[
                    styles.filterOption,
                    filters.location === location && styles.activeFilterOption,
                  ]}
                  onPress={() => applyFilter("location", location)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.location === location &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {location}
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
                  sortOption === "Default" && styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Default")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Default" && styles.activeSortOptionText,
                  ]}
                >
                  Default
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortOption === "Price (Low to High)" &&
                    styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Price (Low to High)")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Price (Low to High)" &&
                      styles.activeSortOptionText,
                  ]}
                >
                  Price (Low to High)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortOption === "Price (High to Low)" &&
                    styles.activeSortOption,
                ]}
                onPress={() => setSortOption("Price (High to Low)")}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === "Price (High to Low)" &&
                      styles.activeSortOptionText,
                  ]}
                >
                  Price (High to Low)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Results Summary */}
      <View style={styles.resultsSummary}>
        <Text style={styles.resultsCount}>
          {filteredProperties.length} Properties Found
        </Text>
        {(filters.type !== "All" ||
          filters.priceRange !== "All" ||
          filters.bedrooms !== "All" ||
          filters.location !== "All") && (
          <TouchableOpacity
            onPress={resetFilters}
            style={styles.clearFiltersButton}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Property Listings */}
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="home-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No properties found</Text>
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
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  propertyTag: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  propertyTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  propertyContent: {
    padding: 15,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  propertyLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
  propertyDetailsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  propertyDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  propertyDetailText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureTag: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#666",
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
