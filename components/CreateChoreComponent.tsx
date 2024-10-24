import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Surface,
  TextInput,
} from "react-native-paper";

export function CreateChorePopUpScreen({ onClose }: { onClose: () => void }) {
  const [selectedRecurNumber, setSelectedRecurNumber] = useState(1);
  const [selectedScoreNumber, setSelectedScoreNumber] = useState(1);

  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={styles.modalContainer}>
        <View style={styles.content}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Skapa en ny syssla</Text>
            <IconButton
              icon={"close"}
              onPress={onClose}
              style={styles.closeIconButton}
            />
          </View>
          <TextInput label="Title" style={styles.titleInput} />
          <TextInput label="Beskrivning" style={styles.input} />

          <Surface style={styles.surface}>
            <View style={styles.row}>
              <Text style={styles.label}>Återkommer:</Text>
              <Button style={styles.surfaceButton}>
                var {selectedRecurNumber} dag
              </Button>
            </View>
          </Surface>
          <Surface style={styles.surface}>
            <View style={styles.row}>
              <Text style={styles.label}>Värde:</Text>
              <Button style={styles.surfaceButton}>
                var {selectedScoreNumber} dag
              </Button>
            </View>
          </Surface>
        </View>
        <View>
          <View style={styles.saveButton}>
            <Button
              icon="plus-circle-outline"
              textColor="white"
              onPress={() => console.log("Spara")}
            >
              Spara
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    width: "90%",
    paddingBottom: 60,
  },
  titleInput: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    paddingBottom: 50,
    borderRadius: 10,
    marginBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalHeaderText: {
    fontSize: 25,
    paddingBottom: 10,
  },
  closeIconButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  surface: {
    padding: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    marginRight: 10,
  },
  surfaceButton: {
    marginLeft: 10,
  },

  saveButton: {
    width: "100%",
    backgroundColor: "#5856D6",
    paddingVertical: 10,
    paddingHorizontal: 130,
  },
});
