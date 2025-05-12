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
  UIManager,
  Platform,
  LayoutAnimation,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { searchDoctors, clearSearch } from "../../../redux/doctorSlice";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../../config";
import STRINGS from "../../../constants/strings";
import { ICONS, COLORS, SIZES, FONT_SIZES } from "../../../styles/theme";
import TopBanner from "../components/TopBanner/Index";
import { provinces } from "../../../constants/vars";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeSearch = ({ navigation }) => {
  const { doctorsList, error, loading } = useSelector((state) => state.doctor);
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [serachIsActive, setSerachIsActive] = useState(false);

  const [city, setCity] = useState("");

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
      dispatch(searchDoctors({ text, city }));
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

  const handleLocations = (locations) => {
    const uniqueLocations = [
      ...new Set(
        locations
          ?.flatMap((day) => day.timeSlots.map((slot) => slot.location))
          ?.filter(Boolean)
      ),
    ];

    return (
      <>
        {uniqueLocations.map((loc, index) => (
          <Text key={index}>{loc}</Text>
        ))}
      </>
    );
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
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>
            {STRINGS[language].doctorSearch.province}
          </Text>
          <View style={styles.rowContainer}>
            <Dropdown
              style={styles.dropdown}
              data={provinces}
              labelField="label"
              valueField="value"
              value={city}
              onChange={(item) => {
                setCity(item.value);
                if (searchTerm.length >= 3 || item.value) {
                  dispatch(
                    searchDoctors({ text: searchTerm, city: item.value })
                  );
                  setSerachIsActive(true);
                }
              }}
              itemTextStyle={{ fontSize: FONT_SIZES.inputText }}
              selectedTextStyle={{ fontSize: FONT_SIZES.inputText }}
              placeholderStyle={{
                fontSize: FONT_SIZES.inputText,
                color: COLORS.ligthGreyText,
              }}
            />
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={() => {
                setCity("");
                setSearchTerm("");
                setSerachIsActive(false);
                dispatch(clearSearch());
              }}
            >
              <Text style={styles.clearFiltersText}>
                {STRINGS[language].doctorSearch.cleanFiltersTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
                    {item?.profile?.address?.city.charAt(0).toUpperCase() +
                      item?.profile?.address?.city.slice(1)}{" "}
                    {item?.profile?.address?.country}
                  </Text>
                  <Text style={styles.boldText}>{STRINGS[language].speciality[item?.profile?.offices]}</Text>
                  {handleLocations(item.profile.availability)}
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
              <Text>{STRINGS[language].doctorSearch.noDataFound}</Text>
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
