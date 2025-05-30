import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../redux/userSlice";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import STRINGS from "../../../constants/strings";
import { COLORS, ICONS, SIZES } from "../../../styles/theme";

const HomeScreen = ({ navigation }) => {
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  const handleSearch = () => {
    navigation.navigate("DoctorSearch");
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logoTexto.png")}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons
            name={ICONS.search}
            size={SIZES.icon20}
            color={COLORS.white}
          />
          <Text style={styles.searchText}>{STRINGS[language].home.search}</Text>
        </TouchableOpacity>
        <Text style={styles.healthPartner}>
          {STRINGS[language].home.titleOne}
        </Text>
        <Text style={styles.healthPartnerTwo}>
          {STRINGS[language].home.titleTwo}
        </Text>
        <Image
          source={require("../../../assets/icons/consejo-1.png")}
          style={styles.icon}
        />
        <Text style={styles.description}>
          {STRINGS[language].home.surgestion}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      role: PropTypes.string,
    }),
  }),
};

export default HomeScreen;
