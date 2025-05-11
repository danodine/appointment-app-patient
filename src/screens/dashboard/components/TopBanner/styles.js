import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT_SIZES } from "../../../../styles/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH,
    zIndex: 9999,
    elevation: 10,
  },
  message: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZES.subtitle2,
    textAlign: "center",
    padding: 16,
  },
});

export default styles;
