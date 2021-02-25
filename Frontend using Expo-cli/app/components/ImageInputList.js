import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();
  const [status, setStatus] = useState(1);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris &&
            imageUris.map((uri) => (
              <View key={uri[1]} style={styles.image}>
                <ImageInput
                  imageUri={uri}
                  onChangeImage={() => {
                    onRemoveImage(uri), setStatus(1);
                  }}
                />
              </View>
            ))}
          {status === 1 && (
            <ImageInput
              onChangeImage={(uri) => {
                onAddImage(uri), setStatus(0);
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
