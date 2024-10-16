import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChoresScreen from "../Screen/ChoresScreen";
import ChoresStatisticsScreen from "../Screen/ChoresStatisticsScreen";
import HouseholdScreen from "../Screen/HouseholdScreen";

type Period = "this-week" | "prev-week" | "prev-month";

export type TabParamList = {
  Household: undefined;
  Today: undefined;
  Stats: { period: Period };
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Household" component={HouseholdScreen} />
      <Tab.Screen name="Today" component={ChoresScreen} />
      <Tab.Screen
        name="Stats"
        component={ChoresStatisticsScreen}
        initialParams={{ period: "this-week" }}
      />
      <Tab.Screen
        name="Stats"
        component={ChoresStatisticsScreen}
        initialParams={{ period: "prev-week" }}
      />
      <Tab.Screen
        name="Stats"
        component={ChoresStatisticsScreen}
        initialParams={{ period: "prev-month" }}
      />
    </Tab.Navigator>
  );
}
