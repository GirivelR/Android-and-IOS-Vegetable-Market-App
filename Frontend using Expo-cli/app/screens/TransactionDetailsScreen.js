import React from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import { ListItemSeparator } from "../components/lists";
import AppText from "../components/Text";

function TransactionDetailsScreen({ route }) {
  const listings = route.params;

  return (
    <View
      style={{
        marginBottom: 49,
      }}
    >
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <ListItem
              title={item.title.toString()}
              subTitle={
                "Rs." +
                item.price.toString() +
                " * " +
                (item.count * item.quantity).toString() +
                (item.type || "kg") +
                " = Rs." +
                (item.total * item.quantity).toString()
              }
              image={item.image}
              cheIcon={false}
              status={item.status}
              item={item}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: colors.light,
              padding: 15,
            }}
          >
            <AppText>Name :{" " + listings[0].name}</AppText>
            <AppText>Email id :{" " + listings[0].email}</AppText>
            <AppText>Phone no :{" " + listings[0].phone}</AppText>
            <AppText>Address :{" " + listings[0].address}</AppText>
            <AppText>
              Order time :
              {" " + listings[0].date + "\nTime : " + listings[0].time}
            </AppText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.third,
    margin: 5,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default TransactionDetailsScreen;
