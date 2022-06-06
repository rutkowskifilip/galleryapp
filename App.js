import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Screen1}
          options={{
            title: "title",
            headerStyle: {
              backgroundColor: "#ff0000",
            },

            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="s2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
