import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,

    backgroundColor: "#000000",
    height: 100,
  },

  authContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 12,
  },

  authHeader: {
    fontSize: 24,
    fontWeight: "semibold",
    color: "#ffffff",
  },

  authSubHeader: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#ffffff",
  },

  subContainer: {
    borderRadius: 28,
    backgroundColor: "#ffffff",
    height: 400,
    width: 400,
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    height: "100%",
  },

  tabHeader: {
    flexDirection: "row",
    borderRadius: 8,
    margin: 24,
    borderRadius: 28,
    backgroundColor: "#eeeeee",
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    cursor: "pointer",
  },
  activeTabButton: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#777777",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#000000",
  },
  formContainer: {
    padding: 20,
  },
});
