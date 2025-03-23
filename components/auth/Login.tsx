import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { colors } from "@/constants/Colors";

import { loginStyles } from "@/styles/auth.styles";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      // Show validation error
      return;
    }

    setIsLoading(true);
    // Implement your login logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Implement Google authentication
    console.log("Google login pressed");
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        {/* Email Input */}
        <View style={loginStyles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#555"
            style={loginStyles.inputIcon}
          />
          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View style={loginStyles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#555"
            style={loginStyles.inputIcon}
          />
          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={loginStyles.passwordVisibilityButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={loginStyles.forgotPasswordButton}>
          <Text style={loginStyles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={loginStyles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={loginStyles.buttonText}>Signing In...</Text>
          ) : (
            <Text style={loginStyles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Separator */}
        <View style={loginStyles.separatorContainer}>
          <View style={loginStyles.separator} />
          <Text style={loginStyles.separatorText}>OR</Text>
          <View style={loginStyles.separator} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          style={loginStyles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Text style={loginStyles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
