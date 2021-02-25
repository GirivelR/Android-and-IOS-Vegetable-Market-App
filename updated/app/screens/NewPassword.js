import { reloadAsync } from "expo-updates";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import * as Updates from "expo-updates";

import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";
import colors from "../config/colors";
import AuthNavigator from "../navigation/AuthNavigator";

const validationSchema = Yup.object().shape({
  new: Yup.string().required().min(4).label("New Password"),
  confirm: Yup.string().required().min(4).label("Confirm Password"),
});

function NewPassword(props) {
  const [status, setstatus] = useState(0);
  const [show, setShow] = useState(false);
  const reload = async () => await Updates.reloadAsync();
  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/newpassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: det,
        email: props.email,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        setstatus(value.sta);
        if (status != 0 || status != "Invalid user name or password") reload();
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
            <Text style={styles.headline}>New password</Text>
            {status != 0 && <Text style={styles.status}>{status}</Text>}
          </View>
          <Form
            initialValues={{ new: "", confirm: "" }}
            onSubmit={(values) => Submit(values)}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="new"
              placeholder="New password"
              secureTextEntry
              textContentType="password"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="confirm"
              placeholder="Confirm Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Send" show={show} />
          </Form>
        </>
      ) : (
        <AuthNavigator />
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

export default NewPassword;
