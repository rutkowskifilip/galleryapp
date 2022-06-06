import React, { Component } from "react";
import { View, Text, Button, FlatList, Image } from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Image
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
          source={{ uri: this.props.url }}
        />
      </View>
    );
  }
}
