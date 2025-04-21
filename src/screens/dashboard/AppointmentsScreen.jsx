import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcommingAppointments,
  getPasstAppointments,
  clearUpcommingAppointments,
  clearPasstAppointments,
} from "../../redux/appointmentsSlice";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "../../utils/helpers";
import STRINGS from "../../constants/strings";
import styles from "../../styles/appointmentScreenStyles";

const AppointmentsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { upcommingAppointmentsList, passtAppointmentsList } = useSelector(
    (state) => state.appointments
  );
  const language = useSelector((state) => state.language.language);

  const [appointments, setAppointments] = useState(upcommingAppointmentsList);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [hasFetchedPasstAppointments, setHasFetchedPasstAppointments] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      setActiveTab(0);
      setHasFetchedPasstAppointments(false);
      try {
        dispatch(getUpcommingAppointments({ userId: user._id }));
      } catch (error) {
        console.log("Error Block", error);
      }
      return () => {
        dispatch(clearUpcommingAppointments());
        dispatch(clearPasstAppointments());
      };
    }, [])
  );

  useEffect(() => {
    setAppointments(upcommingAppointmentsList);
  }, [upcommingAppointmentsList]);

  useEffect(() => {
    setAppointments(passtAppointmentsList);
  }, [passtAppointmentsList]);

  const handleUpcomingAppointments = () => {
    setActiveTab(0);
    setAppointments(upcommingAppointmentsList);
  };

  const handlePasstAppointments = () => {
    setActiveTab(1);
    if (!hasFetchedPasstAppointments) {
      try {
        dispatch(getPasstAppointments({ userId: user._id }));
        setHasFetchedPasstAppointments(true);
      } catch (error) {
        console.log("Error Block", error);
      }
    } else {
      setAppointments(passtAppointmentsList);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {STRINGS[language].appointments.myAppointments}
      </Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tab}
          onPress={handleUpcomingAppointments}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>
            {STRINGS[language].appointments.nextAppointments}
          </Text>
          {activeTab === 0 && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={handlePasstAppointments}>
          <Text style={styles.tabText}>
            {STRINGS[language].appointments.pastAppointments}
          </Text>
          {activeTab === 1 && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => console.log("hello")}
          >
            <Image
              style={styles.cardIcon}
              source={require("../../assets/icons/icono-cardio.png")}
            />
            <View>
              <Text style={styles.item1}>{item.doctorName}</Text>
              <Text>{item.doctorSpeciality}</Text>
              <Text>
                {formatDate(item.date)} {item.timeSlot}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        // ListFooterComponent={
        //   <TouchableOpacity style={styles.newCard}>
        //     <Text style={styles.newText}>Nueva cita</Text>
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
};

export default AppointmentsScreen;
