import { StyleSheet } from "react-native";
import { COLORS, SIZES, VALUES, FONTS } from "../../../styles/theme";

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: SIZES.mainContainerPaddingTop70,
    alignItems: "center",
    paddingBottom: 40,
  },
  backButton: VALUES.backButtonColor,
  avatarContainer: {
    position: "relative",
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.iconGrey,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  fieldLabel: {
    fontWeight: FONTS.boldFont,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
    paddingBottom: 8,
  },
  valueContainerDrop: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
    paddingBottom: 8,
    marginBottom: 10,
  },
  fieldValue: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  inputDropdown: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: FONTS.boldFont,
  },
  closeButton: {
    borderColor: COLORS.error,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: FONTS.boldFont,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.black,
    fontWeight: FONTS.boldFont,
    letterSpacing: 1,
  },
  inputPass: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownHeader: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelDetails: {
    fontSize: 16,
    fontWeight: FONTS.boldFont,
  },
  errorBorder: {
    borderColor: COLORS.error,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 8,
    marginTop: 4,
  },
  buttonOpacity: { opacity: VALUES.inactiveButtonOpacity },
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    color: COLORS.white,
  },
  // new stles not in order
  pencilIcon: {
    marginLeft: 10,
  },
  renderMainView: {
    width: "100%",
    marginTop: 10,
  },
  renderElementView: { marginBottom: 20 },
  renderTitleView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  renderTitleText: { fontWeight: FONTS.boldFont, flex: 1 },
  renderListView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
  },
  renderListText: { flex: 1 },
  renderAddView: { marginTop: 20 },
  renderInputButtonView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  renderAddInput: {
    flex: 1,
    marginRight: 10,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  renderAddButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  expandElementContainer: { width: "100%" },
  closeCalendatButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: COLORS.secondary,
  },
  closeCalendatButtonText: {
    color: COLORS.black
  }
});

export default styles;
