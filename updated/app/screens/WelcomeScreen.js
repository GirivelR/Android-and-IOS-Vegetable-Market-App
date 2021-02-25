import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Button from "../components/Button";
import routes from "../navigation/routes";
import colors from "../config/colors";
import AppText from "../components/Text";

function WelcomeScreen({ navigation }) {
  const techotron = async () => {
    const support = await Linking.canOpenURL("https://techotron.in/");
    if (support) {
      await Linking.openURL("https://techotron.in/");
    }
  };
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Buy what you want</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 5,
    color: colors.secondary,
  },
});

export default WelcomeScreen;
