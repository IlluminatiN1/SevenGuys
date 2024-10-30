import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import RootStackNavigator from "./Navigator/RootStackNavigator";
import { store } from "./store/store";
import SplashScreen from "./Screen/SplashScreen";
import { useEffect, useState } from "react";

// const theme = {};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Visa splashscreenen i 3 sekunder

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
