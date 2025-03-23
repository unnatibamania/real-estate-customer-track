import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/Colors";
import { addStyles } from "../../styles/add.styles";

interface Asset {
  uri: string;
}

const { height, width } = Dimensions.get("window");

export const AddProperty = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    price: "",
    address: "",
    rooms: "",
  });

  // Image state
  const [images, setImages] = useState<string[]>([]);

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Image picker function
  const pickImage = async () => {
    // Request permissions
    // if (Platform.OS !== "web") {
    //   const { status } =
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     Alert.alert(
    //       "Permission Required",
    //       "Sorry, we need camera roll permissions to upload images!"
    //     );
    //     return;
    //   }
    // }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets) {
      // Get the URIs of selected images
      const newImages = result.assets.map((asset: Asset) => asset.uri);

      // Add to existing images (limit to 5 total)
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        return updatedImages.slice(0, 5); // Limit to 5 images
      });
    }
  };

  // Remove image function
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Submit form function
  const handleSubmit = () => {
    // Validate form
    if (
      !formData.name ||
      !formData.area ||
      !formData.price ||
      !formData.address ||
      !formData.rooms
    ) {
      Alert.alert("Missing Information", "Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Missing Images", "Please upload at least one image");
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    // Here you would typically send the data to your API
    // For demonstration, we'll just simulate a delay
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Property has been added successfully!");

      // Reset form
      setFormData({
        name: "",
        area: "",
        price: "",
        address: "",
        rooms: "",
      });
      setImages([]);
    }, 1500);
  };

  return (
    <SafeAreaView style={addStyles.safeArea}>
      <KeyboardAvoidingView
        style={addStyles.keyboardAvoidContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={addStyles.scrollView}
          contentContainerStyle={addStyles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          <View style={addStyles.formContainer}>
            {/* Property Name */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Property Name</Text>
              <View style={addStyles.inputContainer}>
                <Ionicons
                  name="home-outline"
                  size={20}
                  color="#555"
                  style={addStyles.inputIcon}
                />
                <TextInput
                  style={addStyles.input}
                  placeholder="Enter property name"
                  value={formData.name}
                  onChangeText={(value) => handleChange("name", value)}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Square Feet Area */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Square Feet Area</Text>
              <View style={addStyles.inputContainer}>
                <Ionicons
                  name="resize-outline"
                  size={20}
                  color="#555"
                  style={addStyles.inputIcon}
                />
                <TextInput
                  style={addStyles.input}
                  placeholder="Enter area in sq ft"
                  value={formData.area}
                  onChangeText={(value) => handleChange("area", value)}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Price */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Price</Text>
              <View style={addStyles.inputContainer}>
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color="#555"
                  style={addStyles.inputIcon}
                />
                <TextInput
                  style={addStyles.input}
                  placeholder="Enter price"
                  value={formData.price}
                  onChangeText={(value) => handleChange("price", value)}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Address */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Address</Text>
              <View style={[addStyles.inputContainer, { height: 80 }]}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#555"
                  style={[addStyles.inputIcon, { marginTop: 5 }]}
                />
                <TextInput
                  style={[
                    addStyles.input,
                    { textAlignVertical: "top", paddingTop: 10 },
                  ]}
                  placeholder="Enter full address"
                  value={formData.address}
                  onChangeText={(value) => handleChange("address", value)}
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Number of Rooms */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Number of Rooms</Text>
              <View style={addStyles.inputContainer}>
                <Ionicons
                  name="bed-outline"
                  size={20}
                  color="#555"
                  style={addStyles.inputIcon}
                />
                <TextInput
                  style={addStyles.input}
                  placeholder="Enter number of rooms"
                  value={formData.rooms}
                  onChangeText={(value) => handleChange("rooms", value)}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Image Upload */}
            <View style={addStyles.inputGroup}>
              <Text style={addStyles.label}>Property Images</Text>
              <Text style={addStyles.helperText}>Upload up to 5 images</Text>

              {/* Image Previews */}
              {images.length > 0 && (
                <View style={addStyles.imagePreviewContainer}>
                  {images.map((uri, index) => (
                    <View key={index} style={addStyles.imagePreview}>
                      <Image source={{ uri }} style={addStyles.previewImage} />
                      <TouchableOpacity
                        style={addStyles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Ionicons name="close-circle" size={24} color="" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Upload Button */}
              <TouchableOpacity
                style={[
                  addStyles.uploadButton,
                  images.length >= 5 && addStyles.disabledButton,
                ]}
                onPress={pickImage}
                disabled={images.length >= 5}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      opacity: 0.8,
                      flexShrink: 0,
                      height: 44,
                      width: 44,
                      padding: 10,
                      borderRadius: 100,
                    }}
                  >
                    <Ionicons name="camera-outline" size={24} color="#fff" />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>Select files to upload</Text>

                    <Text style={{ fontSize: 12, color: "#777" }}>
                      Supported formats: JPG, PNG, GIF
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                addStyles.submitButton,
                isSubmitting && addStyles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text style={addStyles.submitButtonText}>Submitting...</Text>
              ) : (
                <>
                  <Ionicons name="add-circle-outline" size={20} color="#fff" />
                  <Text style={addStyles.submitButtonText}>Add Property</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Extra padding at the bottom for better scrolling */}
            <View style={addStyles.bottomPadding} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
