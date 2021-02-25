import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import AppText from "../../app/components/Text";
import colors from "../../app/config/colors";
import DbIn from "../components/DbIn";
import AddItem from "../dashboard/AddItem";
import EditItem from "../dashboard/EditItem";

// function DashBoard({ navigation }) {
// const [items, setListings] = useState([]);
// const [show, setShow] = useState(false);

// const refreshFunction = async (det) => {
//   fetch("http://13.233.149.39:8080/listings", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       details: det,
//     }),
//   })
//     .then((res) => res.json())
//     .then((value) => {
//       setListings(value.sta);
//     });
// };

// useEffect((det) => {
//   refreshFunction(det);
//   setShow(false);
// }, []);
// return {
//     /*<React.Fragment>
//      <TouchableOpacity
//         style={{
//           alignItems: "center",
//           padding: 10,
//           paddingVertical: 20,
//         }}
//         onPress={() => setShow(true)}
//       >
//         <View style={styles.add_box}>
//           <MaterialCommunityIcons color={colors.medium} name="plus" size={30} />
//           <AppText>Add an Item</AppText>
//         </View>
//       </TouchableOpacity>
//       <DbIn
//         items={items}
//         refreshFunction={refreshFunction}
//         onEdit={({ itemdata }) => {
//           navigation.push("EditItem", itemdata);
//         }}
//       />
//     </React.Fragment>*/
//   };
// }

const Stack = createStackNavigator();

const DashBoardNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTitleStyle: { color: colors.light },
    }}
  >
    <Stack.Screen
      name="DashBoard"
      component={DbIn}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EditItem" component={EditItem} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  add_box: {
    //flexDirection: "row",
    paddingVertical: 3,
    width: "90%",
    borderColor: colors.medium,
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },
  container: {
    height: "93%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    //borderTopWidth: 30,
    borderColor: colors.medium,
    backgroundColor: colors.white,
  },
  noselect: {
    color: "black",
  },
});
export default DashBoardNavigator;
