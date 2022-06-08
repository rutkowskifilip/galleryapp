import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import Gallery from "./components/Gallery";
import BigPhoto from "./components/BigPhoto";
import Camera from "./components/Camera";
import Welcome from "./components/Welcome";
const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreLogs(["Remote debugger"]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            title: "Gallery",
            headerStyle: {
              backgroundColor: "salmon",
            },

            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="Photo" component={BigPhoto} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
