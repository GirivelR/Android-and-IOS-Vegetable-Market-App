import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";
import FormImagePicker from "../components/forms/FormImagePicker";
import RegistrationCode from "./RegistrationCode";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(10).max(10).label("Phone Number"),
  password: Yup.string().required().min(4).label("Password"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function RegisterScreen() {
  const [status, setStatus] = useState(0);
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);

  const Scode = (det) => {
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
        setEmail(value.sta);
        setShow(false);
      });
  };

  const Submit = (det) => {
    fetch("http://13.233.149.39:8080/register", {
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
        setStatus(value.sta);
        setEmail(value.email);
      })
      .then(Scode(det));
  };

  return (
    <>
      {status === 0 || status === "Email Id already exits" ? (
        <ScrollView style={{ marginBottom: 20 }}>
          <View style={styles.headContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo-red.png")}
            />
            <Text style={styles.headline}>REGISTER</Text>
            {status != 0 && <Text style={styles.status}>{status}</Text>}
          </View>
          <Form
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              images: [],
            }}
            onSubmit={Submit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="phone"
              keyboardType="number-pad"
              name="phone"
              placeholder="Phone"
              textContentType="number"
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
            <FormField
              autoCorrect={false}
              icon="application"
              name="shopaddress"
              placeholder="Shop Address"
            />
            <SubmitButton title="Register" show={show} />
          </Form>
        </ScrollView>
      ) : (
        <RegistrationCode email={email} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imagesAlign: {
    justifyContent: "center",
    alignItems: "center",
  },
  headContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 130,
    alignSelf: "center",
  },
  headline: {
    fontSize: 25,
    fontWeight: "600",
    color: colors.secondary,
  },
  status: {
    fontSize: 15,
    fontWeight: "600",
    color: "red",
  },
});

export default RegisterScreen;
