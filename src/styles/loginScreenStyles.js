import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "./theme";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
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
    fontSize: 18,
    letterSpacing: 2,
    marginVertical: 20,
    color: COLORS.textColorMain,
    fontWeight: "600",
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
  buttonText: {
    color: COLORS.black,
    fontWeight: FONTS.bold,
    fontSize: 16,
  },
  forgotPassword: {
    color: COLORS.link,
    marginTop: "10%",
    marginBottom: "6%",
    fontWeight: FONTS.bold,
  },
  signup: {
    fontWeight: FONTS.bold,
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
    fontWeight: FONTS.bold,
  },
  error: {
    color: COLORS.error,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
