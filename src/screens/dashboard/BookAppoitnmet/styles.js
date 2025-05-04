import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, FONT_WEIGHT, VALUES } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: VALUES.backButtonColor,
  doctorCard: {
    backgroundColor: COLORS.cardItemBackground,
    borderRadius: 20,
    padding: 16,
    shadowColor: COLORS.cardItemShadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 110,
  },
  doctorName: {
    fontSize: FONT_SIZES.headerTitle,
    fontWeight: FONT_WEIGHT.boldFont,
    marginBottom: 4,
  },
  doctorSubtitle: {
    color: COLORS.greyText,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.subtitle2,
    fontWeight: FONT_WEIGHT.boldFont,
    marginTop: 24,
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.inputBackgeound,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  timeSlotText: {
    color: COLORS.blackText,
  },
  timeSlotTextSelected: {
    color: COLORS.whiteText,
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: COLORS.whiteText,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.mediumButtonText,
  },
  confirmButtonDisabled: {
    opacity: VALUES.inactiveButtonOpacity,
  },
  errorText: {
    marginTop: 20,
    color: COLORS.error,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.inputBackgeound,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default styles;
