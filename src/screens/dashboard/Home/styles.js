import { StyleSheet } from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHT,
  PADDINGS,
} from "../../../styles/theme";

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: PADDINGS.mainTop,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "15%",
    marginBottom: "15%",
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: "contain",
  },
  searchButton: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    paddingVertical: PADDINGS.mainButtonVertical,
    paddingHorizontal: PADDINGS.mainButtonHorizontal,
    borderRadius: 20,
    marginBottom: 60,
  },
  searchText: {
    color: COLORS.whiteText,
    marginLeft: 8,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.mediumButtonText,
  },
  healthPartner: {
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.subtitle1,
    paddingTop: 40,
    color: COLORS.blackText,
  },
  healthPartnerTwo: {
    paddingBottom: 20,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.subtitle1,
    color: COLORS.blackText,
  },
  icon: {
    width: 110,
    height: 120,
    marginVertical: 10,
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    fontSize: FONT_SIZES.xsText,
    marginTop: 6,
  },
});

export default styles;
