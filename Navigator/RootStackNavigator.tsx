import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { auth } from "../config/firebase";
import CreateHouseholdScreen from "../Screen/CreateHouseholdScreen";
import EditChoreScreen from "../Screen/EditChoreScreen";
import LoginScreen from "../Screen/LogInScreen";
import NoHouseholdScreen from "../Screen/NoHouseholdScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import RegisterUserScreen from "../Screen/RegisterUserScreen";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTabTitle } from "../store/tabTitle/tabTitleSelectors";
import { setUser } from "../store/user/userSlice";
import TabNavigator, { TabParamList } from "./TabNavigator";

export type RootStackParamList = {
  Profile: undefined;
  Chores: undefined;
  Login: undefined;
  RegisterUser: undefined;
  EditChore: undefined;
  CreateHousehold: undefined;
  Household: NavigatorScreenParams<TabParamList>;
  NoHousehold: undefined;
  CreateChoreScreen: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  // läser från store
  const user = useAppSelector((state) => state.users.user);
  const tabTitle = useAppSelector(selectTabTitle)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // skriver till store
      dispatch(setUser(user?.toJSON() as User))
    })

    return unsubscribe;
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => <ArrowLeftComponent />,
      }}
    >
      {!user ? (
        <>
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerLeft: () => null }}
          />
          <RootStack.Screen
            name="RegisterUser"
            component={RegisterUserScreen}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "My Profile" }}
          />
          <RootStack.Screen
            name="NoHousehold"
            options={{ title: "" }}
            component={NoHouseholdScreen}
          />
          
          <RootStack.Screen 
          name="Household" 
          component={TabNavigator}
          options={{
            headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Hushållet</Text>
              <View style={styles.subHeaderContainer}>
                <IconButton
                icon="chevron-left"
                size={20}
                />
                <Text style={styles.subHeaderTitle}>{tabTitle}</Text>
                <IconButton
                icon="chevron-right"
                size={20}
                />
              </View>
            </View>
          ),
          headerLeft: () => null
        }} 
          />

          <RootStack.Screen name="EditChore" component={EditChoreScreen} />
          <RootStack.Screen
            name="CreateHousehold"
            component={CreateHouseholdScreen}
            options={{ title: "Skapa nytt Hushåll" }}
          />
        </>
      )}
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

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
