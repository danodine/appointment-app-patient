import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: SIZES.mainContainerPaddingTop70,
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
    fontSize: SIZES.subTitleSize,
    letterSpacing: 2,
    marginVertical: 20,
    color: COLORS.textColorMain,
    fontWeight: FONTS.boldFont,
    paddingBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
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
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    fontSize: 16,
  },
  forgotPassword: {
    color: COLORS.link,
    marginTop: "10%",
    marginBottom: "6%",
    fontWeight: FONTS.boldFont,
  },
  signup: {
    fontWeight: FONTS.boldFont,
    color: COLORS.link,
  },
  footer: {
    position: "absolute",
    bottom: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingLeft: 35,
  },
  footerText: {
    fontSize: 14,
  },
  bold: {
    fontWeight: FONTS.boldFont,
  },
  error: {
    color: COLORS.error,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
