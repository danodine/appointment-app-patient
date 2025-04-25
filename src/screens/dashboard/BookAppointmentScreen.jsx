import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchAvailableDates,
  fetchAvailableTimes,
  bookAppointment,
} from "../../redux/appointmentsSlice";
import PropTypes from "prop-types";
import { ICONS, COLORS, SIZES } from "../../styles/theme";
import STRINGS from "../../constants/strings";
import styles from "../../styles/bookAppointmentScreenStyles";

const BookAppointmentScreen = ({ route, navigation }) => {
  const { doctor, location } = route.params;
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  const doctorId = doctor?._id;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 182);

  const { availableDates, availableTimes, calendarLoading, error } =
    useSelector((state) => state.appointments);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchAvailableDates({ doctorId, location }));
    }
  }, [doctorId, location]);

  const onDateSelected = (day) => {
    const dateStr = day.dateString;
    if (!availableDates.includes(dateStr)) {
      Alert.alert(
        "Unavailable",
        "There are no available appointments on this date."
      );
      return;
    }
    setSelectedDate(dateStr);
    dispatch(fetchAvailableTimes({ doctorId, date: dateStr, location }));
    setSelectedTime(null);
  };

  const markedDates = {};
  const today = new Date();

  for (let i = 0; i < 183; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    if (availableDates.includes(dateStr)) {
      markedDates[dateStr] = {
        selected: selectedDate === dateStr,
        selectedColor: "#2563EB",
        selectedTextColor: "#ffffff",
      };
    } else {
      markedDates[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
      };
    }
  }

  const handleBookAppointment = () => {
    try {
      dispatch(
        bookAppointment({
          doctor: doctorId,
          doctorName: doctor.name,
          doctorSpeciality: doctor.profile.specialtyId,
          dateTime: new Date(
            `${selectedDate}T${selectedTime}:00.000Z`
          ).toISOString(),
          location,
        })
      );
      navigation.navigate(language === "es" ? "Citas" : "Appointments");
    } catch (err) {
      console.log("Error Block", err);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const calendarElement = () => {
    return availableTimes.length > 0 && selectedDate ? (
      <View style={styles.timeSlotContainer}>
        {availableTimes.map((slot) => (
          <TouchableOpacity
            key={slot}
            onPress={() => setSelectedTime(slot)}
            style={[
              styles.timeSlot,
              selectedTime === slot && styles.timeSlotSelected,
            ]}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTime === slot && styles.timeSlotTextSelected,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <Text>{STRINGS[language].bookAppointment.noSlots}</Text>
    );
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

      <View style={styles.doctorCard}>
        <Text style={styles.doctorName}>{doctor?.name}</Text>
        <Text style={styles.doctorSubtitle}>
          {doctor?.profile?.address?.city} - {doctor?.profile?.address?.country}
        </Text>
        <Text style={styles.doctorSubtitle}>{location}</Text>
      </View>

      <Text style={styles.sectionTitle}>
        {STRINGS[language].bookAppointment.selectDate}
      </Text>

      <Calendar
        onDayPress={onDateSelected}
        markedDates={markedDates}
        disableAllTouchEventsForDisabledDays
        hideExtraDays={true}
        minDate={new Date().toISOString().split("T")[0]}
        maxDate={futureDate.toISOString().split("T")[0]}
        theme={{
          selectedDayBackgroundColor: COLORS.selectedItem,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.selectedItem,
        }}
      />

      <Text style={styles.sectionTitle}>
        {STRINGS[language].bookAppointment.timeSlots}
      </Text>

      {calendarLoading ? <ActivityIndicator size="large" /> : calendarElement()}

      <TouchableOpacity
        onPress={handleBookAppointment}
        disabled={!selectedDate || !selectedTime}
        style={[
          styles.confirmButton,
          (!selectedDate || !selectedTime) && styles.confirmButtonDisabled,
        ]}
      >
        <Text style={styles.confirmButtonText}>
          {STRINGS[language].bookAppointment.confirmAppointment}
        </Text>
      </TouchableOpacity>

      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
    </ScrollView>
  );
};

BookAppointmentScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      doctor: PropTypes.object.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default BookAppointmentScreen;
