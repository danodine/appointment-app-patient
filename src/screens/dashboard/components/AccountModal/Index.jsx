import React from "react";
import PropTypes from "prop-types";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import STRINGS from "../../../../constants/strings";
import { useSelector } from "react-redux";
import { TYPES } from "../../../../styles/theme";
import styles from "./styles";

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

export default ModalComponent;
