import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";
import LoginScreen from "./LoginScreen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  security: Yup.string().required().min(6).label("Security Code"),
});

function RegistrationCode(props) {
  const [status, setstatus] = useState(0);
  const [show, setShow] = useState(false);

  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/securitycodecheck", {
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
        setShow(false);
      });
  };

  return (
    <>
      {status === 0 || status === "Invalid security code" ? (
        <>
          <View style={styles.headContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo-red.png")}
            />
            <Text style={styles.headline}>Security Code</Text>
            {status != 0 && <Text style={styles.status}>{status}</Text>}
          </View>
          <Form
            initialValues={{ security: "" }}
            onSubmit={(values) => Submit(values)}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              keyboardType="number-pad"
              name="security"
              placeholder="Security code"
              textContentType="security code"
            />
            <SubmitButton title="Send" show={show} />
          </Form>
        </>
      ) : (
        <LoginScreen />
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
    height: 130,
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

export default RegistrationCode;
