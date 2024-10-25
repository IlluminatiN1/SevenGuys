import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Portal, Provider } from "react-native-paper";

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
        <Modal
          visible={visible}
          transparent
          animationType="slide"
          onRequestClose={onDismiss}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Redigera hushållets namn</Text>
              <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <Button title="Spara" onPress={handleSave} />
              <Button title="Tillbaka" onPress={onDismiss} />
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
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
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
});
