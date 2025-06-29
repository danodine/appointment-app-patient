import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/authSlice";

// Import the styles you will create
import styles from "./styles";

const ForgotPasswordReset = () => {
  const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const handleResetPassword = async () => {
  if (!resetCode || !password || !passwordConfirm) {
    Alert.alert("Error", "Please fill in all fields.");
    return;
  }

  if (password !== passwordConfirm) {
    Alert.alert("Error", "Passwords do not match.");
    return;
  }

  const resultAction = await dispatch(
    resetPassword({ resetCode, password, passwordConfirm })
  );

  if (resetPassword.fulfilled.match(resultAction)) {
    Alert.alert("Success", "Your password has been reset successfully.");
    navigation.navigate("Login");
  } else {
    Alert.alert("Error", resultAction.payload || "Password reset failed.");
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={COLORS.main}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>Fill in the filds below</Text>
          <Text style={styles.emailText}>password token set to: {email}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your reset code"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="number-pad"
            autoCapitalize="none"
            value={resetCode}
            onChangeText={setResetCode}
          />

          <TextInput
            style={styles.input}
            placeholder="enter your new password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="confirm your new password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleResetPassword}
            disabled={loading.resetPassword}
          >
            <Text style={styles.buttonText}>
              {loading.resetPassword ? "loading" : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordReset;
