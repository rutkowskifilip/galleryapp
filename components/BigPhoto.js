import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, Button, FlatList, Dimensions, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
export default class BigPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  share = async () => {
    try {
      await Sharing.shareAsync(
        "file://" + this.props.route.params.url.slice(5)
      );
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    console.log(this.props.route.params.url);
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          // resizeMode={"cover"}
          style={{
            width: "100%",
            height:
              this.props.route.params.height *
              (Dimensions.get("window").width / this.props.route.params.width),
          }}
          source={{ uri: this.props.route.params.url }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            height: 60,
          }}
        >
          <Text style={{ width: "50%", textAlign: "center" }}>
            <Icon
              name={"clear"}
              size={30}
              onPress={async () => {
                await MediaLibrary.deleteAssetsAsync(
                  this.props.route.params.id
                );
                this.props.navigation.goBack();
              }}
            />
          </Text>

          <Text style={{ width: "50%", textAlign: "center" }}>
            <Icon
              name={"ios-share"}
              size={30}
              onPress={async () => {
                this.share();
              }}
            />
          </Text>
        </View>
      </View>
    );
  }
}
