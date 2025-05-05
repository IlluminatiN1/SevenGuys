import React from "react";
import { View } from "react-native";
import ThisWeekTotalStatsComponent from "../components/stats/ThisWeekStatsComponent";
import ThisWeekIndividualTaskStatComponent from "../components/stats/ThisWeekStatsIndividualComponent";

export default function LastWeekStatsScreen() {
  return (
    <View>
      <ThisWeekTotalStatsComponent />
      <ThisWeekIndividualTaskStatComponent />
    </View>
  );
}
