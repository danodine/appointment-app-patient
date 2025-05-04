import { StyleSheet } from "react-native";
import {
  COLORS,
  FONT_WEIGHT,
  FONT_SIZES,
  PADDINGS,
} from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "15%",
    marginBottom: "15%",
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    fontSize: FONT_SIZES.sectionTitleBig,
    letterSpacing: 2,
    marginVertical: 20,
    color: COLORS.blackText,
    fontWeight: FONT_WEIGHT.boldFont,
    paddingBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.inputBackgeound,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: PADDINGS.mainButtonVertical,
    paddingHorizontal: PADDINGS.mainButtonHorizontal,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: COLORS.blackText,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.bigButtonText,
  },
  forgotPassword: {
    color: COLORS.blackText,
    marginTop: "10%",
    marginBottom: "6%",
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.textButton,
  },
  signup: {
    fontWeight: FONT_WEIGHT.boldFont,
    color: COLORS.blackText,
    fontSize: 15,
  },
  footer: {
    position: "absolute",
    bottom: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingLeft: 35,
  },
  bold: {
    fontWeight: FONT_WEIGHT.boldFont,
  },
  error: {
    color: COLORS.error,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
