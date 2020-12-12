import React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import DeckList from "./components/DeckList";
import DeckDetails from "./components/DeckDetails";
// import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
// import NewCard from "./components/NewCard";
// import Quiz from "./components/Quiz";
// import ansCard from "./components/ansCard";
import MFStatusBar from "./components/UIComponents/MFStatusBar";

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

const store = createStore(reducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
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
              name="DeckDetails"
              component={DeckDetails}
              options={{ headerTitle: "" }}
            />
            {/* <Stack.Screen name="AddCard" component={NewCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen
              name="AnswerCard"
              component={ansCard}
              options={{ headerShown: false }}
            />*/}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
