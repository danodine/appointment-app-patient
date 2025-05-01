import { StyleSheet } from "react-native";
import { COLORS, FONTS, VALUES } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: VALUES.backButtonColor,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 16,
    marginTop: 50,
  },
  name: {
    fontWeight: FONTS.boldFont,
    fontSize: 18,
    marginTop: 8,
  },
  specialty: {
    fontSize: 16,
    color: COLORS.greyText,
    fontWeight: FONTS.boldFont,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: FONTS.boldFont,
    color: COLORS.black,
  },
  section: {
    marginBottom: 20,
  },
  address: {
    paddingBottom: 7,
  },
  selectorText: {
    paddingBottom: 7,
    fontWeight: FONTS.boldFont,
  },
  radioButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: FONTS.boldFont,
    fontSize: 16,
    marginLeft: 8,
  },
  sectionContent: {
    paddingLeft: 28,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: COLORS.tagColor,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
  },
  underline: {
    marginTop: -3,
    marginBottom: 15,
    height: 1,
    width: "100%",
    backgroundColor: COLORS.black,
    borderRadius: 2,
  },
  locotionView: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedLocation: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
  },
  bold: {
    fontWeight: FONTS.boldFont,
  },
  phoneText: {
    marginBottom: 7,
    marginTop: 17,
  },
  itemsText: {
    marginBottom: 7,
  },
  dayCard: {
    backgroundColor: COLORS.tagColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    marginLeft: -20,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: FONTS.boldFont,
    marginBottom: 8,
    color: COLORS.primary,
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },
  timeText: {
    color: COLORS.textPrimary,
  },
  tagTime: {
    position: "absolute",
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagTextTime: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  linkElement: { color: COLORS.externalLink, fontSize: 12 },
  touchableElement: { marginTop: 12 },
  touchableElementContainer: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e5e7eb",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  }
});

export default styles;
