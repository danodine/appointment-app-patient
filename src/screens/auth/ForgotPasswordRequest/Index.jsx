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
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../../../redux/authSlice";

import styles from "./styles";

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert("Error", "Please enter your email address.");
    return;
  }

  const resultAction = await dispatch(requestPasswordReset({ email }));
  if (requestPasswordReset.fulfilled.match(resultAction)) {
    Alert.alert("Success", resultAction.payload);
    navigation.navigate("ForgotPasswordReset", { email });
  } else {
    Alert.alert("Error", resultAction.payload || "Something went wrong.");
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
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleForgotPassword}
            disabled={loading.requestPasswordReset}
          >
            <Text style={styles.buttonText}>
              {loading.requestPasswordReset ? "is loading" : "Send Reset Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordRequest;
