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
} from "../../constants/vars";
import { Dropdown } from "react-native-element-dropdown"; // Assuming you use this library
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/userSlice";
import { ICONS, COLORS, SIZES, VALUES, FONTS } from "../../styles/theme";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state) => state.users);
  console.log("fff", currentUser, "kkkkk");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const dispatch = useDispatch();

  const inputRefs = {
    name: React.useRef(null),
    email: React.useRef(null),
    phone: React.useRef(null),
    address: React.useRef(null),
    height: React.useRef(null),
    weight: React.useRef(null),
  };

  const [medicalConditions, setMedicalConditions] = useState({});

  const [newCondition, setNewCondition] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    medicalCategories[0]?.value || ""
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setPhone(currentUser?.phone);
    setHeight(currentUser?.heightCm);
    setWeight(currentUser?.weightKg);
    setAddress(currentUser?.profile?.address?.street);
    setProvince(currentUser?.profile?.address?.city);
    setCountry(currentUser?.profile?.address?.country);
    setBlood(currentUser?.bloodType);
    setMedicalConditions(currentUser?.profile?.medicalConditions)
  }, [currentUser]);

  const addMedicalCondition = () => {
    if (!newCondition.trim()) {
      Alert.alert("Error", "Please enter a condition.");
      return;
    }

    setMedicalConditions((prev) => ({
      ...prev,
      [selectedCategory]: [
        ...(prev[selectedCategory] || []),
        newCondition.trim(),
      ],
    }));

    setNewCondition(""); // clear input after adding
  };

  const handleSaveChanges = () => {
    setEditingField(null);
    Alert.alert("Saved", "Changes have been saved.");
  };

  const handleChangePassword = () => {
    setChangePass(!changePass);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNewPassword = () => {
    // Password saving logic
  };

  const handleCloseAccount = () => {
    Alert.alert("Confirm", "Are you sure you want to close your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Close It",
        style: "destructive",
        onPress: () => {
          Alert.alert(
            "Account Closed",
            "Your account has been successfully closed."
          );
        },
      },
    ]);
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
            color="#3b82f6"
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
        {Object.entries(medicalConditions).map(([category, conditions]) => (
          <View key={category} style={{ marginBottom: 20 }}>
            {/* Category Name + Delete */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontWeight: "bold", flex: 1 }}>{category}</Text>
              <TouchableOpacity onPress={() => deleteCategory(category)}>
                <Ionicons name="close-circle" size={24} color="#ef4444" />
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
                  paddingVertical: 8, // more padding!
                  borderBottomWidth: 1,
                  borderBottomColor: "#e5e7eb",
                }}
              >
                <Text style={{ flex: 1 }}>• {cond}</Text>
                <TouchableOpacity
                  onPress={() => deleteCondition(category, index)}
                >
                  <Ionicons name="close" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {/* Inputs to add new condition */}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Condition (e.g., Asthma)"
              value={newCondition}
              onChangeText={setNewCondition}
              style={[styles.inputPass, { flex: 1, marginRight: 10 }]}
            />
            <TouchableOpacity
              onPress={addMedicalCondition}
              style={{
                backgroundColor: "#3b82f6",
                paddingHorizontal: 16,
                paddingVertical: 12,
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
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color="#9ca3af" />
              </View>
            )}
            <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
              <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Editable Fields */}
          {renderField("Name", name, setName, "name")}
          {renderField("Email", email, setEmail, "email")}
          {renderField("Phone", phone, setPhone, "phone")}
          {renderField("Address", address, setAddress, "address")}

          {/* More Details */}
          <TouchableOpacity
            onPress={toggleDetailsExpanded}
            style={styles.dropdownHeader}
          >
            <View style={styles.dropdownContent}>
              <Text style={styles.labelDetails}>More Details</Text>
              <Ionicons
                name={detailsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>

          {detailsExpanded && (
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
              {/* Age field, not editable */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Age</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.fieldValue}>29</Text>
                  {/* Example static */}
                </View>
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

          {/*vacunas*/}

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Password Change Section */}
          {changePass && (
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.inputPass}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.inputPass}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveNewPassword}
              >
                <Text style={styles.saveButtonText}>Save New Password</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Password Change Toggle */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.secondaryButtonText}>
              {changePass ? "Cancel" : "Change Password"}
            </Text>
          </TouchableOpacity>

          {/* Close Account */}
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
    backgroundColor: "#3b82f6",
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
    borderBottomColor: "#3b82f6",
  },
  inputDropdown: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#3b82f6",
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
    borderColor: "#3b82f6",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    borderColor: "#ef4444",
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
});
