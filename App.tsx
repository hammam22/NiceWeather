import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from "./data/redux/main";

import Home from "./data/screens/home";
import pickCity from "./data/screens/pickCity";

const Stack = createStackNavigator();


export default function App() {

  
  return (
    
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Home'
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PickCity" component={pickCity} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
