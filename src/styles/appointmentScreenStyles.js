import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, VALUES } from "./theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontWeight: FONTS.boldFont,
    fontSize: SIZES.subTitleSize,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  tab: {
    fontSize: 16,
    marginRight: 20,
  },
  tabText: {
    color: COLORS.black,
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
    backgroundColor: "#fff",
    width: screenWidth - 40,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.black,
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
  item1: {
    fontWeight: FONTS.boldFont,
    fontSize: 16,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10
  },
  typeButtonText: {
    fontWeight: FONTS.boldFont,
    color: COLORS.black,
  },
  buttonInactive: {
    opacity: VALUES.inactiveButtonOpacity,
  },
  statusIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  doctorName: {
    fontSize: SIZES.subTitleSize,
    marginBottom: 10,
  },
  itemTextConteiner: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: FONTS.boldFont,
  },
  newAppointmentButton: {
    position: "absolute",
    bottom: 30,
    zIndex: 10,
    right: 20,
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  newAppointmentButtonText: {
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    fontSize: 16,
  },
});

export default styles;
