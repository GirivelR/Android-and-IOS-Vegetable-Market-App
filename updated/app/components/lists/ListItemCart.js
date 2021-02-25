import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItemCart({
  itemdata,
  title,
  subTitle,
  image,
  quantity,
  IconComponent,
  onPressPlus,
  onPressMinus,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        {IconComponent}
        {image && (
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="stretch"
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title +
              " x " +
              itemdata.count * quantity +
              (itemdata.type || "kg")}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {"Rs." +
                subTitle +
                " x " +
                itemdata.count * quantity +
                " = " +
                itemdata.price * itemdata.count * quantity}
            </Text>
          )}
        </View>
        <TouchableOpacity
          underlayColor={colors.light}
          onPress={() => onPressMinus(itemdata)}
        >
          <MaterialCommunityIcons
            color={colors.medium}
            name="minus"
            size={30}
            style={styles.box_color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor={colors.light}
          onPress={() => onPressPlus(itemdata)}
        >
          <MaterialCommunityIcons
            color={colors.medium}
            name="plus"
            size={30}
            style={styles.box_color}
          />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  box_color: {
    backgroundColor: colors.light,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    // padding: 5,
    margin: 10,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#e6d178",
    height: 90,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: "25%",
    height: "100%",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default ListItemCart;
