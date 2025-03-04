import React from "react";
import { View } from "react-native";
import LastWeekTotalStatsComponent from "../components/stats/LastWeekStatsComponent";
import LastWeekIndividualTaskStatComponent from "../components/stats/LastWeekStatsIndividualComponent";

export default function LastWeekStatsScreen() {
  return (
    <View>
      <LastWeekTotalStatsComponent />
      <LastWeekIndividualTaskStatComponent/>
    </View>
  );
}

