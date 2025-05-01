import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, VALUES } from "../../../styles/theme";
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    paddingTop: SIZES.mainContainerPaddingTop90,
    paddingHorizontal: 20,
  },
  backButton: { ...VALUES.backButtonColor, left: 20 },
  inputText: {
    paddingTop: 30,
    paddingBottom: 5,
  },
  list: {
    paddingBottom: 100,
  },
  doctorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: screenWidth - 40,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.width,
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
    fontWeight: FONTS.boldFont,
    fontSize: 16,
  },
  searchInput: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
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
    backgroundColor: "#e5e7eb",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
