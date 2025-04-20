import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "./theme";
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 50,
  },
  containerCard: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
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
  doctorName: {
    fontWeight: "bold",
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
});

export default styles;
