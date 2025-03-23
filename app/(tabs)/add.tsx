import { View, Text, TouchableOpacity } from "react-native";
import { addStyles } from "@/styles/add.styles";
import { useState } from "react";
import { AddEnquiry } from "@/components/add/AddEnquiry";
import { AddProperty } from "@/components/add/AddProperty";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  const [activeTab, setActiveTab] = useState("enquiry");

  return (
    <View style={addStyles.container}>
      <View style={addStyles.tabHeader}>
        <TouchableOpacity
          style={[
            addStyles.tabButton,
            activeTab === "enquiry" && addStyles.activeTabButton,
          ]}
          onPress={() => setActiveTab("enquiry")}
        >
          <Text
            style={[
              addStyles.tabButtonText,
              activeTab === "enquiry" && addStyles.activeTabText,
            ]}
          >
            Enquiry
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            addStyles.tabButton,
            activeTab === "property" && addStyles.activeTabButton,
          ]}
          onPress={() => setActiveTab("property")}
        >
          <Text
            style={[
              addStyles.tabButtonText,
              activeTab === "property" && addStyles.activeTabText,
            ]}
          >
            Property
          </Text>
        </TouchableOpacity>
      </View>

      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          {activeTab === "enquiry" && <AddEnquiry />}
          {activeTab === "property" && <AddProperty />}
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: "90%",
  },
});
