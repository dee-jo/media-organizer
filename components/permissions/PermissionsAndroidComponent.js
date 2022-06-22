import React from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "External Storage Permission",
        message:
          "Media Manager needs access to your  " +
          "so you can manage your files.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the ");
    } else {
      console.log(" permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const PermissionsAndroidComponent = () => {
  console.log('in permissions component!');
  return(
    <View >
      <Text>Try permissions</Text>
      <Button title="request permissions" onPress={requestPermission} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default PermissionsAndroidComponent;