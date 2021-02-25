import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import CartSection from "../screens/MyCart";
import ListingsScreen from "../screens/ListingsScreen";

function compare(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const [items, setitems] = useState([]);
  const [listings, setListings] = useState([]);
  const [itemCount, setItemCount] = useState({});
  const [isReady, setIsReady] = useState(true);

  const refreshFunction = async (det) => {
    fetch("http://13.233.149.39:8080/listings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: det,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        setListings(value.sta);
        if (
          value.toggle === "1" ||
          value.toggle === true ||
          value.toggle === "true"
        ) {
          setIsReady(true);
        } else {
          setIsReady(false);
        }
      });
  };

  useEffect((det) => {
    refreshFunction(det);
  }, []);

  const onPressMinus = (item) => {
    let x = itemCount;
    if (x.hasOwnProperty(item.title) && x[item.title] > 0) {
      x[item.title] -= 1;
    }
    setItemCount(x);
    //setItemCount(itemcount.filter((item) => item1 != t));
    let temp = [...items];
    if (temp && temp.length !== 0) {
      for (let i in temp) {
        if (temp[i] !== undefined && temp[i].id === item.id) {
          let t = temp[i];
          temp = temp.filter((item1) => item1 != t);
          if (t.count !== 1) {
            t.count -= 1;
            temp.push(t);
          }
          setitems(temp.sort(compare));
        }
      }
    }
  };
  const onPressPlus = (item) => {
    let x = itemCount;
    if (x.hasOwnProperty(item.title)) {
      x[item.title] += 1;
    } else {
      x[item.title] = 1;
    }
    setItemCount(x);
    let temp = [...items];
    if (temp && temp.length !== 0) {
      for (let i in temp) {
        if (temp[i].id == item.id) {
          let t = temp[i];
          temp = temp.filter((item1) => item1 != t);
          t.count += 1;
          temp.push(t);
          setitems(temp.sort(compare));
          return;
        }
      }
    }
    setitems([...items, { ...item, count: 1 }].sort(compare));
  };
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
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Feed"
        children={() => (
          <ListingsScreen
            listings={listings}
            setitems={setitems}
            onPressPlus={onPressPlus}
            onPressMinus={onPressMinus}
            itemCount={itemCount}
            refreshFunction={refreshFunction}
            isReady={isReady}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="My Cart"
        children={() => (
          <CartSection
            items={items}
            onPressPlus={onPressPlus}
            onPressMinus={onPressMinus}
            setitems={setitems}
            setItemCount={setItemCount}
            itemCount={itemCount}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          headerShown: true,
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
