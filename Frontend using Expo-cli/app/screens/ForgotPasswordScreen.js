import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";
import ForgetCode from "./ForgetCode";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen() {
  const [status, setstatus] = useState(0);
  const [show, setShow] = useState(false);

  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/forgotpassword", {
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
      .then((value) => {
        setstatus(value.sta);
      });
    setShow(false);
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
            <Text style={styles.headline}>FORGOT PASSWORD</Text>
            {status != 0 && <Text style={styles.status}>{status}</Text>}
          </View>
          <Form
            initialValues={{ email: "" }}
            onSubmit={(values) => Submit(values)}
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
            <SubmitButton title="Send" show={show} />
          </Form>
        </>
      ) : (
        <ForgetCode email={status} />
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

export default ForgotPasswordScreen;
