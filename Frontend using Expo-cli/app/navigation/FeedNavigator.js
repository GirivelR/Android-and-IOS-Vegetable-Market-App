import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import TransactionScreen from "../screens/TransactionScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    {/*<Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />*/}
    <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
