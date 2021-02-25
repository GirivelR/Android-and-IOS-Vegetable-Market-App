import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";
import AppText from "./Text";

function Card({
  title,
  subTitle,
  image,
  onPressPlus,
  onPressMinus,
  style,
  count,
  quantity,
  type,
  price,
}) {
  return (
    (title !== undefined && (
      <React.Fragment>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="stretch"
          />
          <View style={{ backgroundColor: colors.light, flex: 1 }}>
            <View
              style={{
                backgroundColor: colors.light,
                height: "100%",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>

                <Text style={styles.subTitle} numberOfLines={2}>
                  {subTitle}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={onPressMinus}
                  style={styles.box_over}
                >
                  <MaterialCommunityIcons
                    color="white"
                    name="minus"
                    size={30}
                    style={styles.box_color}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressPlus} style={styles.box_over}>
                  <MaterialCommunityIcons
                    color="white"
                    name="plus"
                    size={30}
                    style={styles.box_color}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {count !== undefined && count > 0 && (
              <View
                style={{
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopWidth: 1,
                }}
              >
                <AppText style={{ color: colors.primary }}>
                  {count * quantity + " " + (type || "kg")}
                </AppText>
                <AppText>--</AppText>
                <AppText style={{ color: colors.secondary }}>
                  Rs.{count * quantity * price}
                </AppText>
              </View>
            )}
          </View>
        </View>
      </React.Fragment>
    )) || (
      <View
        style={[styles.card, { backgroundColor: "rgb(34,34,34,0)" }]}
      ></View>
    )
  );
}

const styles = StyleSheet.create({
  box_color: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 8,
    // bottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  box_over: {
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.primary,
    margin: 6,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: colors.light,
    // alignItems: "center",
  },
  image: {
    height: "100%",
    width: "25%",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default Card;
