import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdScreen from "../Screen/HouseholdScreen";
import LastMonthStatsScreen from "../Screen/LastMonthStatsScreen";
import LastWeekStatsScreen from "../Screen/LastWeekStatsScreen";

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
      <Tab.Screen 
      name="MainHousehold" 
      component={HouseholdScreen} 
      />

      <Tab.Screen 
      name="Today" 
      component={LastWeekStatsScreen} 
      />

      <Tab.Screen
        name="Stats"
        component={LastMonthStatsScreen}
        initialParams={{ period: "this-week" }}
      />

    </Tab.Navigator>
  );
}
