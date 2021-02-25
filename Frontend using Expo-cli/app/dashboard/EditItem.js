import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import * as Updates from "expo-updates";

import { Form, FormField, SubmitButton } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import AppText from "../components/Text";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  price: Yup.number().required().label("Price"),
});

function EditItem({ route }) {
  const [status, setstatus] = useState(0);
  const [show, setShow] = useState(false);
  const item = route.params;

  const reload = async () => await Updates.reloadAsync();

  const Submit = (det) => {
    setShow(true);
    item.price = det.price;

    fetch("http://13.233.149.39:8080/edititem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: item,
        pdetails: item.id,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        setstatus(value.sta);
        setShow(false);
      });
    reload();
  };
  return (
    <ScrollView>
      <AppText
        style={{
          alignSelf: "center",
          padding: 20,
          color: colors.secondary,
          fontSize: 22,
        }}
      >
        Edit the price of {item.title}
      </AppText>
      <Form
        initialValues={{
          price: item.price,
        }}
        onSubmit={(values) => Submit(values)}
        validationSchema={validationSchema}
      >
        <FormField
          icon="currency-inr"
          name="price"
          placeholder={item.price.toString()}
        />

        <SubmitButton title="Edit price" show={show} />
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

export default EditItem;
