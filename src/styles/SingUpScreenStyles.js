import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: COLORS.black,
    textAlign: "center",
    fontWeight: "300",
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
    fontWeight: "600",
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
    fontWeight: "600",
    fontSize: 16,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
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
});

export default styles;
