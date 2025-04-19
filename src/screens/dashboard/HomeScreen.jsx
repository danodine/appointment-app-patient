import React, { useState } from "react";
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
// import { logout } from "../../redux/authSlice";
import PropTypes from "prop-types";
// import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { searchDoctors, clearSearch } from "../../redux/doctorSlice";
import HomeSearch from "./components/HomeSearch";
import styles from "../../styles/homeScreenStyles";
import STRINGS from "../../constants/strings";

const HomeScreen = ({ role }) => {
  const language = useSelector((state) => state.language.language);
  const { list } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });
  // };

  const handleChangeSearch = (text) => {
    setSearchTerm(text);
    if (text.length < 3) {
      dispatch(clearSearch());
    }
    if (text.length >= 3) {
      dispatch(searchDoctors({ text }));
    }
  };

  const handleSelect = (data) => {
    console.log(data);
  };

  const handleBack = () => {
    setIsSearching(false);
    setSearchTerm("");
    dispatch(clearSearch());
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {!isSearching ? (
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logoTexto.png")}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setIsSearching(true)}
          >
            <Ionicons name="search" size={16} color="white" />
            <Text style={styles.searchText}>
              {STRINGS[language].home.search}
            </Text>
          </TouchableOpacity>
          <Text style={styles.healthPartner}>
            {STRINGS[language].home.titleOne}
          </Text>
          <Text style={styles.healthPartnerTwo}>
            {STRINGS[language].home.titleTwo}
          </Text>
          <Image
            source={require("../../assets/icons/consejo-1.png")}
            style={styles.icon}
          />
          <Text style={styles.description}>
            {STRINGS[language].home.surgestion}
          </Text>
        </ScrollView>
      ) : (
        <HomeSearch
          handleChangeSearch={handleChangeSearch}
          handleSelect={handleSelect}
          list={list}
          handleBack={handleBack}
          searchTerm={searchTerm}
        />
      )}
    </KeyboardAvoidingView>
  );
};

HomeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      role: PropTypes.string,
    }),
  }),
};

export default HomeScreen;
