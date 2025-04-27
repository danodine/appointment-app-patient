import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/authSlice";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { toggleLanguage } from "../../utils/helpers";
import STRINGS from "../../constants/strings";
import styles from "../../styles/loginScreenStyles";
import { COLORS } from "../../styles/theme";

const LoginScreen = ({ navigation }) => {
  const language = useSelector((state) => state.language.language);
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearError());
    }, [])
  );

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };
  const handleSingUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SingUp" }],
    });
  };

  useEffect(() => {
    if (user?.role) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard", params: { role: user.role } }],
      });
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
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
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>{STRINGS[language].login.title}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS[language].login.emailPlaceHolder}
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={STRINGS[language].login.passwordPlaceHolder}
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {loading && <ActivityIndicator size="small" />}
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>
                {STRINGS[language].login.logIn}
              </Text>
            </TouchableOpacity>
            <Text style={styles.forgotPassword}>
              {STRINGS[language].login.forgotPassword}
            </Text>
            <TouchableOpacity onPress={handleSingUp}>
              <Text style={styles.signup}>
                {STRINGS[language].login.createAccount}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {STRINGS[language].login.country}
          <Text style={styles.bold}>{STRINGS[language].login.countryName}</Text>
        </Text>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={styles.footerText}>
            {STRINGS[language].login.language}
            <Text style={styles.bold}>
              {STRINGS[language].login.selectedLanguage}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginScreen;
