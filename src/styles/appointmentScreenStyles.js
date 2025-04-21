import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    // backgroundColor: "#fff",
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
  // newCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 20,
  // },
  // newText: {
  //   fontSize: 16,
  //   color: "#444",
  // },
});

export default styles;
