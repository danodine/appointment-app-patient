import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Use expo install @expo/vector-icons

export default function ProfileScreen() {
  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan@example.com");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");

  const [editingField, setEditingField] = useState(null); // 'name', 'email', 'height', 'weight'

  const handleSaveChanges = () => {
    setEditingField(null);
    Alert.alert("Saved", "Changes have been saved.");
    // Call API to save changes here
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Navigate to password change screen.");
  };

  const handleCloseAccount = () => {
    Alert.alert("Confirm", "Are you sure you want to close your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Close It",
        style: "destructive",
        onPress: () => {
          // Delete account logic here
          Alert.alert(
            "Account Closed",
            "Your account has been successfully closed."
          );
        },
      },
    ]);
  };

  const renderField = (label, value, onChangeText, fieldKey) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.valueContainer}>
        {editingField === fieldKey ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            autoFocus
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => setEditingField(fieldKey)}>
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarPlaceholder} />

      {renderField("Name", name, setName, "name")}
      {renderField("Email", email, setEmail, "email")}
      {renderField("Height (cm)", height, setHeight, "height")}
      {renderField("Weight (kg)", weight, setWeight, "weight")}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleChangePassword}
      >
        <Text style={styles.secondaryButtonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={handleCloseAccount}>
        <Text style={styles.closeButtonText}>Close Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9fafb",
    paddingBottom: 40,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e5e7eb",
    borderRadius: 50,
    marginBottom: 30,
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  fieldLabel: {
    color: "#6b7280",
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
  fieldValue: {
    fontSize: 16,
    color: "#111827",
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#3b82f6",
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
});
