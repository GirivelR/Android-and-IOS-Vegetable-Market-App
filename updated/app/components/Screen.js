import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <React.Fragment>
      <View style={styles.top}></View>
      <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  screen: {
    //paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  top: {
    width: "100%",
    height: Constants.statusBarHeight,
    color: "black",
    backgroundColor: "#5b9ad0",
  },
});

export default Screen;
