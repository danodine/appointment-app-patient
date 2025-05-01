import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Button,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { signupUser } from "../../../redux/authSlice";
import { provinces } from "../../../constants/vars";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  validateEcuadorianCedula,
  isStrongPassword,
  formatDate,
} from "../../../utils/helpers";
import styles from "./styles";
import STRINGS from "../../../constants/strings";
import { COLORS } from "../../../styles/theme";

const SingUpScreen = ({ navigation }) => {
  const language = useSelector((state) => state.language.language);
  const text = STRINGS[language].signupUser;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDateError, setBirthDateError] = useState("");
  const [birthDateTouched, setBirthDateTouched] = useState(false);
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const [nationalId, setNationalId] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [nationalIdTouched, setNationalIdTouched] = useState(false);

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const handleRegister = async () => {
    await dispatch(
      signupUser({
        name,
        email,
        password,
        passwordConfirm,
        nationalId,
        birthDate,
        phone,
        street,
        city,
      }),
    ).unwrap();

    navigation.navigate("Login");
  };

  const handleEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : text.emailInvalid);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setPasswordError(isStrongPassword(value) ? "" : text.passwordInvalid);
  };

  const handlePasswordConfirm = (value) => {
    setPasswordConfirm(value);
    setPasswordConfirmError(value === password ? "" : text.passwordMismatch);
  };

  const handlePhone = (value) => {
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
    const phoneRegex = /^(09\d{8}|0[2-7]\d{7})$/;
    setPhoneError(phoneRegex.test(value) ? "" : text.phoneInvalid);
  };

  const handleNationalId = (value) => {
    setNationalId(value);
    setNationalIdError(
      validateEcuadorianCedula(value) ? "" : text.nationalIdInvalid,
    );
  };

  const openPicker = () => {
    setTempDate(birthDate);
    setShow(true);
  };

  const handleBirthDate = (event, newDate) => {
    if (newDate) {
      setTempDate(newDate);
    }
    if (Platform.OS === "ios") {
      setTempDate(newDate);
    }
  };

  const confirmDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    tempDate.setHours(0, 0, 0, 0);

    if (tempDate >= today) {
      setBirthDateError(text.birthDateInvalid);
      setShow(false);
      return;
    }

    setBirthDate(tempDate);
    setBirthDateError("");
    setShow(false);
  };

  const cancelPicker = () => {
    setShow(false);
  };

  const isFormValid =
    name &&
    email &&
    !emailError &&
    password &&
    !passwordError &&
    passwordConfirm &&
    !passwordConfirmError &&
    nationalId &&
    !nationalIdError &&
    birthDate &&
    !birthDateError &&
    phone &&
    !phoneError &&
    city &&
    street;

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
        <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.title}>
            {text.createAccountTitle1}
            <Text style={styles.bold}>{text.createAccountTitle2}</Text>
          </Text>

          <Text style={styles.label}>{text.name}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={text.namePlaceholder}
          />

          <Text style={styles.label}>{text.nationalId}</Text>
          <TextInput
            style={[
              styles.input,
              nationalIdError && nationalIdTouched ? styles.errorBorder : null,
            ]}
            value={nationalId}
            onChangeText={handleNationalId}
            onBlur={() => setNationalIdTouched(true)}
            placeholder={text.nationalIDPlaceholder}
          />
          {nationalIdError && nationalIdTouched && (
            <Text style={styles.errorText}>{nationalIdError}</Text>
          )}

          <View>
            <Text style={styles.label}>{text.birthDate}</Text>
            <Pressable onPress={openPicker}>
              <TextInput
                value={birthDate ? formatDate(birthDate) : ""}
                editable={false}
                pointerEvents="none"
                style={[
                  styles.input,
                  birthDateError ? styles.errorBorder : null,
                ]}
              />
            </Pressable>
            {birthDateError && birthDateTouched && (
              <Text style={styles.errorText}>{birthDateError}</Text>
            )}
            {Platform.OS === "android" && show && (
              <Modal transparent animationType="slide">
                <View style={styles.datePickerContainerView}>
                  <View style={styles.datePickerView}>
                    <DateTimePicker
                      value={tempDate}
                      mode="date"
                      display="default"
                      onChange={handleBirthDate}
                    />
                    <View style={styles.androidCalendarButtonsView}>
                      <Button title={text.cancel} onPress={cancelPicker} />
                      <Button title={text.ok} onPress={confirmDate} />
                    </View>
                  </View>
                </View>
              </Modal>
            )}
            {Platform.OS === "ios" && show && (
              <View>
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="spinner"
                  onChange={handleBirthDate}
                />
                <Button title={text.done} onPress={confirmDate} />
              </View>
            )}
          </View>

          <Text style={styles.label}>{text.phone}</Text>
          <TextInput
            style={[
              styles.input,
              phoneError && phoneTouched ? styles.errorBorder : null,
            ]}
            value={phone}
            onChangeText={handlePhone}
            onBlur={() => setPhoneTouched(true)}
            keyboardType="numeric"
            placeholder={text.phonePlaceholder}
          />
          {phoneError && phoneTouched && (
            <Text style={styles.errorText}>{phoneError}</Text>
          )}

          <Text style={styles.label}>{text.province}</Text>
          <Dropdown
            style={styles.input}
            data={provinces}
            labelField="label"
            valueField="value"
            value={city}
            onChange={(item) => setCity(item.value)}
          />

          <Text style={styles.label}>{text.street}</Text>
          <TextInput
            style={styles.input}
            value={street}
            onChangeText={setStreet}
            placeholder={text.streetPlaceholder}
          />

          <Text style={styles.label}>{text.email}</Text>
          <TextInput
            style={[
              styles.input,
              emailError && emailTouched ? styles.errorBorder : null,
            ]}
            value={email}
            onChangeText={handleEmail}
            onBlur={() => setEmailTouched(true)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder={text.emailPlaceholder}
          />
          {emailError && emailTouched && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}

          <Text style={styles.label}>{text.password}</Text>
          <TextInput
            style={[
              styles.input,
              passwordError && passwordTouched ? styles.errorBorder : null,
            ]}
            value={password}
            onChangeText={handlePassword}
            onBlur={() => setPasswordTouched(true)}
            secureTextEntry
            placeholder={text.passwordPlaceholder}
          />
          {passwordError && passwordTouched && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          <Text style={styles.label}>{text.confirmPassword}</Text>
          <TextInput
            style={[
              styles.input,
              passwordConfirmError && passwordConfirmTouched
                ? styles.errorBorder
                : null,
            ]}
            value={passwordConfirm}
            onChangeText={handlePasswordConfirm}
            onBlur={() => setPasswordConfirmTouched(true)}
            secureTextEntry
            placeholder={text.passwordPlaceholder}
          />
          {passwordConfirmError && passwordConfirmTouched && (
            <Text style={styles.errorText}>{passwordConfirmError}</Text>
          )}

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonOpacity]}
            onPress={handleRegister}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>{text.createAccountButton}</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

SingUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SingUpScreen;
