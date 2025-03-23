import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { addEnquiryStyles } from "../../styles/add.styles";

// Mock data for existing properties
const EXISTING_PROPERTIES = [
  { id: "p1", name: "Luxury Villa", location: "South Delhi", price: "₹2.5 Cr" },
  {
    id: "p2",
    name: "Beachfront Apartment",
    location: "Mumbai",
    price: "₹1.8 Cr",
  },
  {
    id: "p3",
    name: "Garden Townhouse",
    location: "Bangalore",
    price: "₹1.2 Cr",
  },
  { id: "p4", name: "Penthouse Suite", location: "Gurgaon", price: "₹3.1 Cr" },
  {
    id: "p5",
    name: "Mountain View Cottage",
    location: "Shimla",
    price: "₹90 L",
  },
];

// Flat requirement options
const FLAT_REQUIREMENTS = [
  { label: "1 BHK", value: "1 BHK" },
  { label: "2 BHK", value: "2 BHK" },
  { label: "3 BHK", value: "3 BHK" },
  { label: "4 BHK", value: "4 BHK" },
  { label: "Penthouse", value: "Penthouse" },
  { label: "Villa", value: "Villa" },
  { label: "Farmhouse", value: "Farmhouse" },
  { label: "Studio Apartment", value: "Studio Apartment" },
];

