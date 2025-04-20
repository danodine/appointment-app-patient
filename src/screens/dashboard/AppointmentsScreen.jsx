// screens/AppointmentsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcommingAppointments,
  getPasstAppointments,
  clearUpcommingAppointments,
  clearPasstAppointments,
} from "../../redux/appointmentsSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { formatDate } from "../../utils/helpers";

const screenWidth = Dimensions.get("window").width;

const AppointmentsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { upcommingAppointmentsList, passtAppointmentsList } = useSelector(
    (state) => state.appointments
  );

  const [appointments, setAppointments] = useState(upcommingAppointmentsList);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [hasFetchedPasstAppointments, setHasFetchedPasstAppointments] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      setActiveTab(0);
      setHasFetchedPasstAppointments(false)
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
      <Text style={styles.title}>Mis Citas</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tab}
          onPress={handleUpcomingAppointments}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>
            Proximas Citas
          </Text>
          {activeTab === 0 && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={handlePasstAppointments}>
          <Text style={styles.tabText}>Citas Pasadas</Text>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  tab: {
    fontSize: 16,
    marginRight: 20,
  },
  tabText: {
    color: "black",
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: screenWidth - 40,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    transition: "transform 0.2s ease-in-out",
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft: 5,
  },
  item1: {
    fontWeight: "bold",
    fontSize: 16,
  },
  // newCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 20,
  // },
  // newText: {
  //   fontSize: 16,
  //   color: "#444",
  // },
});

export default AppointmentsScreen;
