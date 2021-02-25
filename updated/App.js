import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AdminNavigator from "./app/navigation/AdminNavigator";
import Screen from "./app/components/Screen";
import AppText from "./app/components/Text";
import { View } from "react-native";
import colors from "./app/config/colors";

export default function App() {
  const [user, setUser] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await SecureStore.getItemAsync("email");

        if (credentials) {
          const myJson = JSON.parse(credentials);
          setUser(myJson.details.email);
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <Screen>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user === "kilocart2020@gmail.com" ? (
          <AdminNavigator />
        ) : user ? (
          <AppNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </Screen>
  );
}
