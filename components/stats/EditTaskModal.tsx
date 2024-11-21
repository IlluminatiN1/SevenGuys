import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, IconButton, Surface, TextInput } from "react-native-paper";

export default function EditTaskModal({
  isVisible,
  onClose,
  task,
  onSave,
}: {
  isVisible: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    description: string;
    reoccurence: number;
    score: number;
  };
  onSave: (
    id: string,
    newTitle: string,
    newDescription: string,
    newReoccurence: number,
    newScore: number
  ) => void;
}) {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newReoccurence, setNewReoccurence] = useState(task.reoccurence);
  const [newScore, setNewScore] = useState(task.score);

  const handleSave = () => {
    onSave(task.id, newTitle, newDescription, newReoccurence, newScore);
    onClose();
  };

  const increaseReoccurence = () => setNewReoccurence(newReoccurence + 1);
  const decreaseReoccurence = () =>
    setNewReoccurence(Math.max(1, newReoccurence - 1));

  const increaseScore = () => setNewScore(newScore + 1);
  const decreaseScore = () => setNewScore(Math.max(1, newScore - 1));

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={s.modalOverlay}>
        <Surface style={s.modalContainer}>
          <View style={s.modalHeader}>
            <Text style={s.modalHeaderText}>Redigera syssla</Text>
            <IconButton
              icon={"close"}
              onPress={onClose}
              style={s.closeIconButton}
            />
          </View>
          <TextInput
            style={s.titleInput}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={s.input}
            value={newDescription}
            onChangeText={setNewDescription}
          />

          <Surface style={s.surface}>
            <View style={s.row}>
              <Text style={s.label}>Återkommer:</Text>
              <View style={s.buttonRow}>
                <Button onPress={decreaseReoccurence}>-</Button>
                <Text style={s.valueText}>{newReoccurence} dag</Text>
                <Button onPress={increaseReoccurence}>+</Button>
              </View>
            </View>
          </Surface>

          <Surface style={s.surface}>
            <View style={s.row}>
              <Text style={s.label}>Värde:</Text>
              <View style={s.buttonRow}>
                <Button onPress={decreaseScore}>-</Button>
                <Text style={s.valueText}>{newScore}</Text>
                <Button onPress={increaseScore}>+</Button>
              </View>
            </View>
          </Surface>

          <TouchableOpacity style={s.saveButton} onPress={handleSave}>
            <Text style={s.saveButtonText}>Spara</Text>
          </TouchableOpacity>
        </Surface>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  modalHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeIconButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  titleInput: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    paddingBottom: 50,
    borderRadius: 10,
    marginBottom: 40,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#5856D6",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
