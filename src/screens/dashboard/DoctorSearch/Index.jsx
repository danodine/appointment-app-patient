import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctors, clearSearch } from "../../../redux/doctorSlice";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../../config";
import STRINGS from "../../../constants/strings";
import { ICONS, COLORS, SIZES } from "../../../styles/theme";
import TopBanner from "../components/TopBanner/Index";

const HomeSearch = ({ navigation }) => {
  const { doctorsList, error, loading } = useSelector((state) => state.doctor);
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [serachIsActive, setSerachIsActive] = useState(false);

  const [banner, setBanner] = useState({
    visible: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (error.search) {
      showBanner(
        "error",
        STRINGS[language].doctorSearch[error.search] ||
          STRINGS[language].doctorSearch.errorOcured
      );
      dispatch(clearSearch());
    }
  }, [error.signup]);

  const showBanner = (type, message) => {
    setBanner({ visible: true, type, message });
  };

  useFocusEffect(
    useCallback(() => {
      setSearchTerm("");
      return () => {
        dispatch(clearSearch());
      };
    }, [])
  );

  const handleChangeSearch = (text) => {
    setSearchTerm(text);

    if (text.length < 3) {
      setSerachIsActive(false);
      dispatch(clearSearch());
    }
    if (text.length >= 3) {
      setSerachIsActive(true);
      dispatch(searchDoctors({ text }));
    }
  };

  const handleSelect = (doctor) => {
    navigation.navigate("DoctorProfile", { doctor });
  };

  const handleBack = () => {
    setSearchTerm("");
    dispatch(clearSearch());
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons
          name={ICONS.backArrow}
          size={SIZES.icon20}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <TopBanner
        visible={banner.visible}
        type={banner.type}
        message={banner.message}
        onHide={() => setBanner({ ...banner, visible: false })}
      />
      <View style={styles.containerCard}>
        <Text style={styles.inputText}>
          {STRINGS[language].doctorSearch.searchLabel}
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder={STRINGS[language].doctorSearch.seacrhPlaceholder}
          value={searchTerm}
          onChangeText={(text) => handleChangeSearch(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {loading.search && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.secondary} />
          </View>
        )}
        {doctorsList.length > 0 ? (
          <FlatList
            data={doctorsList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.doctorItem}
                onPress={() => handleSelect(item)}
              >
                {item.profile.photo ? (
                  <Image
                    source={{
                      uri: `${BASE_URL}/img/users/${item.profile.photo}`,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons
                      name={ICONS.person}
                      size={SIZES.icon50}
                      color={COLORS.iconGrey}
                    />
                  </View>
                )}
                <View>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  <Text>
                    {STRINGS[language].speciality[item?.profile?.specialtyId]}
                  </Text>
                  <Text>
                    {item.profile.address.city} {item.profile.address.country}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />
        ) : (
          serachIsActive &&
          !loading.search && (
            <View style={styles.noDataContainer}>
              <Image
                source={require("../../../assets/NoDoctors.png")}
                style={styles.nodataImage}
              />
              <Text>No se encontraron resultados</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};
HomeSearch.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeSearch;
