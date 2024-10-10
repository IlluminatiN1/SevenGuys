import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator, { TabParamList } from "./TabNavigator";

export type RootStackParamList = {
    HomeNavigator: NavigatorScreenParams<TabParamList>;
};
export const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
            name="HomeNavigator"
            component={TabNavigator}/>
        </RootStack.Navigator>
    )
}