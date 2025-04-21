import { StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 16,
    marginTop: 40,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 8,
  },
  specialty: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
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
    backgroundColor: "#e6f2f2",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 50,
  },
  underline: {
    marginTop: 4,
    marginBottom: 10,
    height: 3,
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  locotionView: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedLocation: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
});

export default styles;
