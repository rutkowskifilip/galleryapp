import React, { Component } from "react";
import { View, Text, Button, FlatList, Dimensions } from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";
import { Picker } from "@react-native-picker/picker";

import FotoItem from "./FotoItem";
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      numColumns: 3,
      photos: [],
      photoloaded: false,
      display: "grid",
    };
  }
  componentDidMount = () => {
    this.getFont();
    this.funkcja = this.props.navigation.addListener("focus", () => {
      // ta funkcja wykona się za każdym razem kiedy ekran zostanie przywrócony
      this.getPhotos();
    });
    this.getPhotos();
  };
  componentWillUnmount() {
    this.funkcja();
  }
  getFont = async () => {
    await Font.loadAsync({
      myfont: require("../assets/font.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    this.setState({ fontloaded: true });
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("brak uprawnień do czytania image-ów z galerii");
    }
  };
  getPhotos = async () => {
    this.obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });
    this.setState({ photos: this.obj.assets });
    //this.setState({ photoloaded: true });
    //alert(JSON.stringify(this.obj.assets, null, 4));
  };

  render() {
    return (
      <View>
        {this.state.fontloaded ? (
          <View>
            <Picker
              style={{}}
              selectedValue={this.state.display}
              onValueChange={(text) => {
                this.setState({ display: text });
              }}
            >
              <Picker.Item label="Grid" value="grid" />
              <Picker.Item label="List" value="list" />
            </Picker>

            <FlatList
              numColumns={this.state.numColumns}
              //key={this.state.numColumns}
              data={this.state.photos}
              renderItem={({ item }) => (
                <FotoItem
                  width={
                    this.state.display === "grid"
                      ? Dimensions.get("window").width / 3
                      : Dimensions.get("window").width
                  }
                  height={
                    this.state.display === "grid"
                      ? Dimensions.get("window").height / 6
                      : Dimensions.get("window").height / 2
                  }
                  itemHeight={item.height}
                  itemWidth={item.width}
                  navigation={this.props.navigation}
                  url={item.uri}
                  id={item.id}
                />
              )}
            />
          </View>
        ) : (
          <Text>Wait...(font)</Text>
        )}
      </View>
    );
  }
}
