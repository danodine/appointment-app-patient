const COLORS = {
  main: [
    "rgba(81, 232, 239, 0.66)",
    "rgba(67, 144, 246, 0.2)",
    "rgba(108, 166, 244, 0.66)",
  ],
  secondary: "#70C1E3",

  white: "#fff",

  selectedItem: "#2563EB",
  selectedMenuItem: "white",
  menuItem: "black",

  ligthGreyText: "#A9A9A9",
  cardItemBackground: "#fff",
  cardItemShadow: "#121212",
  blackText: "#1C1C1E",
  greyText: "#555",
  whiteText: "#fff",
  inputBackgeound: "#fff",

  iconGrey: "#9ca3af",
  error: "#FF0000",
  externalLink: "#0000EE",
  morning: "#B7E4C7",
  afternoon: "#FFD6A5",
  black: "#000",

  greyBorder: "#ccc",
  tagColor: "#d1eded",
  green: "#34B233",
  modalOverlay: "rgba(0,0,0,0.4)",
};

const FONT_WEIGHT = {
  boldFont: "600",
  boldFontBig: "700",
};

const FONT_SIZES = {
  pageTitle: 28,
  sectionTitleBig: 22,

  inputTitle: 14.5,
  inputText: 14,

  bigButtonText: 17,
  mediumButtonText: 16,
  textButton: 15,

  headerTitle: 20,
  subtitle1: 18,
  subtitle2: 16,
  xsText: 13,

  generalText: 14,
};

const PADDINGS = {
  mainButtonVertical: 12,
  mainButtonHorizontal: 30,
  mediumButtonVertical: 8,
  mediumButtonHorizontal: 16,
  smallButtonVertical: 3,
  smallButtonHorizontal: 10,
  mainTop: 90,
};

const SIZES = {
  icon50: 50,
  icon20: 20,
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
  person: "person",
  search: "search",
  pencil: "pencil",
  add: "add",
  arrowUp: "chevron-up",
  arrowDown: "chevron-down",
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

export {
  COLORS,
  FONT_WEIGHT,
  SIZES,
  ICONS,
  TYPES,
  VALUES,
  FONT_SIZES,
  PADDINGS,
};
