import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HouseholdScreen from '../Screen/HouseholdScreen';

export type TabParamList = {
    Household: undefined;
    Today: undefined;
    LastWeek: undefined;
    ThisMonth: undefined;
    LastMonth: undefined;
    ThisYear: undefined;
    LastYear: undefined;
}
const Tab = createMaterialTopTabNavigator<TabParamList>();
export default function TabNavigator () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Household" component={HouseholdScreen} />
        </Tab.Navigator>
    )
}