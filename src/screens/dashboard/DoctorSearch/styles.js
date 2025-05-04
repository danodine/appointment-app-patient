import { Dimensions, StyleSheet } from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHT,
  PADDINGS,
  SIZES,
  VALUES,
} from "../../../styles/theme";
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  containerCard: {
    paddingHorizontal: 20,
    paddingTop: PADDINGS.mainTop,
  },
  backButton: { ...VALUES.backButtonColor, left: 20 },
  inputText: {
    paddingTop: 30,
    paddingBottom: 5,
    fontSize: FONT_SIZES.inputTitle,
    fontWeight: FONT_WEIGHT.boldFont,
  },
  list: {
    paddingBottom: 100,
  },
  doctorItem: {
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
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft: 5,
  },
  doctorName: {
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.subtitle2,
  },
  searchInput: {
    width: "100%",
    backgroundColor: COLORS.inputBackgeound,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: FONT_SIZES.inputText,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.iconGrey,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -100,
  },
  nodataImage: {
    width: "80%",
    maxHeight: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
});

export default styles;
