import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ClapButton from "./components/ClapButton";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ClapButton count={60} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
