import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import STRINGS from "../../constants/strings";
import { ICONS, COLORS, SIZES } from "../../styles/theme";
import styles from "../../styles/doctorProfileScreenStyles";

const DoctorProfileScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const language = useSelector((state) => state.language.language);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [times, setTimes] = useState([]);
  const locationList = useMemo(() => {
    if (!doctor?.profile?.availability) return [];

    const allLocations = doctor?.profile?.availability?.flatMap(
      (item) => item?.timeSlots?.map((val) => val.location) || []
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
      Alert.alert("Porfavor seleccione un consultorio");
    }
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
        <FontAwesome name={ICONS.userCircle} size={80} />
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
        icon="location-outline"
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
        <Text style={styles.phoneText}>
          <Text style={styles.bold}>
            {STRINGS[language].doctorProfile.phone}
          </Text>{" "}
          {doctor?.phone}
        </Text>
        <Text>
          <Text style={styles.bold}>
            {STRINGS[language].doctorProfile.email}
          </Text>{" "}
          {doctor?.email}
        </Text>
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.profile}
        icon="person-outline"
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
        icon={ICONS.time}
      >
        {times?.map((label, index) => (
          <View key={index}>
            <Text style={styles.bold}>{label?.day}</Text>
            {label?.slots?.map((slot, slotIndex) => (
              <Text key={slotIndex} style={styles.itemsText}>
                • {slot?.from} - {slot?.to}
              </Text>
            ))}
          </View>
        ))}
      </Section>
      {<View style={styles.underline} />}
      <Section
        title={STRINGS[language].doctorProfile.languages}
        icon={ICONS.globe}
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
        icon={ICONS.cash}
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
        icon={ICONS.shieldCheckmark}
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
      <Icon name={icon} size={SIZES.icon20} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
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
