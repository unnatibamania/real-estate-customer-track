import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useAuth } from "@/contexts/auth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/constants/Colors";
import { authStyles } from "@/styles/auth.styles";

const { width } = Dimensions.get("window");

export default function Login() {
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError("");
      await signIn(email, password);
      // No need to redirect here as the auth context will handle redirection
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(err);
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setGoogleLoading(true);
      await signInWithGoogle();
      // No need to redirect here as the auth context will handle redirection
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#000000" }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.container}>
            {/* Top decoration */}
            <LinearGradient
              colors={["#222222", "#111111", "#000000"]}
              style={styles.headerGradient}
            />

            {/* Logo and App Name */}
            <View style={styles.logoContainer}>
              {/* <View style={styles.logoCircle}>
                <Ionicons name="home" size={40} color="#ffffff" />
              </View> */}
              <Text style={styles.appName}>Customer Track</Text>
            </View>

            {/* Welcome section */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to access your account
              </Text>
            </View>

            {/* Error message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Login form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.buttonText}>Signing In...</Text>
                ) : (
                  <>
                    <Ionicons name="log-in-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Sign In</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* OR separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separator} />
            </View>

            {/* Social login */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={isLoading || googleLoading}
            >
              {googleLoading ? (
                <Text style={styles.googleButtonText}>
                  Signing in with Google...
                </Text>
              ) : (
                <>
                  <View style={styles.googleIconContainer}>
                    <Text style={styles.googleLetter}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>
                    Continue with Google
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Sign up link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: "semibold",
    marginTop: 12,
    color: "#ffffff",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    maxWidth: "80%",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: "85%",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginLeft: 8,
  },
  formContainer: {
    width: "85%",
    marginBottom: 25,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 15,
    height: 55,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
    color: "#ffffff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  passwordVisibilityButton: {
    padding: 5,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
  },
  loginButton: {
    backgroundColor: "#ffffff",
    cursor: "pointer",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  separatorText: {
    paddingHorizontal: 15,
    color: "#ffffff",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    height: 55,
    width: "85%",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
    fontWeight: "bold",
  },
  googleButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 30,
  },
  signupText: {
    color: "#ffffff",
    fontSize: 14,
  },
  signupLink: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
