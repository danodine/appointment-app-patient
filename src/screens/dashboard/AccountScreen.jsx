import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import AccountElement from "./components/AccountElement";
import { toggleLanguage } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { CommonActions } from "@react-navigation/native";

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const handleProfile = () => {};

  return (
    <View style={styles.container}>
      <AccountElement
        icon={"person-circle"}
        iconSize={50} // put in variables
        title={"Mi perfil"}
        subtitle={"Editar datos de perfil"}
        subtitle2={"Reestablecer contrasena"}
        handleClick={handleProfile}
      />
      <AccountElement
        icon={"globe"}
        iconSize={50}
        title={"Idioma"}
        subtitle={"espanol"}
        // subtitle2={""}
        handleClick={toggleLanguage}
      />
      <AccountElement
        icon={"close"}
        iconSize={50}
        title={"Cerrar session"}
        handleClick={handleLogOut}
      />
    </View>
  );
};

AccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", marginTop: 70 },
});

export default AccountScreen;
