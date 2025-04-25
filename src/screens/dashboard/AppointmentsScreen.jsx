import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcommingAppointments,
  getPasstAppointments,
  clearUpcommingAppointments,
  clearPasstAppointments,
  cancelAppointment,
} from "../../redux/appointmentsSlice";
import { getDoctorById } from "../../redux/doctorSlice";
import { useFocusEffect } from "@react-navigation/native";
import { formatDateTime } from "../../utils/helpers";
import { unwrapResult } from "@reduxjs/toolkit";
import STRINGS from "../../constants/strings";
import styles from "../../styles/appointmentScreenStyles";
import { COLORS } from "../../styles/theme";
import PropTypes from "prop-types";

const AppointmentsScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { upcommingAppointmentsList, passtAppointmentsList } = useSelector(
    (state) => state.appointments
  );
  const language = useSelector((state) => state.language.language);

  const [appointments, setAppointments] = useState(upcommingAppointmentsList);
  const [activeTab, setActiveTab] = useState(0);
  const [hasFetchedPasstAppointments, setHasFetchedPasstAppointments] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalDateError, setModalDateError] = useState(false);
  const [confirmCancelAppointment, setConfirmCancelAppointment] =
    useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setActiveTab(0);
      setHasFetchedPasstAppointments(false);
      try {
        dispatch(getUpcommingAppointments({ userId: user?._id }));
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

  const handleAppointment = (item) => {
    setModalData(item);
    setModalVisible(true);
  };

  const handleConfirmCancelAppointment = async () => {
    try {
      await dispatch(cancelAppointment({ appointmentId: modalData?._id }));
      if (activeTab === 0) {
        await dispatch(getUpcommingAppointments({ userId: user?._id }));
      } else {
        await dispatch(getPasstAppointments({ userId: user?._id }));
      }
    } catch (err) {
      console.error("Error Block", err);
    }

    setModalVisible(false);
    setModalDateError(false);
    setConfirmCancelAppointment(false);
    setModalData({});
  };

  const handleCancelAppointment = () => {
    const now = new Date();
    const appointment = modalData.dateTime;
    const diffInMs = appointment - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 12 && diffInHours > 0) {
      setModalDateError(true);
    } else {
      setModalDateError(false);
      setConfirmCancelAppointment(true);
    }
  };

  const handleBookAppointment = async () => {
    try {
      const resultAction = await dispatch(
        getDoctorById({ id: modalData?.doctor?._id })
      );
      const data = unwrapResult(resultAction);
      const doctorData = data.data;

      if (doctorData) {
        navigation.navigate("BookAppointment", {
          doctor: doctorData,
          location: modalData.location,
        });
        setModalVisible(false);
        setModalDateError(false);
        setConfirmCancelAppointment(false);
        setModalData({});
      }
    } catch (err) {
      console.log("Error Block", err);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDateError(false);
    setConfirmCancelAppointment(false);
    setModalData({});
  };

  const handleNewAppointment = () => {
    navigation.navigate("DoctorSearch");
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.doctorName}>{modalData?.doctorName}</Text>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.speciality}
              </Text>
              {STRINGS[language]?.speciality[modalData?.doctorSpeciality]}
            </Text>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.timeDate}
              </Text>
              {formatDateTime(modalData?.dateTime, language)}
            </Text>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.location}
              </Text>
              {modalData?.location}
            </Text>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.status}
              </Text>
              {activeTab === 0
                ? STRINGS[language]?.appointments[modalData?.status]?.cero
                : STRINGS[language]?.appointments[modalData?.status]?.uno}
            </Text>

            {modalDateError && (
              <Text>{STRINGS[language].appointments.dateError}</Text>
            )}
            {modalData.status === "scheduled" && activeTab === 0 && (
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  confirmCancelAppointment && styles.buttonInactive,
                ]}
                onPress={() => handleCancelAppointment()}
                disabled={confirmCancelAppointment}
              >
                <Text style={styles.typeButtonText}>
                  {STRINGS[language].appointments.cancelAppointment}
                </Text>
              </TouchableOpacity>
            )}
            {activeTab === 1 && (
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  confirmCancelAppointment && styles.buttonInactive,
                ]}
                onPress={() => handleBookAppointment()}
                disabled={confirmCancelAppointment}
              >
                <Text style={styles.typeButtonText}>
                  {STRINGS[language].appointments.bookAgain}
                </Text>
              </TouchableOpacity>
            )}
            {confirmCancelAppointment && (
              <>
                <Text>{STRINGS[language].appointments.cancelationMessage}</Text>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={() => handleConfirmCancelAppointment()}
                >
                  <Text style={styles.typeButtonText}>
                    {STRINGS[language].appointments.confirmButton}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal} style={styles.cancel}>
              <Text style={styles.cancelText}>
                {STRINGS[language].appointments.closeButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => handleAppointment(item)}
          >
            <View style={styles.statusIcon}>
              <Image
                source={
                  item.status === "scheduled"
                    ? require("../../assets/icons/check-green.png")
                    : require("../../assets/icons/x-red.png")
                }
                style={styles.iconSize}
              />
            </View>
            <Image
              style={styles.cardIcon}
              source={require("../../assets/icons/icono-cardio.png")}
            />
            <View>
              <Text style={styles.item1}>{item.doctorName}</Text>
              <Text>{STRINGS[language].speciality[item.doctorSpeciality]}</Text>
              <Text>{formatDateTime(item.dateTime, language)}</Text>
              <Text
                style={{
                  color:
                    item.status === "cancelled" ? COLORS.error : COLORS.green,
                }}
              >
                {activeTab === 0
                  ? STRINGS[language].appointments[item.status].cero
                  : STRINGS[language].appointments[item.status].uno}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.newAppointmentButton}
        onPress={handleNewAppointment}
      >
        <Text style={styles.newAppointmentButtonText}>
          {STRINGS[language].appointments.bookNewAppointment}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
AppointmentsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AppointmentsScreen;
