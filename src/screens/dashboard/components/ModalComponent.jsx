import React from "react";
import PropTypes from "prop-types";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import STRINGS from "../../../constants/strings";
import { useSelector } from "react-redux";
import { TYPES } from "../../../styles/theme";

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  handleSelect,
  data,
  type,
  title,
}) => {
  const language = useSelector((state) => state.language.language);

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
            {title && <Text style={styles.title}>{title}</Text>}
            {type === TYPES.listSelector &&
              data.map((e) => (
                <TouchableOpacity
                  key={e.code}
                  onPress={() => handleSelect(e.code)}
                  style={styles.option}
                >
                  <Text>{e.label}</Text>
                </TouchableOpacity>
              ))}
            {type === TYPES.button &&
              data.map((e) => (
                <TouchableOpacity
                  key={e.code}
                  style={styles.typeButton}
                  onPress={() => handleSelect(e.code)}
                >
                  <Text style={styles.typeButtonText}>{e.label}</Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancel}
            >
              <Text style={styles.cancelText}>
                {STRINGS[language].account.closeButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalComponent.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  handleSelect: PropTypes.func,
  data: PropTypes.any,
  type: PropTypes.string,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
  cancel: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: { color: "red" },

  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#70C1E3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  typeButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default ModalComponent;
