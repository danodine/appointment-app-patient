import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const AccountElement = ({
  icon,
  iconSize,
  title,
  subtitle,
  subtitle2,
  handleClick,
}) => {
  return (
    <TouchableOpacity style={styles.cardItem} onPress={handleClick}>
      {icon ? (
        <Ionicons name={icon} size={iconSize ? iconSize : 20} color="#000" />
      ) : null}
      <View style={styles.textItem}>
        {title ? <Text style={styles.item1}>{title}</Text> : null}
        {subtitle ? <Text>{subtitle}</Text> : null}
        {subtitle2 ? <Text>{subtitle2}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  textItem: {
    marginLeft: 20,
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
});

export default AccountElement;
