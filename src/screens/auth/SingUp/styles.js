import { StyleSheet } from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHT,
  PADDINGS,
  VALUES,
} from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZES.pageTitle,
    color: COLORS.blackText,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  bold: {
    fontWeight: FONT_WEIGHT.boldFontBig,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: FONT_WEIGHT.boldFont,
    letterSpacing: 1,
    fontSize: FONT_SIZES.inputTitle,
    color: COLORS.blackText,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: COLORS.secondary,
    marginTop: 24,
    paddingVertical: PADDINGS.mainButtonVertical,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.blackText,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.bigButtonText,
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
    top: 50,
    left: 20,
    zIndex: 1,
  },
  datePickerContainerView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  datePickerView: {
    backgroundColor: COLORS.inputBackgeound,
    borderRadius: 10,
    padding: 20,
  },
  androidCalendarButtonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonOpacity: { opacity: VALUES.inactiveButtonOpacity },
});

export default styles;
