import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { tabText } from "../../utils/colors";

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.textBtn, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBtn: {
    textAlign: "center",
    color: tabText,
  },
});
