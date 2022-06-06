import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Photo", {
              url: this.props.url,
              height: this.props.itemHeight,
              width: this.props.itemWidth,
              id: this.props.id,
            });
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: this.props.url }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
