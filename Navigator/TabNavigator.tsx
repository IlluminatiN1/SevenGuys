import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HouseholdScreen from "../Screen/HouseholdScreen";
import LastMonthStatsScreen from "../Screen/LastMonthStatsScreen";
import LastWeekStatsScreen from "../Screen/LastWeekStatsScreen";
import { useAppDispatch } from "../store/hooks";
import { setTabTitle } from "../store/tabTitle/tabTitleActions";

type Period = "this-week" | "prev-week" | "prev-month";

export type TabParamList = {
  MainHousehold: undefined;
  Today: undefined;
  Stats: { period: Period };
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

export default function TabNavigator() {
  const dispatch = useAppDispatch();
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: { display: "none" },
      }}
      screenListeners={{
        state: (e) => {
          const routeName = e.data.state?.routeNames[e.data.state.index];
          switch (routeName) {
            case "MainHousehold":
              dispatch(setTabTitle("Idag"));
              break;
            case "Today":
              dispatch(setTabTitle("Förra veckan"));
              break;
            case "Stats":
              dispatch(setTabTitle("Senaste månaden"));
              break;
            default:
              dispatch(setTabTitle("Idag"));
          }
        },
      }}
    >
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
