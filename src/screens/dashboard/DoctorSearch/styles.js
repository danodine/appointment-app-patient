import { Dimensions, StyleSheet } from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHT,
  PADDINGS,
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
    paddingTop: 10,
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
    width: 200,
    maxHeight: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  loaderContainer: {
    paddingTop: 20,
    transform: [{ scale: 2 }],
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: FONT_SIZES.inputTitle,
    fontWeight: FONT_WEIGHT.boldFont,
    marginBottom: 5,
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: COLORS.inputBackgeound,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "50%",
  },
  dropdownHeader: {
    width: "100%",
    paddingTop: 10,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  clearFiltersButton: {
    paddingVertical: PADDINGS.mainButtonVertical,
    paddingHorizontal: PADDINGS.mainButtonHorizontal,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    justifyContent: "center",
  },
  
  clearFiltersText: {
    fontSize: FONT_SIZES.inputText,
    color: COLORS.black,
  },
  boldText: {
    fontWeight: FONT_WEIGHT.boldFont,
  },
});

export default styles;
