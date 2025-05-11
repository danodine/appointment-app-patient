import { Dimensions, StyleSheet } from "react-native";
import {
  COLORS,
  FONT_WEIGHT,
  VALUES,
  FONT_SIZES,
  PADDINGS,
} from "../../../styles/theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainElementContainer: {
    paddingTop: 50,
  },
  elementContainer: {
    marginHorizontal: 20,
  },
  flatlistElement: { marginBottom: 95 },
  title: {
    fontWeight: FONT_WEIGHT.boldFontBig,
    fontSize: FONT_SIZES.sectionTitleBig,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: COLORS.blackText,
    fontSize: FONT_SIZES.subtitle2,
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
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
    marginHorizontal: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.modalOverlay,
  },
  modalContent: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 10,
  },
  cancel: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: { color: COLORS.error },
  typeButton: {
    paddingVertical: PADDINGS.mediumButtonVertical,
    paddingHorizontal: PADDINGS.mediumButtonHorizontal,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    fontSize: FONT_SIZES.mediumButtonText,
    marginTop: 10,
  },
  typeButtonText: {
    fontWeight: FONT_WEIGHT.boldFont,
    color: COLORS.whiteText,
  },
  buttonInactive: {
    opacity: VALUES.inactiveButtonOpacity,
  },
  doctorName: {
    fontSize: FONT_SIZES.sectionTitleBig,
    fontWeight: FONT_WEIGHT.boldFont,
    marginBottom: 10,
  },
  itemTextConteiner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bold: {
    fontWeight: FONT_WEIGHT.boldFont,
  },
  newAppointmentButton: {
    position: "absolute",
    bottom: 30,
    zIndex: 10,
    right: 20,
    backgroundColor: COLORS.secondary,
    paddingVertical: PADDINGS.mainButtonVertical,
    paddingHorizontal: PADDINGS.mainButtonHorizontal,
    borderRadius: 20,
  },
  newAppointmentButtonText: {
    color: COLORS.whiteText,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.mediumButtonText,
  },
  linkElement: { color: COLORS.externalLink },
  active: { color: COLORS.green },
  inActive: { color: COLORS.error },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.greyBorder,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  statusTagContainer: {
    flex: 1,
    position: "relative",
  },
  statusTagText: { position: "absolute", top: 0, right: 0, fontWeight: "bold" },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -50,
  },
  nodataImage: {
    width: "80%",
    maxHeight: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  loaderContainer: {
    paddingTop: 30,
    transform: [{ scale: 2 }],
  },
});

export default styles;
