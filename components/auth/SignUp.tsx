import { View, Text } from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native";
import { signupStyles } from "@/styles/auth.styles";

export const SignUp = ({
  handleGoogleSSOLogin,
}: {
  handleGoogleSSOLogin: () => void;
}) => {
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
    handleGoogleSSOLogin();
  };

  return (
    <View style={signupStyles.container}>
      <View style={signupStyles.formContainer}>
        {/* Email Input */}
        <View style={signupStyles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#555"
            style={signupStyles.inputIcon}
          />
          <TextInput
            style={signupStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View style={signupStyles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#555"
            style={signupStyles.inputIcon}
          />
          <TextInput
            style={signupStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={signupStyles.passwordVisibilityButton}
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
        <TouchableOpacity style={signupStyles.forgotPasswordButton}>
          <Text style={signupStyles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={signupStyles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={signupStyles.buttonText}>Signing Up...</Text>
          ) : (
            <Text style={signupStyles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Separator */}
        <View style={signupStyles.separatorContainer}>
          <View style={signupStyles.separator} />
          <Text style={signupStyles.separatorText}>OR</Text>
          <View style={signupStyles.separator} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          style={signupStyles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Text style={signupStyles.googleButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
