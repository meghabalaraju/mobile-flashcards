import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

function MFStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <MFStatusBar backgroundColor="#8db596" barStyle="light-content" />
      <Text>Env for mobile flashcards</Text>
    </View>
  );
}
