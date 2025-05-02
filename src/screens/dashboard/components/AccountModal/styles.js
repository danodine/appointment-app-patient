import { StyleSheet } from "react-native";
import { COLORS, FONTS, VALUES } from "../../../../styles/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
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
    backgroundColor: COLORS.white,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: FONTS.boldFont,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
  cancel: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: { color: COLORS.error },

  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  typeButtonText: {
    fontWeight: FONTS.boldFont,
    color: COLORS.black,
  },
});

export default styles;
