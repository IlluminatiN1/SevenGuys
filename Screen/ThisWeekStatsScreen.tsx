import React from "react";
import { StyleSheet, View } from "react-native";
import ThisWeekTotalStatsComponent from "../components/stats/ThisWeekStatsComponent";
import ThisWeekIndividualTaskStatComponent from "../components/stats/ThisWeekStatsIndividualComponent";

export default function LastWeekStatsScreen() {
  return (
    <View style={style.container}>
      <ThisWeekTotalStatsComponent />
      <ThisWeekIndividualTaskStatComponent />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});