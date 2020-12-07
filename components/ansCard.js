import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { lightPurp } from "../utils/colors";

function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}

class ansCard extends Component {
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  render() {
    const { ans } = this.props.route.params;
    return (
      <View>
        <Text style={styles.ansText}>{ans}</Text>
        <TextButton style={styles.textBtn} onPress={this.goBack}>
          Question
        </TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textBtn: {
    textAlign: "center",
    color: lightPurp,
    fontSize: 24,
  },
  ansText: {
    margin: 100,
    fontSize: 45,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default ansCard;
