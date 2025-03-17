import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { IconButton, Portal, Provider } from "react-native-paper";
import { db } from "../config/firebase";

export default function EditHouseholdModal({
  isVisible,
  onClose,
  household,
  editHouseholdName,
}: {
  isVisible: boolean;
  onClose: () => void;
  household: {
    id: string;
    name: string;
  };
  editHouseholdName: (householdId: string, newName: string) => void;
}) {
  const [name, setNewTitle] = useState(household.name);

  useEffect(() => {
    setNewTitle(household.name);
  }, [household]);

  const updateNewTitle = async () => {
    const taskRef = doc(db, "households", household.id);
    await updateDoc(taskRef, { name });

    editHouseholdName(household.id, name);
    onClose();
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={isVisible} transparent onRequestClose={onClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Redigera titel</Text>
              <IconButton
                icon={"close"}
                size={20}
                iconColor="black"
                onPress={onClose}
                style={styles.closeButton}
              />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setNewTitle}
              />
              <Button title="Spara" onPress={updateNewTitle} />
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});
