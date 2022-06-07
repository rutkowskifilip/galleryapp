import React, { Component } from "react";

import { View, Text, Button, FlatList, Dimensions, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { TouchableOpacity } from "react-native-web";
import Icon from "react-native-vector-icons/AntDesign";
import Position from "react-native/Libraries/Components/Touchable/Position";

export default class BigPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: 0, // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back, // typ kamery
    };
  }
  camera;
  componentDidMount = () => {
    this.camera();
  };
  camera = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == "granted" });
  };
  render() {
    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == 0) {
      return <View />;
    } else if (hasCameraPermission == false) {
      return <Text>brak dostępu do kamery</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={(ref) => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                bottom: 10,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text
                style={{
                  backgroundColor: "gray",
                  borderRadius: 40,
                  opacity: 0.75,
                  height: 80,
                  width: 80,
                  overflow: "hidden",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                <Icon
                  name={"swap"}
                  size={40}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}
                />
              </Text>
              <Text
                style={{
                  overflow: "hidden",
                  textAlign: "center",
                  backgroundColor: "gray",
                  opacity: 0.75,
                  borderRadius: 50,
                  padding: 20,
                  width: 100,
                  height: 100,
                }}
              >
                <Icon
                  name={"camera"}
                  size={60}
                  onPress={async () => {
                    try {
                      if (this.camera) {
                        let foto = await this.camera.takePictureAsync();
                        let asset = await MediaLibrary.createAssetAsync(
                          foto.uri
                        ); // domyślnie zapisuje w folderze DCIM
                        //alert(JSON.stringify(asset, null, 4));
                        this.props.navigation.navigate("Photo", {
                          url: asset.uri,
                          height: asset.height,
                          width: asset.width,
                          id: asset.id,
                        });
                      } else {
                        alert("something gone wrong");
                      }
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                />
              </Text>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
