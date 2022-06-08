import React, { Component } from "react";
import { View, Text, Button, FlatList, Dimensions } from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";

import { TouchableOpacity } from "react-native";
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
    };
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      myfont: require("../assets/font.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });

    this.setState({ fontloaded: true });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
        }}
      >
        {this.state.fontloaded ? (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "salmon",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate("Gallery");
            }}
          >
            <Text
              style={{
                fontFamily: "myfont",
                fontSize: 100,
                color: "white",
                textAlign: "center",
                fontWeight: "700",
                marginBottom: 40,
              }}
            >
              Gallery App
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "white",
                textAlign: "center",
              }}
            >
              show pictures
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "white",
                textAlign: "center",
              }}
            >
              delete photo
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "white",
                textAlign: "center",
              }}
            >
              share photo
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
