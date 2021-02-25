import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import * as Yup from "yup";
import * as Updates from "expo-updates";
import RNRestart from "react-native-restart";

import { Form, FormField, SubmitButton } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import colors from "../config/colors";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  price: Yup.number().required().label("Price"),
  quantity: Yup.number().required().label("quantity"),
  type: Yup.string().required().label("type"),
  images: Yup.string().required().label("Image"),
});

function AddItem() {
  const [status, setstatus] = useState(0);
  const [show, setShow] = useState(false);
  const reload = async () => await Updates.reloadAsync();
  const Submit = (det) => {
    setShow(true);
    fetch("http://13.233.149.39:8080/additem", {
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
        if (value.sta === "Item added") Alert.alert("Info", "Item Added");
        setShow(false);
        reload();
      });
  };
  return (
    <ScrollView>
      <View
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          borderTopWidth: 1,
        }}
      >
        <AppText
          style={{
            fontSize: 25,
            color: colors.white,
          }}
        >
          Add Item
        </AppText>
      </View>
      <Form
        initialValues={{
          name: "",
          price: "",
          images: [],
          quantity: "",
          type: "",
        }}
        onSubmit={(values, { resetForm }) => {
          Submit(values);
        }}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField icon="currency-inr" name="price" placeholder="Price" />
        <FormField
          icon="scale-balance"
          name="quantity"
          placeholder="Min quantity"
        />
        <FormField
          autoCorrect={false}
          icon="help"
          name="type"
          placeholder="Type of quantity(kg)"
        />
        <SubmitButton title="Add item" show={show} />
      </Form>
    </ScrollView>
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
    width: 200,
    height: 130,
    alignSelf: "center",
  },
  headline: {
    fontSize: 25,
    fontWeight: "600",
  },
});

export default AddItem;
