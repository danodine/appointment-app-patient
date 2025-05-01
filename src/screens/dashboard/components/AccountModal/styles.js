import { StyleSheet } from "react-native";
import { COLORS, FONTS, VALUES } from "../../../../styles/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
  cancel: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: { color: "red" },

  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#70C1E3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  typeButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default styles;
