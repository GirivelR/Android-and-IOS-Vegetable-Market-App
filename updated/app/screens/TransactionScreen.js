import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";
import AppButton from "../components/Button";
import AppText from "../components/Text";

function TransactionScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [email, setEmail] = useState();
  var today = new Date();
  const [showDate, setShowDate] = useState(today);
  const [date, setDate] = useState(
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState({});
  const [okey, setOkey] = useState([]);
  const refreshFunction = () => {
    const datetime = date;
    fetch("http://13.233.149.39:8080/orderdis", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: email,
        datetime: datetime,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        setListings(value.sta);
        setShow(false);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date1) => {
    if (
      date1.getDate() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getFullYear() !==
      date
    ) {
      setShow(true);
    }
    setDate(
      date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()
    );
    hideDatePicker();
    setShowDate(date1);
  };
  const [first, setFirst] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const credentials = await SecureStore.getItemAsync("email");
        if (credentials) {
          const myJson = JSON.parse(credentials);
          var emailid = myJson.details.email;
          setEmail(emailid);
          var datetime = date;
        }
      } catch (e) {}
      fetch("http://13.233.149.39:8080/orderdis", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          details: emailid,
          datetime: datetime,
        }),
      })
        .then((res) => res.json())
        .then((value) => {
          setListings(value.sta);
          setShow(false);
        });
    })();

    setFirst(false);
  }, [date]);

  useEffect(() => {
    let temp = {};
    if (email !== "kilocart2020@gmail.com") {
      for (let i in listings) {
        let x =
          listings[i].date.toString() +
          " - " +
          listings[i].time.toString() +
          "\nemail:" +
          email;
        if (temp.hasOwnProperty(x)) {
          temp[x].total += listings[i].total * listings[i].quantity;
          temp[x].values.push(listings[i]);
        } else {
          temp[x] = {
            id: i,
            title: "You have placed an Order at ",
            total: listings[i].total * listings[i].quantity,
            values: [listings[i]],
            datedel: listings[i].datedel,
          };
        }
      }
    } else {
      for (let i in listings) {
        let x =
          listings[i].date.toString() +
          " - " +
          listings[i].time.toString() +
          "\nemail:" +
          email;
        if (temp.hasOwnProperty(x)) {
          temp[x].total =
            temp[x].total + listings[i].total * listings[i].quantity;
          temp[x].values.push(listings[i]);
        } else {
          temp[x] = {
            id: i,
            title: listings[i].name + " has placed an Order at ",
            total: listings[i].total * listings[i].quantity,
            values: [listings[i]],
            datedel: listings[i].datedel,
          };
        }
      }
    }
    setOkey(Object.keys(temp));
    setOrders(temp);
  }, [listings]);

  const findtotal = (items) => {
    let total = 0;
    for (let item in items) {
      total += items[item].total * items[item].quantity;
    }
    return total;
  };

  const cancelOrder = (item, key) => {
    // console.log(item);

    fetch("http://13.233.149.39:8080/orderdet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: item,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        if (value.sta === 1) {
          let te = listings;
          for (let t in item) {
            te.filter((i) => i !== item[t]);
          }
          setListings(te);
          Alert.alert("Info", "Order Canceled");
        } else {
          Alert.alert("Alert", "Cannot delete now!");
        }
      });
  };

  return (
    <React.Fragment>
      {email === "kilocart2020@gmail.com" && (
        <React.Fragment>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Select a date :</Text>
            <AppButton
              title={date.toString()}
              onPress={showDatePicker}
              color="secondary"
              otherstyles={{ width: "45%", padding: 5 }}
              show={show}
              size="small"
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={today}
              date={showDate}
            />
          </View>
          <AppText
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: colors.primary,
              borderBottomWidth: 1,
            }}
          >
            Total Sales Amount:{" Rs." + findtotal(listings)}
          </AppText>
        </React.Fragment>
      )}

      {(first && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ flex: 1 }}
        />
      )) ||
        ((!listings || listings.length === 0) && (
          <React.Fragment>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshFunction}
                />
              }
              contentContainerStyle={{
                flex: 1,
                marginBottom: 49,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.medium,
              }}
            >
              <MaterialCommunityIcons
                name="file-document-box-remove-outline"
                color={colors.medium}
                size={70}
                style={{ padding: 5 }}
              />
              <AppText style={styles.noselect}>No items Ordered Yet!</AppText>
            </ScrollView>
          </React.Fragment>
        )) || (
          <React.Fragment>
            <View
              style={{
                flex: 1,
                marginBottom: 50,
                borderBottomWidth: 0.5,
              }}
            >
              {email !== "kilocart2020@gmail.com" && (
                <AppText
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: colors.primary,
                    borderBottomWidth: 1,
                  }}
                >
                  Total Amount Spent:{" Rs." + findtotal(listings)}
                </AppText>
              )}
              <FlatList
                data={okey}
                keyExtractor={(listing) => orders[listing].id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.container}>
                    <ListItem
                      title={orders[item].title + item}
                      subTitle={"Order Amount: Rs." + orders[item].total}
                      status={item.status}
                      today={today}
                      deleteIcon={email !== "kilocart2020@gmail.com"}
                      item={orders[item].values}
                      key1={item}
                      cancelOrder={cancelOrder}
                      datedel={orders[item].datedel}
                      onPress={() =>
                        navigation.navigate(
                          "TransactionDetailsScreen",
                          orders[item].values
                        )
                      }
                    />
                  </View>
                )}
                refreshing={refreshing}
                onRefresh={refreshFunction}
                ItemSeparatorComponent={ListItemSeparator}
              />
            </View>
          </React.Fragment>
        )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.third,
    margin: 5,
    borderRadius: 10,
  },
  screen: {
    backgroundColor: colors.white,
  },
  headline: {
    fontSize: 21,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
  },
});

export default TransactionScreen;
