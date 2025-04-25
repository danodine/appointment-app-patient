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
import { useFocusEffect } from "@react-navigation/native";
import { formatDateTime } from "../../utils/helpers";
import STRINGS from "../../constants/strings";
import styles from "../../styles/appointmentScreenStyles";

const AppointmentsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { upcommingAppointmentsList, passtAppointmentsList } = useSelector(
    (state) => state.appointments,
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
    }, []),
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

  const handleBookAppointment = () => {};

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDateError(false);
    setConfirmCancelAppointment(false);
    setModalData({});
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
            <View>
              <Text>{STRINGS[language].appointments.name}</Text>
              <Text>{modalData?.doctorName}</Text>
            </View>
            <View>
              <Text>{STRINGS[language].appointments.speciality}</Text>
              <Text>
                {STRINGS[language]?.speciality[modalData?.doctorSpeciality]}
              </Text>
            </View>
            <View>
              <Text>{STRINGS[language].appointments.timeDate}</Text>
              <Text>{formatDateTime(modalData?.dateTime)}</Text>
            </View>
            <View>
              <Text>{STRINGS[language].appointments.location}</Text>
              <Text>{modalData?.location}</Text>
            </View>
            <View>
              <Text>{STRINGS[language].appointments.status}</Text>
              <Text>{modalData?.status}</Text>
            </View>

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
              <Text>{formatDateTime(item.dateTime)}</Text>
              <Text
                style={{ color: item.status === "cancelled" ? "red" : "green" }}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AppointmentsScreen;
