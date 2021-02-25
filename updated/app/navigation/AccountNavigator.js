import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import TransactionScreen from "../screens/TransactionScreen";
import colors from "../config/colors";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTitleStyle: { color: colors.light },
    }}
  >
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="TransactionScreen"
      component={TransactionScreen}
      options={{ headerTitle: "Orders" }}
    />
    <Stack.Screen
      name="TransactionDetailsScreen"
      component={TransactionDetailsScreen}
      options={{ headerTitle: "Order Details" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
