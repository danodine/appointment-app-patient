import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { provinces, countrys, bloodTypes } from "../../../constants/vars";
import { isStrongPassword } from "../../../utils/helpers";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getCurrentUser,
  updateUser,
  deleteMe,
  clearUserBanner,
  clearUserError,
} from "../../../redux/userSlice";
import {
  changePassword,
  logoutUser,
  clearAuth,
  clearAuthBanner,
} from "../../../redux/authSlice";
import PropTypes from "prop-types";
import { CommonActions } from "@react-navigation/native";
import TopBanner from "../components/TopBanner/Index";
import { ICONS, COLORS, SIZES, FONT_SIZES } from "../../../styles/theme";
import styles from "./syles";
import STRINGS from "../../../constants/strings";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ navigation }) {
  const { currentUser, cachedProfileImageUri, userBanner } = useSelector(
    (state) => state.users
  );
  const { authBanner, error, loading } = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language.language);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [changePass, setChangePass] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [oldPasswordTouched, setOldPasswordTouched] = useState(false);

  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [blood, setBlood] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [editingField, setEditingField] = useState(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [detailsExpandedConditions, setDetailsExpandedConditions] =
    useState(false);
  const [detailsExpandedVaccines, setDetailsExpandedVaccines] = useState(false);

  const [profileImageUri, setProfileImageUri] = useState(null);

  const [medicalConditions, setMedicalConditions] = useState({});
  const [vaccines, setVaccines] = useState([]);
  const [newVaccineName, setNewVaccineName] = useState("");

  const [vaccineDate, setVaccineDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [bannerIsVisible, setBannerIsVisible] = useState(false);

  const [banner, setBanner] = useState(false);

  const dispatch = useDispatch();

  const inputRefs = {
    name: React.useRef(null),
    email: React.useRef(null),
    phone: React.useRef(null),
    address: React.useRef(null),
    height: React.useRef(null),
    weight: React.useRef(null),
  };

  const [newCondition, setNewCondition] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    STRINGS[language].medicalCategories[0]?.value || []
  );

  useEffect(() => {
    if (!currentUser) {
      dispatch(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (authBanner?.message) {
      setBannerIsVisible(true);
      setBanner({
        type: authBanner?.type,
        message: authBanner?.message,
      });
    }
    if (error?.get) {
      setBannerIsVisible(true);
      setBanner({
        type: "error",
        message: STRINGS[language].myProfile.banerErrorGetUser,
      });
    }
    if (userBanner?.message) {
      setBannerIsVisible(true);
      setBanner({
        type: userBanner?.type,
        message:
          userBanner?.message == "banerSuccess"
            ? STRINGS[language].myProfile.banerSuccess
            : STRINGS[language].myProfile.banerError,
      });
    }
  }, [authBanner, userBanner]);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setPhone(currentUser?.phone);
    setHeight(
      isNaN(currentUser?.profile?.heightCm) ? 0 : currentUser?.profile?.heightCm
    );
    setWeight(
      isNaN(currentUser?.profile?.weightKg) ? 0 : currentUser?.profile?.weightKg
    );
    setAddress(currentUser?.profile?.address?.street);
    setProvince(currentUser?.profile?.address?.city);
    setCountry(currentUser?.profile?.address?.country);
    setBlood(currentUser?.profile?.bloodType);
    setMedicalConditions(
      currentUser?.profile?.medicalConditions === undefined
        ? {}
        : currentUser?.profile?.medicalConditions
    );
    setVaccines(currentUser?.profile?.vaccines || []);
    setProfileImage(profileImageUri || cachedProfileImageUri);
  }, [currentUser]);

  const addMedicalCondition = () => {
    if (!newCondition.trim()) {
      Alert.alert("Error", STRINGS[language].medicalCategories.noCondition);
      return;
    }

    setMedicalConditions((prev) => {
      return {
        ...prev,
        [selectedCategory]: [
          ...(prev[selectedCategory] || []),
          newCondition.trim(),
        ],
      };
    });

    setNewCondition("");
  };
  const handleSaveChanges = async () => {
    const userData = {
      name,
      email,
      phone,
      profile: {
        heightCm: Number(height),
        weightKg: Number(weight),
        bloodType: blood,
        medicalConditions,
        vaccines,
        address: {
          street: address,
          city: province,
          country: country,
        },
      },
      profileImageUri,
    };
    await dispatch(updateUser(userData)).unwrap();
    dispatch(getCurrentUser());
    setProfileImageUri(null);
  };

  const handleChangePassword = () => {
    setChangePass(!changePass);
    setOldPassword("");
    setOldPasswordError("");
    setNewPassword("");
    setPasswordError("");
    setConfirmPassword("");
    setPasswordConfirmError("");
  };

  const handleSaveNewPassword = () => {
    dispatch(
      changePassword({
        passwordCurrent: oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      })
    );
    setOldPassword("");
    setOldPasswordError("");
    setNewPassword("");
    setPasswordError("");
    setConfirmPassword("");
    setPasswordConfirmError("");
  };

  const handleOldPassword = (value) => {
    setOldPassword(value);
    setOldPasswordError(
      value === "" ? STRINGS[language].myProfile.oldPasswordInvalid : ""
    );
  };

  const handlePassword = (value) => {
    setNewPassword(value);
    setPasswordError(
      isStrongPassword(value) ? "" : STRINGS[language].myProfile.passwordInvalid
    );
  };

  const handlePasswordConfirm = (value) => {
    setConfirmPassword(value);
    setPasswordConfirmError(
      value === newPassword ? "" : STRINGS[language].myProfile.passwordMismatch
    );
  };

  const isFormValid =
    oldPassword &&
    newPassword &&
    confirmPassword &&
    !passwordError &&
    !passwordConfirmError &&
    !oldPasswordError;

  const handleCloseAccount = async () => {
    // add a modal here
    await dispatch(deleteMe());
    await dispatch(logoutUser());
    await dispatch(clearAuth());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImageUri(uri);
      setProfileImage(uri);
    }
  };

  const handleBack = () => {
    navigation.goBack();
    setOldPassword("");
    setOldPasswordError("");
    setNewPassword("");
    setPasswordError("");
    setConfirmPassword("");
    setPasswordConfirmError("");
  };

  const renderField = (label, value, onChangeText, fieldKey) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.valueContainer}>
        {editingField === fieldKey ? (
          <TextInput
            ref={inputRefs[fieldKey]}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            autoFocus
            onBlur={() => setEditingField(null)}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setEditingField(fieldKey);
            setTimeout(() => {
              inputRefs[fieldKey]?.current?.focus();
            }, 100);
          }}
        >
          <Ionicons
            name={ICONS.pencil}
            size={SIZES.icon20}
            color={COLORS.secondary}
            style={styles.pencilIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMedicalConditions = () => {
    const deleteCondition = (category, conditionIndex) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMedicalConditions((prev) => {
        const updatedConditions = [...(prev[category] || [])];
        updatedConditions.splice(conditionIndex, 1);

        if (updatedConditions.length === 0) {
          const newState = { ...prev };
          delete newState[category];
          return newState;
        }

        return {
          ...prev,
          [category]: updatedConditions,
        };
      });
    };

    return (
      <View style={styles.renderMainView}>
        {medicalConditions &&
          Object?.entries(medicalConditions)?.map(([category, conditions]) => (
            <View key={category} style={styles.renderElementView}>
              <View style={styles.renderTitleView}>
                <Text style={styles.renderTitleText}>
                  {STRINGS[language].medicalCategoryValues[category]}
                </Text>
              </View>

              {conditions.map((cond, index) => (
                <View key={index} style={styles.renderListView}>
                  <Text style={styles.renderListText}>• {cond}</Text>
                  <TouchableOpacity
                    onPress={() => deleteCondition(category, index)}
                  >
                    <Text style={styles.deleteButton}>
                      {STRINGS[language].myProfile.eliminar}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

        <View style={styles.renderAddView}>
          <Text style={styles.fieldLabel}>
            {STRINGS[language].myProfile.addCondition}
          </Text>
          <Dropdown
            data={STRINGS[language].medicalCategories}
            labelField="label"
            valueField="value"
            value={selectedCategory}
            onChange={(item) => setSelectedCategory(item.value)}
            placeholder={STRINGS[language].myProfile.selectCategory}
            style={styles.inputPass}
            itemTextStyle={{ fontSize: FONT_SIZES.inputText }}
            selectedTextStyle={{ fontSize: FONT_SIZES.inputText }}
            placeholderStyle={{
              fontSize: FONT_SIZES.inputText,
              color: COLORS.ligthGreyText,
            }}
          />

          <View style={styles.renderInputButtonView}>
            <TextInput
              placeholder={STRINGS[language].myProfile.conditionPlaceholder}
              value={newCondition}
              onChangeText={setNewCondition}
              style={styles.renderAddInput}
            />
            <TouchableOpacity
              onPress={addMedicalCondition}
              style={styles.renderAddButton}
            >
              <Ionicons
                name={ICONS.add}
                size={SIZES.icon20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderVaccines = () => {
    const addVaccine = () => {
      if (!newVaccineName.trim()) {
        Alert.alert("Error", STRINGS[language].myProfile.noVaccine);
        return;
      }

      const formattedDate = new Intl.DateTimeFormat("en-GB").format(
        vaccineDate
      );

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setVaccines((prev) => [
        ...prev,
        { name: newVaccineName.trim(), date: formattedDate },
      ]);

      setNewVaccineName("");
      setVaccineDate(new Date());
      setShowDatePicker(false);
    };

    const deleteVaccine = (index) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setVaccines((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    };

    return (
      <View style={styles.renderMainView}>
        {vaccines?.map((vaccine, index) => (
          <View key={index} style={styles.renderListView}>
            <Text style={styles.renderListText}>
              • {vaccine.name} ({vaccine.date})
            </Text>
            <TouchableOpacity onPress={() => deleteVaccine(index)}>
              <Text style={styles.deleteButton}>
                {STRINGS[language].myProfile.eliminar}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.renderAddView}>
          <Text style={styles.fieldLabel}>
            {STRINGS[language].myProfile.addVaccine}
          </Text>
          <TextInput
            placeholder={STRINGS[language].myProfile.vaccineNamePlaceholder}
            value={newVaccineName}
            onChangeText={setNewVaccineName}
            style={styles.renderAddInput}
          />

          <View style={styles.renderInputButtonView}>
            <View style={styles.renderAddInput}>
              <Text style={styles.fieldLabel}>
                {STRINGS[language].myProfile.date}
              </Text>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.inputPass, { justifyContent: "center" }]}
              >
                <Text>
                  {vaccineDate
                    ? new Intl.DateTimeFormat("en-GB").format(vaccineDate)
                    : STRINGS[language].myProfile.SelectDate}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <View>
                  <DateTimePicker
                    value={vaccineDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || vaccineDate;
                      setShowDatePicker(Platform.OS === "ios");
                      setVaccineDate(currentDate);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={styles.closeCalendatButton}
                  >
                    <Text style={styles.closeCalendatButtonText}>
                      {STRINGS[language].myProfile.close}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={addVaccine}
              style={styles.renderAddButton}
            >
              <Ionicons
                name={ICONS.add}
                size={SIZES.icon20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const toggleDetailsExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDetailsExpanded(!detailsExpanded);
  };

  const toggleDetailsExpandedCondition = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDetailsExpandedConditions(!detailsExpandedConditions);
  };

  const toggleDetailsExpandedVaccines = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDetailsExpandedVaccines(!detailsExpandedVaccines);
  };

  const showBanner = () => {
    dispatch(clearAuthBanner());
    dispatch(clearUserBanner());
    dispatch(clearUserError());
    setBannerIsVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TopBanner
        visible={bannerIsVisible}
        type={banner.type}
        message={banner.message}
        onHide={() => showBanner()}
      />
      {loading.get && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      )}
      {!loading.get && (
        <ScrollView style={styles.mainContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons
              name={ICONS.backArrow}
              size={SIZES.icon20}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name={ICONS.person}
                    size={SIZES.icon50}
                    color={COLORS.iconGrey}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.editIcon}
                onPress={handlePickImage}
              >
                <Ionicons
                  name={ICONS.pencil}
                  size={SIZES.icon20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleDetailsExpanded}
              style={styles.dropdownHeader}
            >
              <View style={styles.dropdownContent}>
                <Text style={styles.labelDetails}>
                  {STRINGS[language].myProfile.details}
                </Text>
                <Ionicons
                  name={detailsExpanded ? ICONS.arrowUp : ICONS.arrowDown}
                  size={SIZES.icon20}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
            {detailsExpanded && (
              <View style={styles.expandElementContainer}>
                {renderField(
                  STRINGS[language].myProfile.name,
                  name,
                  setName,
                  "name"
                )}
                {renderField(
                  STRINGS[language].myProfile.email,
                  email,
                  setEmail,
                  "email"
                )}
                {renderField(
                  STRINGS[language].myProfile.phone,
                  phone,
                  setPhone,
                  "phone"
                )}
                {renderField(
                  STRINGS[language].myProfile.address,
                  address,
                  setAddress,
                  "address"
                )}
                <View style={styles.valueContainerDrop}>
                  <Text style={styles.fieldLabel}>
                    {STRINGS[language].myProfile.province}
                  </Text>
                  <Dropdown
                    style={styles.inputDropdown}
                    data={provinces}
                    labelField="label"
                    valueField="value"
                    value={province}
                    onChange={(item) => setProvince(item.value)}
                    itemTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    selectedTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    placeholderStyle={{
                      fontSize: FONT_SIZES.inputText,
                      color: COLORS.ligthGreyText,
                    }}
                  />
                </View>
                <View style={styles.valueContainerDrop}>
                  <Text style={styles.fieldLabel}>
                    {STRINGS[language].myProfile.country}
                  </Text>
                  <Dropdown
                    style={styles.inputDropdown}
                    data={countrys}
                    labelField="label"
                    valueField="value"
                    value={country}
                    onChange={(item) => setCountry(item.value)}
                    itemTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    selectedTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    placeholderStyle={{
                      fontSize: FONT_SIZES.inputText,
                      color: COLORS.ligthGreyText,
                    }}
                  />
                </View>
                {renderField(
                  STRINGS[language].myProfile.height,
                  height,
                  setHeight,
                  "height"
                )}
                {renderField(
                  STRINGS[language].myProfile.weight,
                  weight,
                  setWeight,
                  "weight"
                )}
                <View style={styles.valueContainerDrop}>
                  <Text style={styles.fieldLabel}>
                    {STRINGS[language].myProfile.bloodType}
                  </Text>
                  <Dropdown
                    style={styles.inputDropdown}
                    data={bloodTypes}
                    labelField="label"
                    valueField="value"
                    value={blood}
                    onChange={(item) => setBlood(item.value)}
                    itemTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    selectedTextStyle={{ fontSize: FONT_SIZES.inputText }}
                    placeholderStyle={{
                      fontSize: FONT_SIZES.inputText,
                      color: COLORS.ligthGreyText,
                    }}
                  />
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={toggleDetailsExpandedCondition}
              style={styles.dropdownHeader}
            >
              <View style={styles.dropdownContent}>
                <Text style={styles.labelDetails}>
                  {STRINGS[language].myProfile.medicalConditions}
                </Text>
                <Ionicons
                  name={
                    detailsExpandedConditions ? ICONS.arrowUp : ICONS.arrowDown
                  }
                  size={SIZES.icon20}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
            {detailsExpandedConditions && renderMedicalConditions()}

            <TouchableOpacity
              onPress={toggleDetailsExpandedVaccines}
              style={styles.dropdownHeader}
            >
              <View style={styles.dropdownContent}>
                <Text style={styles.labelDetails}>
                  {STRINGS[language].myProfile.vaccines}
                </Text>
                <Ionicons
                  name={
                    detailsExpandedVaccines ? ICONS.arrowUp : ICONS.arrowDown
                  }
                  size={SIZES.icon20}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>

            {detailsExpandedVaccines && renderVaccines()}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveButtonText}>
                {STRINGS[language].myProfile.save}
              </Text>
            </TouchableOpacity>

            {changePass && (
              <View style={styles.expandElementContainer}>
                <Text style={styles.label}>
                  {STRINGS[language].myProfile.oldPassword}
                </Text>
                <TextInput
                  style={[
                    styles.inputPass,
                    oldPasswordError && oldPasswordTouched
                      ? styles.errorBorder
                      : null,
                  ]}
                  value={oldPassword}
                  onChangeText={handleOldPassword}
                  onBlur={() => setOldPasswordTouched(true)}
                  secureTextEntry
                />
                {!!oldPasswordError && !!oldPasswordTouched && (
                  <Text style={styles.errorText}>{oldPasswordError}</Text>
                )}

                <Text style={styles.label}>
                  {STRINGS[language].myProfile.newPassword}
                </Text>
                <TextInput
                  style={[
                    styles.inputPass,
                    passwordError && passwordTouched
                      ? styles.errorBorder
                      : null,
                  ]}
                  value={newPassword}
                  onChangeText={handlePassword}
                  onBlur={() => setPasswordTouched(true)}
                  secureTextEntry
                />
                {!!passwordError && !!passwordTouched && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}

                <Text style={styles.label}>
                  {STRINGS[language].myProfile.newPasswordConfirm}
                </Text>
                <TextInput
                  style={[
                    styles.inputPass,
                    passwordConfirmError && passwordConfirmTouched
                      ? styles.errorBorder
                      : null,
                  ]}
                  value={confirmPassword}
                  onChangeText={handlePasswordConfirm}
                  secureTextEntry
                  onBlur={() => setPasswordConfirmTouched(true)}
                />
                {!!passwordConfirmError && !!passwordConfirmTouched && (
                  <Text style={styles.errorText}>{passwordConfirmError}</Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    !isFormValid && styles.buttonOpacity,
                  ]}
                  onPress={handleSaveNewPassword}
                  disabled={!isFormValid}
                >
                  <Text style={styles.saveButtonText}>
                    {STRINGS[language].myProfile.savePassword}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.secondaryButtonText}>
                {changePass
                  ? STRINGS[language].myProfile.cancel
                  : STRINGS[language].myProfile.changePassword}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseAccount}
            >
              <Text style={styles.closeButtonText}>
                {STRINGS[language].myProfile.closeAccount}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
