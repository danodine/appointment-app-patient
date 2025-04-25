import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
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
      navigation.navigate(language === "es" ? "Citas" : "Appointments")
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
      <Text>No slots available for this day.</Text>
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
        <Text style={styles.doctorName}>Dr. Lisa Müller</Text>
        <Text style={styles.doctorSubtitle}>Dermatologist • Berlin</Text>
        <Text style={styles.doctorSubtitle}>av. xxxx</Text>
      </View>

      <Text style={styles.sectionTitle}>Select a Date</Text>

      <Calendar
        onDayPress={onDateSelected}
        markedDates={markedDates}
        disableAllTouchEventsForDisabledDays
        hideExtraDays={true}
        minDate={new Date().toISOString().split("T")[0]}
        maxDate={futureDate.toISOString().split("T")[0]}
        theme={{
          selectedDayBackgroundColor: "#2563EB",
          selectedDayTextColor: "#fff",
          todayTextColor: "#2563EB",
        }}
      />

      <Text style={styles.sectionTitle}>Available Times</Text>

      {calendarLoading ? <ActivityIndicator size="large" /> : calendarElement()}

      <TouchableOpacity
        onPress={handleBookAppointment}
        disabled={!selectedDate || !selectedTime}
        style={[
          styles.confirmButton,
          (!selectedDate || !selectedTime) && styles.confirmButtonDisabled,
        ]}
      >
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
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
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    backgroundColor: "#70C1E3",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  doctorCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 110,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  doctorSubtitle: {
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  timeSlotSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  timeSlotText: {
    color: "#000",
  },
  timeSlotTextSelected: {
    color: "#fff",
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: "#70C1E3",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
});

export default BookAppointmentScreen;
