import React, { Component } from "react";
import { View, Text, Button, FlatList, Dimensions } from "react-native";
import * as Font from "expo-font";
import * as MediaLibrary from "expo-media-library";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import FotoItem from "./FotoItem";
import { TouchableOpacity } from "react-native-web";
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      numColumns: 3,
      photos: [],
      photoloaded: false,
      display: "grid",
      displayIcons: false,
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
  selectedPhotos = [];
  handleSelect = (id) => {
    //alert(id);
    if (this.selectedPhotos.includes(id)) {
      newTab = [];
      for (let i = 0; i < this.selectedPhotos.length; i++)
        if (this.selectedPhotos[i] != id) newTab.push(this.selectedPhotos[i]);

      this.selectedPhotos = newTab;
    } else {
      this.selectedPhotos.push(id);
    }
    if (this.selectedPhotos.length > 0) {
      this.setState({ displayIcons: true });
    } else {
      this.setState({ displayIcons: false });
    }
  };
  render() {
    return (
      <View>
        {this.state.fontloaded ? (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                <Icon
                  name={this.state.display == "list" ? "align-justify" : "grid"}
                  size={40}
                  onPress={() => {
                    if (this.state.display == "grid") {
                      this.setState({ display: "list" });
                      this.setState({ numColumns: 1 });
                    } else {
                      this.setState({ display: "grid" });
                      this.setState({ numColumns: 3 });
                    }
                  }}
                />
              </Text>
              <Text style={{ textAlign: "center" }}>
                <Icon
                  name={"camera"}
                  size={40}
                  onPress={() => {
                    this.props.navigation.navigate("Camera");
                  }}
                />
              </Text>
              {this.state.displayIcons ? (
                <View
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    <Icon2
                      name={"clear"}
                      size={40}
                      onPress={async () => {
                        this.selectedPhotos.forEach(async (ele) => {
                          await MediaLibrary.deleteAssetsAsync(ele);
                        });
                        this.getPhotos();
                      }}
                    />
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    <Icon2
                      name={"ios-share"}
                      size={40}
                      onPress={() => {
                        this.props.navigation.navigate("Camera");
                      }}
                    />
                  </Text>
                </View>
              ) : null}
            </View>
            <FlatList
              numColumns={this.state.numColumns}
              key={this.state.numColumns}
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
                      : Dimensions.get("window").height / 4
                  }
                  select={this.handleSelect}
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
