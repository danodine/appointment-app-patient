const COLORS = {
  main: [
    "rgba(81, 232, 239, 0.66)",
    "rgba(67, 144, 246, 0.2)",
    "rgba(108, 166, 244, 0.66)",
  ],
  secondary: "#70C1E3",
  textColorMain: "#333",
  link: "#222",
  white: "#fff",
  black: "#000",
  error: "#FF0000",
  greyText: "#555",
  greyBorder: "#ccc",
  selectedMenuItem: "white",
  menuItem: "black",
  tagColor: "#d1eded",
  green: "#34B233",
  modalOverlay: "rgba(0,0,0,0.4)",
  selectedItem: "#2563EB",
  morning: "#B7E4C7",
  afternoon: "#FFD6A5",
  externalLink: "#0000EE",
};

const FONTS = {
  boldFont: "600",
};

const SIZES = {
  icon50: 50,
  icon20: 20,
  titleSize: 28,
  subTitleSize: 22,
  mainContainerPaddingTop70: 70,
  mainContainerPaddingTop90: 90,
};

const ICONS = {
  backArrow: "arrow-back-outline",
  userCircle: "user-circle-o",
  time: "time-outline",
  globe: "globe-outline",
  cash: "cash-outline",
  shieldCheckmark: "shield-checkmark-outline",
  personCircle: "person-circle",
  closeIcon: "close",
};

const TYPES = {
  button: "button",
  listSelector: "listSelector",
};

const VALUES = {
  inactiveButtonOpacity: 0.5,
  backButtonColor: {
    position: "absolute",
    top: 50,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
};

export { COLORS, FONTS, SIZES, ICONS, TYPES, VALUES };
