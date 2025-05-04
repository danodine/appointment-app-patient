import { StyleSheet } from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHT,
  PADDINGS,
  VALUES,
} from "../../../../styles/theme";

const styles = StyleSheet.create({
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
  title: {
    fontSize: FONT_SIZES.subtitle1,
    fontWeight: FONT_WEIGHT.boldFont,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
  cancel: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: { color: COLORS.error },

  typeButton: {
    paddingVertical: PADDINGS.mediumButtonVertical,
    paddingHorizontal: PADDINGS.mediumButtonHorizontal,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  typeButtonText: {
    fontWeight: FONT_WEIGHT.boldFont,
    color: COLORS.whiteText,
  },
});

export default styles;
