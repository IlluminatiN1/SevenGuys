import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import RootStackNavigator from "./Navigator/RootStackNavigator";

// const theme = {};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
