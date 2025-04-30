import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import STRINGS from "../../../constants/strings";

const HomeScreen = ({ navigation }) => {
  const language = useSelector((state) => state.language.language);

  const handleSearch = () => {
    navigation.navigate("DoctorSearch");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
          <Ionicons name="search" size={16} color="white" />
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
