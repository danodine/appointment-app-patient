import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  provinces,
  countrys,
  bloodTypes,
  medicalCategories,
} from "../../../constants/vars";
import { isStrongPassword } from "../../../utils/helpers";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getCurrentUser, updateUser, deleteMe } from "../../../redux/userSlice";
import {
  changePassword,
  logoutUser,
  clearAuth,
} from "../../../redux/authSlice";
import { CommonActions } from "@react-navigation/native";
import { BASE_URL } from "../../../../config";
import { ICONS, COLORS, SIZES, VALUES, FONTS } from "../../../styles/theme";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state) => state.users);
  const { changePasswordError } = useSelector((state) => state.auth);
  console.log(changePasswordError);
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
  const [moreDetailsExpanded, setMoreDetailsExpanded] = useState(false);
  const [detailsExpandedConditions, setDetailsExpandedConditions] =
    useState(false);
  const [detailsExpandedVaccines, setDetailsExpandedVaccines] = useState(false);

  const [profileImageUri, setProfileImageUri] = useState(null);

  const [medicalConditions, setMedicalConditions] = useState({});
  const [vaccines, setVaccines] = useState([]);
  const [newVaccineName, setNewVaccineName] = useState("");

  const [vaccineDate, setVaccineDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    medicalCategories[0]?.value || "",
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setPhone(currentUser?.phone);
    setHeight(
      isNaN(currentUser?.profile?.heightCm)
        ? 0
        : currentUser?.profile?.heightCm,
    );
    setWeight(
      isNaN(currentUser?.profile?.weightKg)
        ? 0
        : currentUser?.profile?.weightKg,
    );
    setAddress(currentUser?.profile?.address?.street);
    setProvince(currentUser?.profile?.address?.city);
    setCountry(currentUser?.profile?.address?.country);
    setBlood(currentUser?.profile?.bloodType);
    setMedicalConditions(
      currentUser?.profile?.medicalConditions === undefined
        ? {}
        : currentUser?.profile?.medicalConditions,
    );
    setVaccines(currentUser?.profile?.vaccines || []);
    setProfileImage(currentUser?.profile?.photo);
  }, [currentUser]);

  const addMedicalCondition = () => {
    if (!newCondition.trim()) {
      Alert.alert("Error", "Please enter a condition.");
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
  const handleSaveChanges = () => {
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

    dispatch(updateUser(userData))
      .unwrap()

      .then(() => {
        // use a modal for succes and error
        // Alert.alert("Success", "Profile updated successfully!");
        dispatch(getCurrentUser());
        setProfileImageUri(null);
      })
      .catch((err) => {
        // use a modal for succes and error
        // Alert.alert("Error", err);
      });
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
      }),
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
    setOldPasswordError(value === "" ? "Old password must not be empty" : "");
  };

  const handlePassword = (value) => {
    setNewPassword(value);
    setPasswordError(isStrongPassword(value) ? "" : "Error de clavw");
  };

  const handlePasswordConfirm = (value) => {
    setConfirmPassword(value);
    setPasswordConfirmError(
      value === newPassword ? "" : "Passwords do not match",
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
      }),
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
            onBlur={() => setEditingField(null)} // 👈 Reset editing when blur happens
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
            name="pencil"
            size={20}
            color={COLORS.secondary}
            style={{ marginLeft: 10 }}
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

    const deleteCategory = (category) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMedicalConditions((prev) => {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      });
    };

    return (
      <View style={{ width: "100%", marginTop: 10 }}>
        {medicalConditions &&
          Object?.entries(medicalConditions)?.map(([category, conditions]) => (
            <View key={category} style={{ marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>{category}</Text>
                <TouchableOpacity onPress={() => deleteCategory(category)}>
                  <Text style={styles.deleteButton}>Eliminar Categoria</Text>
                </TouchableOpacity>
              </View>

              {/* Conditions List */}
              {conditions.map((cond, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e5e7eb",
                  }}
                >
                  <Text style={{ flex: 1 }}>• {cond}</Text>
                  <TouchableOpacity
                    onPress={() => deleteCondition(category, index)}
                  >
                    <Text style={styles.deleteButton}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

        <View style={{ marginTop: 20 }}>
          <Text style={styles.fieldLabel}>Add New Condition</Text>
          <Dropdown
            data={medicalCategories}
            labelField="label"
            valueField="value"
            value={selectedCategory}
            onChange={(item) => setSelectedCategory(item.value)}
            placeholder="Select Category"
            style={styles.inputPass}
          />

          {/* Input and Button side-by-side */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Condition (e.g., Asthma)"
              value={newCondition}
              onChangeText={setNewCondition}
              style={[styles.inputPass, { flex: 1, marginRight: 10 }]}
            />
            <TouchableOpacity
              onPress={addMedicalCondition}
              style={{
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 8,
              }}
            >
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderVaccines = () => {
    const addVaccine = () => {
      if (!newVaccineName.trim()) {
        // create error modal
        Alert.alert("Error", "Please enter vaccine name.");
        return;
      }

      const formattedDate = new Intl.DateTimeFormat("en-GB").format(
        vaccineDate,
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
      <View style={{ width: "100%", marginTop: 10 }}>
        {vaccines?.map((vaccine, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
            }}
          >
            <Text style={{ flex: 1 }}>
              • {vaccine.name} ({vaccine.date})
            </Text>
            <TouchableOpacity onPress={() => deleteVaccine(index)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add new vaccine */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.fieldLabel}>Add New Vaccine</Text>
          <TextInput
            placeholder="Vaccine name (e.g., Covid)"
            value={newVaccineName}
            onChangeText={setNewVaccineName}
            style={[styles.inputPass, { marginBottom: 10 }]}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.inputPass, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.fieldLabel}>Date</Text>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.inputPass, { justifyContent: "center" }]}
              >
                <Text>
                  {vaccineDate
                    ? new Intl.DateTimeFormat("en-GB").format(vaccineDate)
                    : "Select Date"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
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
              )}
            </View>

            <TouchableOpacity
              onPress={addVaccine}
              style={{
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={20} color="white" />
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

  const toggleMoreDetailsExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMoreDetailsExpanded(!moreDetailsExpanded);
  };

  const toggleDetailsExpandedCondition = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDetailsExpandedConditions(!detailsExpandedConditions);
  };

  const toggleDetailsExpandedVaccines = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDetailsExpandedVaccines(!detailsExpandedVaccines);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons
            name={ICONS.backArrow}
            size={SIZES.icon20}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image
                source={{
                  uri:
                    profileImageUri || `${BASE_URL}/img/users/${profileImage}`,
                }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color="#9ca3af" />
              </View>
            )}
            <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
              <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleDetailsExpanded}
            style={styles.dropdownHeader}
          >
            <View style={styles.dropdownContent}>
              <Text style={styles.labelDetails}>Details</Text>
              <Ionicons
                name={detailsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>
          {detailsExpanded && (
            <>
              {renderField("Name", name, setName, "name")}
              {renderField("Email", email, setEmail, "email")}
              {renderField("Phone", phone, setPhone, "phone")}
              {renderField("Address", address, setAddress, "address")}
            </>
          )}

          <TouchableOpacity
            onPress={toggleMoreDetailsExpanded}
            style={styles.dropdownHeader}
          >
            <View style={styles.dropdownContent}>
              <Text style={styles.labelDetails}>More Details</Text>
              <Ionicons
                name={moreDetailsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>

          {moreDetailsExpanded && (
            <View style={{ width: "100%" }}>
              <View style={styles.valueContainerDrop}>
                <Text style={styles.fieldLabel}>Province</Text>
                <Dropdown
                  style={styles.inputDropdown}
                  data={provinces}
                  labelField="label"
                  valueField="value"
                  value={province}
                  onChange={(item) => setProvince(item.value)}
                />
              </View>
              <View style={styles.valueContainerDrop}>
                <Text style={styles.fieldLabel}>Country</Text>
                <Dropdown
                  style={styles.inputDropdown}
                  data={countrys}
                  labelField="label"
                  valueField="value"
                  value={country}
                  onChange={(item) => setCountry(item.value)}
                />
              </View>
              {renderField("Height (cm)", height, setHeight, "height")}
              {renderField("Weight (kg)", weight, setWeight, "weight")}
              <View style={styles.valueContainerDrop}>
                <Text style={styles.fieldLabel}>Blod type</Text>
                <Dropdown
                  style={styles.inputDropdown}
                  data={bloodTypes}
                  labelField="label"
                  valueField="value"
                  value={blood}
                  onChange={(item) => setBlood(item.value)}
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={toggleDetailsExpandedCondition}
            style={styles.dropdownHeader}
          >
            <View style={styles.dropdownContent}>
              <Text style={styles.labelDetails}>Medical Condidions</Text>
              <Ionicons
                name={detailsExpandedConditions ? "chevron-up" : "chevron-down"}
                size={24}
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
              <Text style={styles.labelDetails}>Vaccines</Text>
              <Ionicons
                name={detailsExpandedVaccines ? "chevron-up" : "chevron-down"}
                size={24}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>

          {detailsExpandedVaccines && renderVaccines()}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {changePass && (
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>Old Password</Text>
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
                placeholder="Enter new password"
                secureTextEntry
              />
              {oldPasswordError && oldPasswordTouched && (
                <Text style={styles.errorText}>{oldPasswordError}</Text>
              )}

              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={[
                  styles.inputPass,
                  passwordError && passwordTouched ? styles.errorBorder : null,
                ]}
                value={newPassword}
                onChangeText={handlePassword}
                onBlur={() => setPasswordTouched(true)}
                placeholder="Enter new password"
                secureTextEntry
              />
              {passwordError && passwordTouched && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.inputPass,
                  passwordConfirmError && passwordConfirmTouched
                    ? styles.errorBorder
                    : null,
                ]}
                value={confirmPassword}
                onChangeText={handlePasswordConfirm}
                placeholder="Confirm new password"
                secureTextEntry
                onBlur={() => setPasswordConfirmTouched(true)}
              />
              {passwordConfirmError && passwordConfirmTouched && (
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
                <Text style={styles.saveButtonText}>Save New Password</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.secondaryButtonText}>
              {changePass ? "Cancel" : "Change Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseAccount}
          >
            <Text style={styles.closeButtonText}>Close Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: SIZES.mainContainerPaddingTop70,
    alignItems: "center",
    paddingBottom: 40,
  },
  backButton: VALUES.backButtonColor,
  avatarContainer: {
    position: "relative",
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e5e7eb",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#f9fafb",
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 8,
  },
  valueContainerDrop: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 8,
    marginBottom: 10,
  },
  fieldValue: {
    color: "#111827",
    flex: 1,
  },
  input: {
    flex: 1,
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  inputDropdown: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    borderColor: COLORS.error,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    letterSpacing: 1,
  },
  inputPass: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownHeader: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelDetails: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorBorder: {
    borderColor: COLORS.error,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 8,
    marginTop: 4,
  },
  buttonOpacity: { opacity: VALUES.inactiveButtonOpacity },
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    color: COLORS.white,
  },
});
