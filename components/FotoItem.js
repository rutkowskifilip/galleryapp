import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosen: false,
    };
  }
  handleSelect = () => {
    this.props.select(this.props.id);
  };
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
          onLongPress={() => {
            this.handleSelect();
            if (this.state.choosen) {
              this.setState({ choosen: false });
            } else {
              this.setState({ choosen: true });
            }
          }}
        >
          <Image
            style={[
              this.state.choosen
                ? {
                    borderColor: "white",
                    borderWidth: 4,
                    opacity: 0.5,
                  }
                : { borderColor: null, borderWidth: 0, opacity: 1 },
              {
                width: "100%",
                height: "100%",
              },
            ]}
            source={{ uri: this.props.url }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    opacity: 0.75,
    backgroundColor: "darkgray",
  },
});
