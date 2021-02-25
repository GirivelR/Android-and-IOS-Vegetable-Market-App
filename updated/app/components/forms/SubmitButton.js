import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, show }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} show={show} />;
}

export default SubmitButton;
