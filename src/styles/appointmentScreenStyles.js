import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS } from "./theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
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
    color: "black",
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: "100%",
    backgroundColor: "#007AFF",
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
    shadowColor: "#000",
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
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  cancel: {
    marginTop: 20,
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
  },
  typeButtonText: {
    fontWeight: FONTS.boldFont,
    color: COLORS.black,
  },
  buttonInactive: {
    opacity: 0.5,
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
});

export default styles;
