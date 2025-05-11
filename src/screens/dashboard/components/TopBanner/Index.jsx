import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import styles from "./styles";
import { COLORS } from "../../../../styles/theme";

const TopBanner = ({
  type = "success",
  message = "",
  visible = false,
  duration = 2000,
  onHide,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [bannerHeight, setBannerHeight] = useState(100);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(slideAnim, {
          toValue: -bannerHeight,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }
  }, [visible, bannerHeight]);

  const backgroundColor = type === "error" ? COLORS.error : COLORS.green;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
      onLayout={(event) => {
        const height = event.nativeEvent.layout.height;
        if (height !== bannerHeight) setBannerHeight(height);
      }}
    >
      <SafeAreaView edges={["top"]} style={{ backgroundColor }}>
        <Text style={styles.message}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

TopBanner.propTypes = {
  type: PropTypes.oneOf(["success", "error"]),
  message: PropTypes.string,
  visible: PropTypes.bool,
  duration: PropTypes.number,
  onHide: PropTypes.func,
};

export default TopBanner;
