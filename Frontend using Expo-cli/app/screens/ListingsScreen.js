import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/Text";

function ListingsScreen({
  listings,
  onPressPlus,
  onPressMinus,
  itemCount,
  refreshFunction,
  isReady,
}) {
  const [refreshing, setRefreshing] = useState(false);

  if (listings.length % 2 === 1) {
    listings.push({ id: "100000" });
  }

  return (
    <>
      <View
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          borderTopWidth: 1,
        }}
      >
        <AppText
          style={{
            fontSize: 25,
            color: colors.light,
          }}
        >
          Items
        </AppText>
      </View>
      {(!isReady && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 5,
            borderColor: colors.medium,
            marginBottom: 49,
          }}
        >
          <MaterialCommunityIcons name="lock-clock" size={50} color="#b5b3b3" />
          <AppText>Shop is closed</AppText>
          <AppText>Come back later..</AppText>
        </View>
      )) ||
        (listings.length !== 0 && (
          <View style={styles.screen}>
            <FlatList
              data={listings}
              keyExtractor={(listing) => {
                return listing.id.toString();
              }}
              style={styles.container}
              renderItem={({ item }) => {
                if (item === {}) {
                  return <View style={[styles.item, styles.itemInvisible]} />;
                }
                return (
                  <Card
                    title={item.title}
                    subTitle={"Rs." + item.price + "/" + (item.type || "kg")}
                    image={item.image}
                    quantity={item.quantity}
                    style={{
                      margin: 5,
                      height: 300,
                    }}
                    onPressMinus={() => onPressMinus(item)}
                    onPressPlus={() => onPressPlus(item)}
                    count={itemCount[item.title]}
                    type={item.type}
                    price={item.price}
                  />
                );
              }}
              refreshing={refreshing}
              onRefresh={refreshFunction}
            />
          </View>
        )) || (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFunction}
              />
            }
            contentContainerStyle={styles.emptycontainer}
          >
            <MaterialCommunityIcons
              name="timer-sand-empty"
              color={colors.medium}
              size={70}
              style={{ padding: 5 }}
            />
            <AppText style={styles.noselect}>No items</AppText>
          </ScrollView>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  emptycontainer: {
    flex: 1,
    height: "100%",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    //borderTopWidth: 30,
    borderColor: colors.medium,
    backgroundColor: colors.white,
  },
  screen: {
    paddingTop: 5,
    backgroundColor: colors.third,
    flex: 1,
    marginBottom: 49,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    //backgroundColor: colors.light,
  },
  itemInvisible: {
    backgroundColor: "blue",
  },
});

export default ListingsScreen;
