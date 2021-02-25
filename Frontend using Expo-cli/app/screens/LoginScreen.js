import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";

import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";
import ForgotPassword from "../components/ForgotPassword";
import AppNavigator from "../navigation/AppNavigator";
import routes from "../navigation/routes";
import AdminNavigator from "../navigation/AdminNavigator";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [status, setstatus] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const storeToken = async (values) => {
    try {
      await SecureStore.setItemAsync(
        "email",
        JSON.stringify({ details: values })
      );
    } catch (error) {}
  };

  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: det,
      }),
    })
      .then((res) => res.json())
      .then(async (value) => {
        setstatus(value.sta);
        if (status !== "Invalid user name or password") {
          storeToken(det);
        }
        setShow(false);
      });
  };

  return (
    <>
      {status === 0 || status === "Invalid user name or password" ? (
        <>
          <View style={styles.headContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo-red.png")}
            />
            <Text style={styles.headline}>LOGIN</Text>
            {status != 0 && <Text style={styles.status}>{status}</Text>}
          </View>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, email, password) => {
              Submit(values), setEmail(email), setPassword(password);
            }}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="email"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Login" show={show} />
          </Form>
          <ForgotPassword
            title="Forgot Password?"
            color="white"
            onPress={() => navigation.navigate(routes.FORGOTPASSWORDSCREEN)}
          />
        </>
      ) : (
        <>{status === "admin" ? <AdminNavigator /> : <AppNavigator />}</>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 10,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 150,
    alignSelf: "center",
  },
  headContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  headline: {
    fontSize: 25,
    fontWeight: "600",
    color: colors.secondary,
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontSize: 15,
    fontWeight: "600",
    color: "red",
  },
});

export default LoginScreen;
