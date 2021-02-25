import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Updates from "expo-updates";

import Text from "./Text";
import colors from "../config/colors";

const Delete = (item, removeItem) => {
  const DeleteAction = (item) => {
    fetch("http://13.233.149.39:8080/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: item,
      }),
    });
    Alert.alert("Info", item.title + " deleted!");
    removeItem(item);
  };
  // Works on both Android and iOS
  Alert.alert(
    "Alert",
    "Do you want to delete " + item.title,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          DeleteAction(item);
        },
      },
    ],
    { cancelable: false }
  );
};

function Editing({ itemdata, title, subTitle, image, onEdit, removeItem }) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode="stretch"
        />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subTitle && (
          <Text style={styles.subTitle} numberOfLines={2}>
            {"Rs." + subTitle + " / " + (itemdata.type || "kg")}
          </Text>
        )}
      </View>
      <TouchableOpacity
        underlayColor={colors.light}
        onPress={() => onEdit({ itemdata })}
      >
        <MaterialCommunityIcons
          color={colors.medium}
          name="pencil"
          size={30}
          style={[styles.box_color, { color: "#468ce2" }]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        underlayColor={colors.light}
        onPress={() => Delete(itemdata, removeItem)}
      >
        <MaterialCommunityIcons
          color={colors.medium}
          name="delete-outline"
          size={30}
          style={[styles.box_color, { color: "#e43656" }]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box_color: {
    backgroundColor: colors.light,
    borderRadius: 5,
    marginHorizontal: 12,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#d6dcf1",
    margin: 3,
    borderRadius: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 20,
    overflow: "hidden",
  },
  subTitle: {
    color: "#076b62",
  },
  title: {
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default Editing;