export const AddEnquiry = () => {
  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    flatRequirement: "",
    message: "",
    budget: "",
    numberOfVisits: "",
  });

  // Selected properties state
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Dropdown state
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle mobile number input (ensure numeric only)
  const handleMobileInput = (value: string) => {
    // Only allow digits
    const numericValue = value.replace(/[^0-9]/g, "");
    handleChange("mobileNumber", numericValue);
  };

  // Handle flat requirement selection
  const selectFlatRequirement = (requirement: string) => {
    handleChange("flatRequirement", requirement);
    setDropdownVisible(false);
  };

  // Toggle property selection
  const togglePropertySelection = (property: any) => {
    setSelectedProperties((prevSelected: any) => {
      if (prevSelected.some((p: any) => p.id === property.id)) {
        return prevSelected.filter((p: any) => p.id !== property.id);
      } else {
        return [...prevSelected, property];
      }
    });
  };

  // Submit form
  const handleSubmit = () => {
    // Basic validation
    if (!formData.customerName || !formData.mobileNumber) {
      Alert.alert(
        "Missing Information",
        "Please provide customer name and mobile number"
      );
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // In a real app, you would submit the data here
    Alert.alert(
      "Enquiry Submitted",
      "Customer enquiry has been recorded successfully!",
      [{ text: "OK" }]
    );

    // Reset form after submission
    setFormData({
      customerName: "",
      mobileNumber: "",
      flatRequirement: "",
      message: "",
      budget: "",
      numberOfVisits: "",
    });
    setSelectedProperties([]);
  };

  return (
    <SafeAreaView style={addEnquiryStyles.safeArea}>
      <KeyboardAvoidingView
        style={addEnquiryStyles.keyboardAvoidContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={addEnquiryStyles.scrollView}
          contentContainerStyle={addEnquiryStyles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={addEnquiryStyles.formContainer}>
            <Text style={addEnquiryStyles.headerText}>
              New Customer Enquiry
            </Text>

            {/* Customer Name */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Customer Name</Text>
              <View style={addEnquiryStyles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#555"
                  style={addEnquiryStyles.inputIcon}
                />
                <TextInput
                  style={addEnquiryStyles.input}
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChangeText={(value) => handleChange("customerName", value)}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Mobile Number - Updated to ensure numeric input */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Mobile Number</Text>
              <View style={addEnquiryStyles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color="#555"
                  style={addEnquiryStyles.inputIcon}
                />
                <TextInput
                  style={addEnquiryStyles.input}
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobileNumber}
                  onChangeText={handleMobileInput}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Flat Requirement - Changed to dropdown select */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Flat Requirement</Text>
              <TouchableOpacity
                style={addEnquiryStyles.dropdownContainer}
                onPress={() => setDropdownVisible(true)}
              >
                <Ionicons
                  name="home-outline"
                  size={20}
                  color="#555"
                  style={addEnquiryStyles.inputIcon}
                />
                <Text
                  style={[
                    addEnquiryStyles.dropdownText,
                    !formData.flatRequirement &&
                      addEnquiryStyles.placeholderText,
                  ]}
                >
                  {formData.flatRequirement || "Select flat type"}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="#555" />
              </TouchableOpacity>

              {/* Dropdown Modal */}
              <Modal
                visible={dropdownVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableOpacity
                  style={addEnquiryStyles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setDropdownVisible(false)}
                >
                  <View style={addEnquiryStyles.modalContent}>
                    <View style={addEnquiryStyles.modalHeader}>
                      <Text style={addEnquiryStyles.modalTitle}>
                        Select Flat Requirement
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDropdownVisible(false)}
                      >
                        <Ionicons name="close" size={24} color="#333" />
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={FLAT_REQUIREMENTS}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            addEnquiryStyles.optionItem,
                            formData.flatRequirement === item.value &&
                              addEnquiryStyles.selectedOption,
                          ]}
                          onPress={() => selectFlatRequirement(item.value)}
                        >
                          <Text style={addEnquiryStyles.optionText}>
                            {item.label}
                          </Text>
                          {formData.flatRequirement === item.value && (
                            <Ionicons
                              name="checkmark"
                              size={20}
                              color="#4a90e2"
                            />
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* Budget */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Budget</Text>
              <View style={addEnquiryStyles.inputContainer}>
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color="#555"
                  style={addEnquiryStyles.inputIcon}
                />
                <TextInput
                  style={addEnquiryStyles.input}
                  placeholder="E.g., ₹50L - ₹1.2Cr"
                  value={formData.budget}
                  onChangeText={(value) => handleChange("budget", value)}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Number of Visits */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Number of Visits</Text>
              <View style={addEnquiryStyles.inputContainer}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#555"
                  style={addEnquiryStyles.inputIcon}
                />
                <TextInput
                  style={addEnquiryStyles.input}
                  placeholder="Enter number of previous visits"
                  value={formData.numberOfVisits}
                  onChangeText={(value) => {
                    // Only allow digits
                    const numericValue = value.replace(/[^0-9]/g, "");
                    handleChange("numberOfVisits", numericValue);
                  }}
                  keyboardType="number-pad"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Message */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>Message</Text>
              <View style={[addEnquiryStyles.inputContainer, { height: 100 }]}>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color="#555"
                  style={[addEnquiryStyles.inputIcon, { marginTop: 10 }]}
                />
                <TextInput
                  style={[
                    addEnquiryStyles.input,
                    { textAlignVertical: "top", paddingTop: 10 },
                  ]}
                  placeholder="Enter additional details or customer requirements"
                  value={formData.message}
                  onChangeText={(value) => handleChange("message", value)}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Existing Properties Section */}
            <View style={addEnquiryStyles.inputGroup}>
              <Text style={addEnquiryStyles.label}>
                Attach Existing Properties
              </Text>
              <Text style={addEnquiryStyles.helperText}>
                Select properties the customer is interested in
              </Text>

              {/* Property List */}
              <View style={addEnquiryStyles.propertiesList}>
                {EXISTING_PROPERTIES.map((property) => (
                  <TouchableOpacity
                    key={property.id}
                    style={[
                      addEnquiryStyles.propertyItem,
                      selectedProperties.some(
                        (p: any) => p.id === property.id
                      ) && addEnquiryStyles.selectedPropertyItem,
                    ]}
                    onPress={() => togglePropertySelection(property)}
                  >
                    <View style={addEnquiryStyles.propertyDetails}>
                      <Text style={addEnquiryStyles.propertyName}>
                        {property.name}
                      </Text>
                      <Text style={addEnquiryStyles.propertyLocation}>
                        {property.location}
                      </Text>
                      <Text style={addEnquiryStyles.propertyPrice}>
                        {property.price}
                      </Text>
                    </View>
                    <View style={addEnquiryStyles.propertyCheckbox}>
                      {selectedProperties.some(
                        (p: any) => p.id === property.id
                      ) ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#4a90e2"
                        />
                      ) : (
                        <Ionicons
                          name="ellipse-outline"
                          size={24}
                          color="#777"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={addEnquiryStyles.submitButton}
              onPress={handleSubmit}
            >
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={addEnquiryStyles.submitButtonText}>
                Submit Enquiry
              </Text>
            </TouchableOpacity>

            {/* Extra padding at the bottom for better scrolling */}
            <View style={addEnquiryStyles.bottomPadding} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
