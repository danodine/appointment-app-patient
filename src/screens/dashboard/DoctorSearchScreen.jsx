import React, { useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctors, clearSearch } from "../../redux/doctorSlice";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/doctorSearchStyles";
import PropTypes from "prop-types";

const HomeSearch = ({ navigation }) => {
  const { doctorsList } = useSelector((state) => state.doctor);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeSearch = (text) => {
    setSearchTerm(text);
    try {
      if (text.length < 3) {
        dispatch(clearSearch());
      }
      if (text.length >= 3) {
        dispatch(searchDoctors({ text }));
      }
    } catch (error) {
      console.log("Error Block", error);
    }
  };

  const handleSelect = (data) => {
    console.log(data);
  };

  const handleBack = () => {
    setSearchTerm("");
    dispatch(clearSearch());
    navigation.goBack();
  };
  return (
    <View style={styles.containerCard} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back-outline" size={20} color="#000" />
      </TouchableOpacity>

      <Text style={styles.inputText}>Nombre, Especialidad</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        value={searchTerm}
        onChangeText={(text) => handleChangeSearch(text)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={doctorsList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorItem}
            onPress={() => handleSelect(item)}
          >
            <Image
              source={require("../../assets/icons/icono-cardio.png")}
              style={styles.cardIcon}
            />
            <View>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text>{item.profile.specialty}</Text>
              <Text>
                {item.profile.address.city} {item.profile.address.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
HomeSearch.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeSearch;
