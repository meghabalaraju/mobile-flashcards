import React from "react";
import { View, Text } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function MFStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
