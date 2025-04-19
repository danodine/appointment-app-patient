import {
    Text,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import styles from "../../../styles/homeSearchStyles";
  import PropTypes from "prop-types";

const HomeSearch = ({handleChangeSearch, handleSelect, list, handleBack, searchTerm}) => {
  return (
    <View style={styles.containerCard} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back-outline" size={20} color="#000" />
      </TouchableOpacity>

      <Text style={styles.inputText}>Nombre, Especialidad</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        value={searchTerm}
        onChangeText={(text) => handleChangeSearch(text)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorItem}
            onPress={() => handleSelect(item)}
          >
            <Image
              source={require("../../../assets/icons/icono-cardio.png")}
              style={styles.cardIcon}
            />
            <View>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text>{item.profile.specialty}</Text>
              <Text>
                {item.profile.address.city} {item.profile.address.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
HomeSearch.propTypes = {
  handleChangeSearch: PropTypes.func,
  handleSelect: PropTypes.func,
  list: PropTypes.array,
  handleBack: PropTypes.func,
  searchTerm: PropTypes.string,
};

export default HomeSearch;
