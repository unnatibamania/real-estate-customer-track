import { StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";

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

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 28,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 16,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 10,
    color: colors.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  passwordVisibilityButton: {
    padding: 5,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 28,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    paddingHorizontal: 15,
    color: "#888",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 28,
    height: 50,
    marginTop: 5,
    shadowRadius: 2,
    elevation: 2,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  googleLetter: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "semibold",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 28,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 16,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 10,
    color: colors.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  passwordVisibilityButton: {
    padding: 5,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 28,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    paddingHorizontal: 15,
    color: "#888",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 28,
    height: 50,
    marginTop: 5,
    shadowRadius: 2,
    elevation: 2,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  googleLetter: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "semibold",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
