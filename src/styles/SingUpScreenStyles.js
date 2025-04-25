import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "./theme";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: SIZES.titleSize,
    color: COLORS.black,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  bold: {
    fontWeight: "700",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.secondary,
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    fontSize: 16,
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
  backButton: {
    position: "absolute",
    top: SIZES.backButtonSpacingTop,
    left: SIZES.backButtonSpacingLeft,
    zIndex: 1,
  },
  datePickerContainerView: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    padding: 20,
  },
  datePickerView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
  androidCalendarButtonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonOpacity: { opacity: SIZES.inactiveButtonOpacity },
});

export default styles;
