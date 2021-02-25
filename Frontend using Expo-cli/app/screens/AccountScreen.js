import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import AuthNavigator from "../navigation/AuthNavigator";
import AppText from "../components/Text";

const whatsApp = async () => {
  const support = await Linking.canOpenURL("https://wa.me/+918807616568");
  if (support) {
    await Linking.openURL("https://wa.me/+918807616568");
  } else {
    Alert.alert("Can't Message now");
  }
};
const techotron = async () => {
  const support = await Linking.canOpenURL("https://techotron.in/");
  if (support) {
    await Linking.openURL("https://techotron.in/");
  }
};

function AccountScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [status, setStatus] = useState(0);
  const menuItems = [
    {
      title: "My Orders",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
      targetScreen: () => {
        navigation.navigate(routes.TRANSACTIONSCREEN);
      },
    },
    {
      title: "My Messages",
      icon: {
        name: "email",
        backgroundColor: colors.secondary,
      },
      targetScreen: whatsApp,
    },
  ];
  const adminItems = [
    {
      title: "Orders",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
      targetScreen: () => {
        navigation.navigate(routes.TRANSACTIONSCREEN);
      },
    },
  ];

  const Logout = async () => {
    try {
      await SecureStore.deleteItemAsync("email");
      await Updates.reloadAsync();
    } catch (error) {}
    setStatus(1);
  };
  useEffect(() => {
    (async () => {
      try {
        const credentials = await SecureStore.getItemAsync("email");

        if (credentials) {
          const myJson = JSON.parse(credentials);
          setEmail(myJson.details.email);
          var emailid = myJson.details.email;
        }
      } catch (e) {}
      fetch("http://13.233.149.39:8080/account", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          details: emailid,
        }),
      })
        .then((res) => res.json())
        .then((value) => {
          setImage(value.image);
          setName("Welcome " + value.name);
        });
    })();
  }, []);

  return (
    <>
      {status === 0 && (
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
              Profile
            </AppText>
          </View>
          <View style={styles.screen}>
            <View style={styles.container}>
              <ListItem
                title={name}
                subTitle={email}
                image={image}
                cheIcon={false}
              />
            </View>
            <View style={styles.container}>
              {email != "kilocart2020@gmail.com" && (
                <FlatList
                  data={menuItems}
                  keyExtractor={(menuItem) => menuItem.title}
                  ItemSeparatorComponent={ListItemSeparator}
                  renderItem={({ item }) => (
                    <ListItem
                      title={item.title}
                      IconComponent={
                        <Icon
                          name={item.icon.name}
                          backgroundColor={item.icon.backgroundColor}
                        />
                      }
                      onPress={item.targetScreen}
                    />
                  )}
                />
              )}
              {email === "kilocart2020@gmail.com" && (
                <FlatList
                  data={adminItems}
                  keyExtractor={(adminItem) => adminItem.title}
                  ItemSeparatorComponent={ListItemSeparator}
                  renderItem={({ item }) => (
                    <ListItem
                      title={item.title}
                      IconComponent={
                        <Icon
                          name={item.icon.name}
                          backgroundColor={item.icon.backgroundColor}
                        />
                      }
                      onPress={item.targetScreen}
                    />
                  )}
                />
              )}
            </View>
            <ListItem
              title="Log Out"
              IconComponent={<Icon name="logout" backgroundColor="red" />}
              onPress={() => {
                Logout();
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.light,
              height: 30,
            }}
          >
            <AppText style={{ fontSize: 15 }}>Developed by </AppText>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={techotron}
            >
              <AppText style={{ fontSize: 15, color: colors.secondary }}>
                Techotron
              </AppText>
              <MaterialCommunityIcons
                color={colors.secondary}
                name="open-in-new"
                size={8}
              />
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
      {status === 1 && <AuthNavigator />}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
