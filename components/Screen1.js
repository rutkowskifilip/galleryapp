import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";
export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      numColumns: 3,
      photos: [],
    };
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      myfont: require("../assets/font.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    this.setState({ fontloaded: true });
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("brak uprawnień do czytania image-ów z galerii");
    }
    this.funkcja = this.props.navigation.addListener("focus", () => {
      // ta funkcja wykona się za każdym razem kiedy ekran zostanie przywrócony
      this.getPhotos();
    });
    this.getPhotos;
  };
  componentWillUnmount() {
    this.funkcja();
  }

  getPhotos = async () => {
    this.obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });
    this.setState({ photos: this.obj });
    //alert(JSON.stringify(this.obj.assets, null, 4));
  };

  render() {
    return (
      <View>
        {this.state.fontloaded ? (
          <View>
            <Text>Gallery</Text>
            <FlatList
              numColumns={this.state.numColumns}
              key={this.state.numColumns}
              data={this.state.photos}
              renderItem={({ item }) => (
                <FotoItem
                  widht={item.width}
                  height={item.height}
                  url={item.uri}
                />
              )}
            />
          </View>
        ) : null}
        <Button title="o" onPress={this.getPhotos} />
      </View>
    );
  }
}
