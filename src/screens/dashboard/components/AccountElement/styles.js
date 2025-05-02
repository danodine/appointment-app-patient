import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../../../styles/theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: screenWidth - 40,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    transition: "transform 0.2s ease-in-out",
  },
  textItem: {
    marginLeft: 20,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft: 5,
  },
  item1: {
    fontWeight: FONTS.boldFont,
    fontSize: 16,
  },
});

export default styles;
