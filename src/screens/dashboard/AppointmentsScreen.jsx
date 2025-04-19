import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const AppointmentsScreen = ({ navigation }) =>{
  return (
    <View style={styles.container}>
    </View>
  )
}

AppointmentsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AppointmentsScreen;
