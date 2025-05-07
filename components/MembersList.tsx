import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchMembersByUserId } from "../store/member/memberActions";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicatorComponent,
} from "react-native";
import { Member } from "../data/data";
import { auth } from "../config/firebase";

interface MembersListProps {
  members?: Member[];
}

const MembersList: React.FC<MembersListProps> = ({ members: propMembers }) => {
  const dispatch: AppDispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
  const loading = useSelector((state: RootState) => state.members.loading);
  const error = useSelector((state: RootState) => state.members.error);

  useEffect(() => {
    if (!propMembers) {
      const userId = auth.currentUser?.uid;
      if (userId) {
        dispatch(fetchMembersByUserId(userId));
      }
    }
  }, [dispatch, propMembers]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicatorComponent size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const data = propMembers || members;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member List</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.name} - Emoji ID: {item.emojiId}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MembersList;