import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, FONT_WEIGHT, FONT_SIZES } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
   subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.textSecondary,
  },
  emailText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  button: {
    backgroundColor: COLORS.secondary,
    marginTop: 24,
    paddingVertical: PADDINGS.mainButtonVertical,
    borderRadius: 12,
    paddingHorizontal: PADDINGS.mainButtonHorizontal,
    alignItems: "center",
  },
    buttonText: {
    color: COLORS.blackText,
    fontWeight: FONT_WEIGHT.boldFont,
    fontSize: FONT_SIZES.bigButtonText,
  },
});

export default styles;