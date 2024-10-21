import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { IconButton } from "react-native-paper";
import ChoresScreen from "../Screen/ChoresScreen";
import CreateHouseholdScreen from "../Screen/CreateHouseholdScreen";
import EditChoreScreen from "../Screen/EditChoreScreen";
import HouseholdListScreen from "../Screen/HouseholdListScreen";
import LogInScreen from "../Screen/LogInScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import RegisterUserScreen from "../Screen/RegisterUserScreen";
import TabNavigator, { TabParamList } from "./TabNavigator";

export type RootStackParamList = {
  Profile: undefined;
  Chores: undefined;
  LogIn: undefined;
  RegisterUser: undefined;
  EditChores: undefined;
  CreateHousehold: undefined;
  HomeNavigator: NavigatorScreenParams<TabParamList>;
  HouseholdList: undefined;
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
      <RootStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
      <RootStack.Screen name="LogIn" component={LogInScreen} />
      <RootStack.Screen name="Chores" component={ChoresScreen} />
      <RootStack.Screen name="RegisterUser" component={RegisterUserScreen} />
      <RootStack.Screen name="EditChores" component={EditChoreScreen} />
      <RootStack.Screen
        name="CreateHousehold"
        component={CreateHouseholdScreen}
        options={{ title: "Skapa nytt Hushåll" }}
      />
      <RootStack.Screen name="HouseholdList" component={HouseholdListScreen} />
      <RootStack.Screen name="HomeNavigator" component={TabNavigator} />
    </RootStack.Navigator>
  );
}

const ArrowLeftComponent = () => <IconButton icon="arrow-left" size={20} />;
