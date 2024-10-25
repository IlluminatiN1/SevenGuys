import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { IconButton } from "react-native-paper";
import ChoresScreen from "../Screen/ChoresScreen";
import CreateHouseholdScreen from "../Screen/CreateHouseholdScreen";
import EditChoreScreen from "../Screen/EditChoreScreen";
import HouseholdScreen from "../Screen/HouseholdScreen";
import LoginScreen from "../Screen/LogInScreen";
import NoHouseholdScreen from "../Screen/NoHouseholdScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import RegisterUserScreen from "../Screen/RegisterUserScreen";
import TabNavigator, { TabParamList } from "./TabNavigator";

export type RootStackParamList = {
  Profile: undefined;
  Chores: undefined;
  Login: undefined;
  RegisterUser: undefined;
  EditChore: undefined;
  CreateHousehold: undefined;
  HomeNavigator: NavigatorScreenParams<TabParamList>;
  Household: undefined;
  NoHousehold: undefined;
  CreateChoreScreen: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => <ArrowLeftComponent />,
      }}
    >
      <RootStack.Screen name="EditChore" component={EditChoreScreen} />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerLeft: () => null }}
      />
      <RootStack.Screen
        name="NoHousehold"
        options={{ title: "" }}
        component={NoHouseholdScreen}
      />
      <RootStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
      <RootStack.Screen name="RegisterUser" component={RegisterUserScreen} />
      <RootStack.Screen name="Household" component={HouseholdScreen} />
      <RootStack.Screen name="Chores" component={ChoresScreen} />
      <RootStack.Screen
        name="CreateHousehold"
        component={CreateHouseholdScreen}
        options={{ title: "Skapa nytt Hushåll" }}
      />
      <RootStack.Screen name="HomeNavigator" component={TabNavigator} />
    </RootStack.Navigator>
  );
}

function ArrowLeftComponent() {
  const navigation = useNavigation();

  return (
    <IconButton
      icon="arrow-left"
      onPress={() => navigation.goBack()}
      size={20}
    />
  );
}
