import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: SIZES.mainContainerPaddingTop90,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 60,
  },
  searchText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: FONTS.boldFont,
  },
  healthPartner: {
    fontWeight: FONTS.boldFont,
    fontSize: 16,
    paddingTop: 40,
  },
  healthPartnerTwo: {
    paddingBottom: 20,
    fontWeight: FONTS.boldFont,
    fontSize: 16,
  },
  icon: {
    width: 110,
    height: 120,
    marginVertical: 10,
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 6,
  },
});

export default styles;
