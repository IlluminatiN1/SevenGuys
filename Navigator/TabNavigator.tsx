import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdScreen from "../Screen/HouseholdScreen";
import LastMonthStatsScreen from "../Screen/LastMonthStatsScreen";
import LastWeekStatsScreen from "../Screen/ThisWeekStatsScreen";
import TabBarHeader from "./TabBarHeader";

export type TabParamList = {
  Today: undefined;
  ThisWeek: undefined;
  LastMonth: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={TabBarHeader}>
      <Tab.Screen name="Today" component={HouseholdScreen} />

      <Tab.Screen name={"ThisWeek"} component={LastWeekStatsScreen} />

      <Tab.Screen name="LastMonth" component={LastMonthStatsScreen} />
    </Tab.Navigator>
  );
}
