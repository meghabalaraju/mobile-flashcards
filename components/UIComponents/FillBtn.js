import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { btnColor } from "../../utils/colors";

export default function FillButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.fillButton, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fillButton: {
    backgroundColor: btnColor,
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: btnColor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});
