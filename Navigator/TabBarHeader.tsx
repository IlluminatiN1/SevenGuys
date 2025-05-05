import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

export default function TabBarHeader(props: MaterialTopTabBarProps) {
  const { routes, index } = props.state;
  const currentScreen = routes[index];
  const nextScreen = routes[index + 1];
  const prevScreen = routes[index - 1];

  const screenTitles: { [key: string]: string } = {
    Today: "Idag",
    ThisWeek: "Denna veckan",
    LastMonth: "Förra månaden",
  };

  return (
    <View style={style.headerContainer}>
      <View style={style.headerTitleContainer}>
        <IconButton
          icon="account"
          style={style.profileIcon}
          onPress={() => props.navigation.navigate("Profile")}
        />
        <Text style={style.headerTitle}>Hushållet</Text>
      </View>
      <View style={style.subHeaderContainer}>
        <IconButton
          icon="chevron-left"
          size={20}
          onPress={() =>
            prevScreen && props.navigation.navigate(prevScreen.name)
          }
          disabled={!prevScreen}
        />
        <Text style={style.subHeaderTitle}>
          {screenTitles[currentScreen.name]}
        </Text>
        <IconButton
          icon="chevron-right"
          size={20}
          onPress={() =>
            nextScreen && props.navigation.navigate(nextScreen.name)
          }
          disabled={!nextScreen}
        />
      </View>
    </View>
  );
}

export const style = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    position: "absolute",
    left: 0,
    marginLeft: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
