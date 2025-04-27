import { StyleSheet } from "react-native";
import { COLORS, FONTS, VALUES } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: VALUES.backButtonColor,
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 110,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: FONTS.boldFont,
    marginBottom: 4,
  },
  doctorSubtitle: {
    color: COLORS.greyText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: FONTS.boldFont,
    marginTop: 24,
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.white,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  timeSlotText: {
    color: COLORS.black,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
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
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    fontSize: 16,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default styles;
