import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChoresScreen from "../Screen/ChoresScreen";
import ChoresStatisticsScreen from "../Screen/ChoresStatisticsScreen";
import HouseholdScreen from "../Screen/HouseholdScreen";

type Period = "this-week" | "prev-week" | "prev-month";

export type TabParamList = {
  MainHousehold: undefined;
  Today: undefined;
  Stats: { period: Period };
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={{
      swipeEnabled: true,
      animationEnabled: true,
    tabBarStyle: {display: "none"},
    }}>
      <Tab.Screen name="MainHousehold" component={HouseholdScreen} />
      <Tab.Screen name="Today" component={ChoresScreen} />
      <Tab.Screen
        name="Stats"
        component={ChoresStatisticsScreen}
        initialParams={{ period: "this-week" }}
      />
    </Tab.Navigator>
  );
}
