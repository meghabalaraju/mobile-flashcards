import React, { Component } from "react";
import { StatusBar, View } from "react-native";

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers";

// navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// imports component
import DeckList from "./components/DeckList";
import DeckDetails from "./components/DeckDetails";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import ansCard from "./components/answerCard";

// imports utils
import {
  bgTabBar,
  gray,
  tabBorderColor,
  tabText,
  bgStatusBar,
} from "./utils/colors";
import { setLocalNotifications } from "./utils/notification";

// Tab navigation for Decklists and NewDeck
const Tab = createMaterialTopTabNavigator();

// styles for tab bar
const optionTabBar = {
  activeTintColor: tabText,
  inactiveTintColor: gray,
  style: {
    backgroundColor: bgTabBar,
  },
  indicatorStyle: {
    backgroundColor: tabBorderColor,
  },
};

function TabNavs() {
  return (
    <Tab.Navigator tabBarOptions={optionTabBar}>
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add decks" component={NewDeck} />
    </Tab.Navigator>
  );
}

// Stack navigation for AddCard, Quiz and others
const Stack = createStackNavigator();

// store creation
const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {
  // set local notification
  componentDidMount() {
    setLocalNotifications;
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={bgStatusBar} barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={TabNavs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Deck details"
                component={DeckDetails}
                options={{
                  headerStyle: {
                    backgroundColor: bgTabBar,
                  },
                  headerTintColor: "#045762",
                }}
              />
              <Stack.Screen name="Add Card" component={NewCard} />
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
}
