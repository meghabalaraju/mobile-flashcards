import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { white, btnColor } from "../../utils/colors";

export default function OutlineButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.outlineTextBtn, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outlineTextBtn: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: btnColor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
