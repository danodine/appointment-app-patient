import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT_SIZES, FONT_WEIGHT } from "../../../../styles/theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardItemBackground,
    width: screenWidth - 40,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.cardItemShadow,
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
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.subtitle2,
  },
});

export default styles;
