import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpcomingAppointments,
  getPastAppointments,
  clearAppointmentsState,
  cancelAppointment,
} from "../../../redux/appointmentsSlice";
import { getDoctorById } from "../../../redux/doctorSlice";
import { useFocusEffect } from "@react-navigation/native";
import {
  formatDateText,
  formatTime,
  sendEmail,
  callPhone,
} from "../../../utils/helpers";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { unwrapResult } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../../config";
import { Ionicons } from "@expo/vector-icons";
import STRINGS from "../../../constants/strings";
import styles from "./styles";
import { COLORS } from "../../../styles/theme";
import PropTypes from "prop-types";

const AppointmentsScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { showActionSheetWithOptions } = useActionSheet();
  const { upcomingAppointmentsList, pastAppointmentsList } = useSelector(
    (state) => state.appointments,
  );
  const language = useSelector((state) => state.language.language);

  const [appointments, setAppointments] = useState(upcomingAppointmentsList);
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

      const fetchAppointments = async () => {
        await dispatch(getUpcomingAppointments({ userId: user?._id }));
      };

      fetchAppointments();

      return () => {
        dispatch(clearAppointmentsState());
      };
    }, [dispatch, user?._id]),
  );

  useEffect(() => {
    setAppointments(upcomingAppointmentsList);
  }, [upcomingAppointmentsList]);

  useEffect(() => {
    setAppointments(pastAppointmentsList);
  }, [pastAppointmentsList]);

  const handleUpcomingAppointments = () => {
    setActiveTab(0);
    setAppointments(upcomingAppointmentsList);
  };

  const handlePasstAppointments = () => {
    setActiveTab(1);
    if (!hasFetchedPasstAppointments) {
      dispatch(getPastAppointments({ userId: user._id }));
      setHasFetchedPasstAppointments(true);
    } else {
      setAppointments(pastAppointmentsList);
    }
  };

  const handleAppointment = (item) => {
    setModalData(item);
    setModalVisible(true);
  };

  const handleConfirmCancelAppointment = async () => {
    await dispatch(cancelAppointment({ appointmentId: modalData?._id }));
    if (activeTab === 0) {
      await dispatch(getUpcomingAppointments({ userId: user?._id }));
    } else {
      await dispatch(getPastAppointments({ userId: user?._id }));
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
    const resultAction = await dispatch(
      getDoctorById({ id: modalData?.doctor?._id }),
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

  const openMapPrompt = async (address) => {
    const query = encodeURIComponent(address);

    const options = ["Open in Google Maps", "Open in Waze"];
    if (Platform.OS === "ios") {
      options.push("Open in Apple Maps");
    }
    options.push("Cancel");

    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const googleMapsAppUrl = `comgooglemaps://?q=${query}`;
          const googleMapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

          const canOpen = await Linking.canOpenURL("comgooglemaps://");
          if (canOpen) {
            Linking.openURL(googleMapsAppUrl);
          } else {
            Linking.openURL(googleMapsWebUrl);
          }
        } else if (buttonIndex === 1) {
          // Waze
          const wazeAppUrl = `waze://?q=${query}&navigate=yes`;
          const wazeWebUrl = `https://waze.com/ul?q=${query}&navigate=yes`;

          const canOpen = await Linking.canOpenURL("waze://");
          if (canOpen) {
            Linking.openURL(wazeAppUrl);
          } else {
            Linking.openURL(wazeWebUrl);
          }
        } else if (Platform.OS === "ios" && buttonIndex === 2) {
          // Apple Maps
          const appleMapsUrl = `http://maps.apple.com/?q=${query}`;
          Linking.openURL(appleMapsUrl);
        }
      },
    );
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
                {STRINGS[language].appointments.date}
              </Text>
              {formatDateText(modalData?.dateTime, language)}
            </Text>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.time}{" "}
              </Text>
              {formatTime(modalData?.dateTime)} -{" "}
              {formatTime(modalData?.dateTime, modalData?.duration)}
            </Text>

            <View style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.location}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  openMapPrompt(
                    `${modalData?.doctorAdrress?.street}, ${modalData?.doctorAdrress?.city}, ${modalData?.doctorAdrress?.country}`,
                  )
                }
              >
                <Text style={styles.linkElement}>
                  {" "}
                  {modalData?.doctorAdrress?.street}
                  {" - "}
                  {modalData?.doctorAdrress?.city}{" "}
                  {modalData?.doctorAdrress?.country}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].doctorProfile.email}
              </Text>
              <TouchableOpacity
                onPress={() => callPhone(modalData?.doctorPhone)}
              >
                <Text style={styles.linkElement}>
                  {" "}
                  {modalData?.doctorPhone}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].doctorProfile.email}
              </Text>
              <TouchableOpacity
                onPress={() => sendEmail(modalData?.doctor?.email)}
              >
                <Text style={styles.linkElement}>
                  {" "}
                  {modalData?.doctor?.email}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.itemTextConteiner}>
              <Text style={styles.bold}>
                {STRINGS[language].appointments.status}
              </Text>
              <Text
                style={
                  modalData?.status === "scheduled"
                    ? styles.active
                    : styles.inActive
                }
              >
                {activeTab === 0
                  ? STRINGS[language]?.appointments[modalData?.status]?.cero
                  : STRINGS[language]?.appointments[modalData?.status]?.uno}
              </Text>
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
            {item?.doctorPhoto ? (
              <Image
                source={{
                  uri: `${BASE_URL}/img/users/${item?.doctorPhoto}`,
                }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={50} color="#9ca3af" />
              </View>
            )}
            <View>
              <Text style={styles.item1}>{item.doctorName}</Text>
              <Text>{STRINGS[language].speciality[item.doctorSpeciality]}</Text>
              <Text>{formatDateText(item.dateTime, language)}</Text>
              <Text>
                {formatTime(item?.dateTime)} -{" "}
                {formatTime(item?.dateTime, item?.duration)}
              </Text>
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
