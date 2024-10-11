import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HouseholdScreen from '../Screen/HouseholdScreen';

export type TabParamList = {
    Household: undefined;
    Today: undefined;
    LastWeekStats: undefined;
    ThisMonthStats: undefined;
    LastMonthStats: undefined;
    ThisYearStats: undefined;
    LastYearStats: undefined;
}
const Tab = createMaterialTopTabNavigator<TabParamList>();
export default function TabNavigator () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Household" component={HouseholdScreen} />
        </Tab.Navigator>
    )
}