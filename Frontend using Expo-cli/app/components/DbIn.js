import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Switch,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../../app/components/Text";
import colors from "../../app/config/colors";
import { ListItemSeparator } from "../../app/components/lists";
import Editing from "./Editing";

function DbIn({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setListings] = useState([]);
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState("false");
  const toggleSwitch = () => {
    let x = "true";
    if (isEnabled === true) {
      x = "false";
    }

    setIsEnabled((previousState) => !previousState);
    fetch("http://13.233.149.39:8080/toggle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: {
          toggle: x,
        },
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        let t = value.sta === "true" ? "Opened" : "closed";
        Alert.alert("Info", "shop is " + t);
      });
  };

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
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      });
  };

  useEffect((det) => {
    refreshFunction(det);
    setShow(false);
  }, []);
  const onEdit = ({ itemdata }) => {
    navigation.push("EditItem", itemdata);
  };

  const removeItem = (data) => {
    setListings(items.filter((item) => item != data));
  };

  return (
    <React.Fragment>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.primary,
          borderTopWidth: 1,
          paddingHorizontal: 10,
        }}
      >
        <AppText
          style={{
            fontSize: 25,
            color: colors.light,
          }}
        >
          Dashboard
        </AppText>
        <Switch
          trackColor={{ false: colors.third, true: colors.back }}
          thumbColor={colors.light}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {((!items || items.length === 0) && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshFunction}
            />
          }
          contentContainerStyle={styles.container}
        >
          <MaterialCommunityIcons
            name="timer-sand-empty"
            color={colors.medium}
            size={70}
            style={{ padding: 5 }}
          />
          <AppText style={styles.noselect}>No items</AppText>
        </ScrollView>
      )) || (
        <View style={styles.container1}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Editing
                itemdata={item}
                title={item.title}
                subTitle={item.price}
                image={item.image}
                onEdit={onEdit}
                removeItem={removeItem}
              />
            )}
            refreshing={refreshing}
            onRefresh={refreshFunction}
          />
        </View>
      )}
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    //borderTopWidth: 30,
    borderColor: colors.medium,
    backgroundColor: colors.white,
  },
  noselect: {
    color: "black",
  },
  container1: {
    flex: 1,
    marginBottom: 50,
    paddingTop: 5,
  },
});
export default DbIn;
