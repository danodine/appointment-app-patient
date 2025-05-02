import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "./styles";
import { COLORS } from "../../../../styles/theme";

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
        <Ionicons name={icon} size={iconSize || 20} color={COLORS.black} />
      ) : null}
      <View style={styles.textItem}>
        {title ? <Text style={styles.item1}>{title}</Text> : null}
        {subtitle ? <Text>{subtitle}</Text> : null}
        {subtitle2 ? <Text>{subtitle2}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

AccountElement.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitle2: PropTypes.string,
  handleClick: PropTypes.func,
};

export default AccountElement;
