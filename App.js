import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

import DeckList from "./components/Decklist";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import ansCard from "./components/ansCard";

function MFStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

// Tab navigation for Decklists and NewDeck
const Tab = createMaterialTopTabNavigator();

function TabNavs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add decks" component={NewDeck} />
    </Tab.Navigator>
  );
}

// Stack navigation for AddCard, Quiz and others
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <MFStatusBar backgroundColor="#8db596" barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Deck"
              component={Deck}
              options={{ headerTitle: "" }}
            />
            <Stack.Screen name="AddCard" component={NewCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen
              name="AnswerCard"
              component={ansCard}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
