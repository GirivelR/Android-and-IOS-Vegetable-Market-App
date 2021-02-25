import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import DashBoardNavigator from "./DashBoardNavigator";
import AddItem from "../dashboard/AddItem";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  // const [items, setitems] = useState([]);
  // const [listings, setListings] = useState([]);

  // useEffect((det) => {
  //   fetch("http://13.233.149.39:8080/listings", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       details: det,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((value) => {
  //       setListings(value.sta);
  //     });
  // }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 5,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashBoardNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddItem"
        component={AddItem}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
