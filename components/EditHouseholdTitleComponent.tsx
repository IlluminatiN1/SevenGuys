import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { IconButton, Portal, Provider } from "react-native-paper";

interface EditHouseholdTitleProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  onSave: (newTitle: string) => void;
}

export default function EditHouseholdModal({
  visible,
  onDismiss,
  title,
  onSave,
}: EditHouseholdTitleProps) {
  const [newTitle, setNewTitle] = useState<string>(title);

  useEffect(() => {
    if (visible) {
      setNewTitle(title);
    }
  }, [title]);

  const handleSave = () => {
    if (newTitle !== "") {
      onSave(newTitle);
      onDismiss();
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} transparent onRequestClose={onDismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Redigera titel</Text>
              <IconButton
                icon={"close"}
                size={20}
                iconColor="black"
                onPress={onDismiss}
                style={styles.closeButton}
              />
              <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <Button title="Spara" onPress={handleSave} />
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
