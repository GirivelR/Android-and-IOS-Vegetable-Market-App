import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";
import AppText from "../Text";

function ListItem({
  title,
  subTitle,
  status,
  image,
  IconComponent,
  onPress,
  phone,
  address,
  cheIcon = true,
  renderRightActions,
  email,
  deleteIcon = false,
  cancelOrder,
  item,
  key1,
  today,
  datedel,
}) {
  // for (let i in item) {
  //   if (i !== "image") console.log(i, item[i]);
  // }
  const cancelFunction = (item) =>
    Alert.alert(
      "Cancel Order",
      "Do you want to cancel this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "YES", onPress: () => cancelOrder(item) },
      ],
      { cancelable: false }
    );
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && cheIcon === false && (
            <Image
              style={styles.imageTrasaction}
              source={{ uri: image }}
              resizeMode="stretch"
            />
          )}
          {image && cheIcon === true && (
            <Image style={styles.image} source={{ uri: image }} />
          )}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            {deleteIcon === false && subTitle && (
              <Text style={styles.subTitle}>{subTitle}</Text>
            )}
            {address && (
              <Text
                style={[
                  styles.subTitle,
                  { color: colors.secondary, fontSize: 15 },
                ]}
              >
                {address}
              </Text>
            )}
            {phone && (
              <Text style={styles.subTitle} numberOfLines={1}>
                {phone}
              </Text>
            )}
            {status === "Ordered" && (
              <Text style={styles.statusPaid}>{status}</Text>
            )}
            {status === "Cancelled" && (
              <Text style={styles.statusCancelled}>{status}</Text>
            )}
          </View>
          {cheIcon === true && (
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-right"
              size={25}
            />
          )}
        </View>
      </TouchableHighlight>
      {deleteIcon === true && subTitle && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <Text
            style={[
              styles.subTitle,
              {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 15,
                backgroundColor: "#f3e2b1",
                flex: 1,
                borderRadius: 10,
                marginHorizontal: 5,
                paddingHorizontal: 10,
                paddingVertical: 2,
              },
            ]}
          >
            {subTitle}
          </Text>

          {datedel ===
            today.getDate() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getFullYear() && (
            <TouchableOpacity
              onPress={() => cancelFunction(item, key1)}
              style={{
                backgroundColor: "#e8d7e6",
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 5,
              }}
            >
              <AppText style={{ color: "red", fontWeight: "bold" }}>
                Cancel Order
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  imageTrasaction: {
    width: 100,
    height: 70,
    borderRadius: 5,
  },
  subTitle: {
    color: colors.medium,
  },
  statusPaid: {
    color: "green",
  },
  statusCancelled: {
    color: "red",
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
