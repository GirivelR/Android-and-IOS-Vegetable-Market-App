import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

import AppText from "../components/Text";
import colors from "../config/colors";
import {
  ListItemCart,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import AppButton from "../components/Button";

function CartSection({
  items,
  onPressPlus,
  onPressMinus,
  setitems,
  setItemCount,
  itemCount,
}) {
  const [status, setstatus] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);

  // const reload = async () => await Updates.reloadAsync();

  useEffect(() => {
    let t = 0;
    for (let item in items) {
      t += items[item].price * items[item].count * items[item].quantity;
    }
    setTotal(t);
  }, [items]);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await SecureStore.getItemAsync("email");
        if (credentials) {
          const myJson = JSON.parse(credentials);
          setEmail(myJson.details.email);
        }
      } catch (e) {}
    })();
  }, []);

  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: det,
        email: email,
      }),
    }).then(() => {
      setShow(false);
      setitems([]);
      setItemCount({});
      Alert.alert("Info", "Order Confirmed");
    });
  };
  // for (let i in items) {
  //   for (let j in items[i]) {
  //     if (j !== "image") {
  //       console.log(j, items[i][j]);
  //     }
  //   }
  // }
  return (
    ((!items || items.length === 0) && (
      <React.Fragment>
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
              color: colors.white,
            }}
          >
            Cart
          </AppText>
        </View>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="cart-off"
            color={colors.medium}
            size={70}
            style={{ padding: 5 }}
          />
          <AppText style={styles.noselect}>No items Selected!</AppText>
          <AppText style={styles.noselect}>Cart Empty</AppText>
          <AppText style={styles.noselect}>Please Select and come back</AppText>
        </View>
      </React.Fragment>
    )) || (
      <React.Fragment>
        <View
          style={{
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
          }}
        >
          <AppText
            style={{
              fontSize: 25,
              color: colors.white,
            }}
          >
            Cart
          </AppText>
        </View>
        <View style={[styles.container1, { paddingTop: 10 }]}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItemCart
                itemdata={item}
                title={item.title}
                subTitle={item.price}
                image={item.image}
                quantity={item.quantity}
                onPressPlus={onPressPlus}
                onPressMinus={onPressMinus}
                renderRightActions={() => (
                  <ListItemDeleteAction
                    onPress={() => {
                      setitems(items.filter((item1) => item1 != item));
                      let t = itemCount;
                      delete t[item.title];
                      setItemCount(t);
                    }}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderWidth: 1,
              borderRadius: 20,
              width: "90%",
              alignSelf: "center",
              margin: 10,
              backgroundColor: "#EAEAEA",
            }}
          >
            <AppText
              style={{
                fontSize: 25,
                color: colors.secondary,
              }}
            >
              Total Price:
            </AppText>
            <View
              style={{ height: "100%", width: 1, backgroundColor: "white" }}
            ></View>
            <AppText
              style={{
                fontSize: 25,
                color: "#1A8600",
              }}
            >
              Rs.{total}/-
            </AppText>
          </View>
          <AppButton
            title={"Confirm booking"}
            onPress={(email) => {
              Submit(items, email);
            }}
            show={show}
          />
        </View>
      </React.Fragment>
    )
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
    backgroundColor: colors.light,
  },
  container1: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: "#E8E8E8",
  },
  noselect: {
    color: "black",
  },
});
export default CartSection;
