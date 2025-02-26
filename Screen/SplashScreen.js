import { Image, StyleSheet, View } from "react-native";
import Icon from "../assets/Appikon.png";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={Icon} style={styles.image}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    },
    image: {
    width: 400,
    height: 400,
    resizeMode: "cover",
    },
});
