import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { callPhone, sendEmail } from "../../../utils/helpers";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../../config";
import STRINGS from "../../../constants/strings";
import { ICONS, COLORS, SIZES } from "../../../styles/theme";
import styles from "./styles";

const DoctorProfileScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const language = useSelector((state) => state.language.language);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [times, setTimes] = useState([]);
  const locationList = useMemo(() => {
    if (!doctor?.profile?.availability) return [];

    const allLocations = doctor?.profile?.availability?.flatMap(
      (item) => item?.timeSlots?.map((val) => val.location) || [],
    );

    return [...new Set(allLocations)];
  }, [doctor]);

  useEffect(() => {
    if (locationList.length == 1) {
      setSelectedLocation(locationList[0]);
    }
  }, []);

  useEffect(() => {
    const dayMap = new Map();
    const normalizedLocation = selectedLocation?.trim()?.toLowerCase();
    for (const entry of doctor?.profile?.availability ?? []) {
      for (const slot of entry.timeSlots) {
        if (slot.location.trim().toLowerCase() === normalizedLocation) {
          if (!dayMap.has(entry.day)) {
            dayMap.set(entry.day, []);
          }
          dayMap.get(entry.day).push({ from: slot.from, to: slot.to });
        }
      }
    }
    setTimes(Array.from(dayMap, ([day, slots]) => ({ day, slots })));
  }, [selectedLocation, doctor]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBookAppointment = () => {
    if (selectedLocation) {
      navigation.navigate("BookAppointment", {
        doctor,
        location: selectedLocation,
      });
    } else {
      Alert.alert(STRINGS[language].doctorProfile.selectLocationAlert);
    }
  };

  const getTagLabel = (slot) => {
    const fromHour = parseInt(slot.from.split(":")[0]);
    if (fromHour >= 6 && fromHour < 12)
      return STRINGS[language].doctorProfile.morning;
    if (fromHour >= 12 && fromHour < 18)
      return STRINGS[language].doctorProfile.afternoon;
    return STRINGS[language].doctorProfile.fullDay;
  };

  const getTagStyle = (slot) => {
    const fromHour = parseInt(slot.from.split(":")[0]);
    if (fromHour >= 6 && fromHour < 12)
      return { backgroundColor: COLORS.morning };
    if (fromHour >= 12 && fromHour < 18)
      return { backgroundColor: COLORS.afternoon };
    return { backgroundColor: COLORS.secondary };
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons
          name={ICONS.backArrow}
          size={SIZES.icon20}
          color={COLORS.black}
        />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        {doctor?.profile?.photo ? (
          <Image
            source={{
              uri: `${BASE_URL}/img/users/${doctor?.profile?.photo}`,
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
        <Text style={styles.name}>{doctor?.name}</Text>
        <Text style={styles.specialty}>
          {STRINGS[language]?.speciality[doctor?.profile?.specialtyId]}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>
            {STRINGS[language].doctorProfile.bookAppointment}
          </Text>
        </TouchableOpacity>
      </View>

      <Section
        title={STRINGS[language].doctorProfile.location}
        icon={require("../../../assets/icons/location-icon.png")}
      >
        <Text style={styles.address}>
          {doctor?.profile?.address?.city} {doctor?.profile?.address?.country}
        </Text>
        {locationList.length > 1 ? (
          <View>
            <Text style={styles.selectorText}>
              {STRINGS[language].doctorProfile.selectLocation}
            </Text>
            {locationList.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedLocation(location)}
                style={styles.radioButtons}
              >
                <View style={styles.locotionView}>
                  {selectedLocation === location && (
                    <View style={styles.selectedLocation} />
                  )}
                </View>
                <Text>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text>{locationList[0]}</Text>
        )}

        <View style={styles.touchableElementContainer}>
          <Text style={{ ...styles.bold, ...styles.phoneText }}>
            {STRINGS[language].doctorProfile.phone}
          </Text>
          <TouchableOpacity
            onPress={() => callPhone(doctor?.phone)}
            style={styles.touchableElement}
          >
            <Text style={styles.linkElement}> {doctor?.phone}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.touchableElementContainer}>
          <Text style={styles.bold}>
            {STRINGS[language].doctorProfile.email}
          </Text>
          <TouchableOpacity onPress={() => sendEmail(doctor?.email)}>
            <Text style={styles.linkElement}> {doctor?.email}</Text>
          </TouchableOpacity>
        </View>
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.profile}
        icon={require("../../../assets/icons/profile-icon.png")}
      >
        <Text>{doctor?.profile?.biography}</Text>
        <View style={styles.tagContainer}>
          {doctor?.profile?.treatments?.map((label, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{label.treatmentName}</Text>
            </View>
          ))}
        </View>
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.schedule}
        icon={require("../../../assets/icons/time-icon.png")}
      >
        <View style={styles.timeChart}>
          {times?.map((item, index) => (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.dayTitle}>{item.day}</Text>
              {item.slots.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.timeSlot}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={COLORS.primary}
                    style={styles.timeChartIcon}
                  />
                  <Text
                    style={styles.timeText}
                  >{`${slot.from} - ${slot.to}`}</Text>
                  <View style={[styles.tagTime, getTagStyle(slot)]}>
                    <Text style={styles.tagTextTime}>{getTagLabel(slot)}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.languages}
        icon={require("../../../assets/icons/language-icon.png")}
      >
        {doctor?.profile?.languages?.map((label, index) => (
          <Text key={index} style={styles.itemsText}>
            • {label}
          </Text>
        ))}
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.paymentMethod}
        icon={require("../../../assets/icons/payment-icon.png")}
      >
        {doctor?.profile?.paymentMethods?.map((label, index) => (
          <Text key={index} style={styles.itemsText}>
            • {label}
          </Text>
        ))}
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.insurance}
        icon={require("../../../assets/icons/inshurance-icon.png")}
      >
        {doctor?.profile?.insurances?.map((label, index) => (
          <Text key={index} style={styles.itemsText}>
            • {label}
          </Text>
        ))}
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, icon, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
  children: PropTypes.node,
};

DoctorProfileScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      doctor: PropTypes.shape({
        name: PropTypes.string,
        specialtyId: PropTypes.string,
        profile: PropTypes.any,
        phone: PropTypes.any,
        email: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func,
  }).isRequired,
};

export default DoctorProfileScreen;
