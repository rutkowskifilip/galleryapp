import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>
          Screen2 {this.props.route.params.a} {this.props.route.params.b}
        </Text>
        <Button
          title="go to screen1"
          onPress={() => this.props.navigation.navigate("s1")}
        />
      </View>
    );
  }
}
