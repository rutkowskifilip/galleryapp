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
      <View>
        {this.state.fontloaded ? (
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "salmon" }}
            onPress={() => {
              this.props.navigation.navigate("Gallery");
            }}
          >
            <Text
              style={{
                fontFamily: "myfont",
                fontSize: 100,
              }}
            >
              Gallery App
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
