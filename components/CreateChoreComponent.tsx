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
import { useAppDispatch } from "../store/hooks";
import { addTask } from "../store/task/taskActions";

export function CreateTaskPopUpScreen({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reoccurence, setReoccurence] = useState(1);
  const [score, setScore] = useState(1);

  const handleCreateTask = async () => {
    await dispatch(
      addTask({
        title,
        description,
        reoccurence,
        score,
        isArchived: false,
      })
    ).unwrap();
    onClose();
  };

  const increaseReoccurence = () => setReoccurence(reoccurence + 1);
  const decreaseReoccurence = () => setReoccurence(Math.max(1, reoccurence - 1));

  const increaseScore = () => setScore(score + 1);
  const decreaseScore = () => setScore(Math.max(1, score - 1));

  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={s.modalContainer}>
        <View style={s.content}>
          <View style={s.modalHeader}>
            <Text style={s.modalHeaderText}>Skapa en ny syssla</Text>
            <IconButton
              icon={"close"}
              onPress={onClose}
              style={s.closeIconButton}
            />
          </View>
          <TextInput
            label="Title"
            style={s.titleInput}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            label="Beskrivning"
            style={s.input}
            value={description}
            onChangeText={setDescription}
          />

          <Surface style={s.surface}>
            <View style={s.row}>
              <Text style={s.label}>Återkommer:</Text>
              <View style={s.buttonRow}>
                <Button onPress={decreaseReoccurence}>-</Button>
                <Text style={s.valueText}>{reoccurence} dag</Text>
                <Button onPress={increaseReoccurence}>+</Button>
              </View>
            </View>
          </Surface>
          <Surface style={s.surface}>
            <View style={s.row}>
              <Text style={s.label}>Värde:</Text>
              <View style={s.buttonRow}>
                <Button onPress={decreaseScore}>-</Button>
                <Text style={s.valueText}>{score}</Text>
                <Button onPress={increaseScore}>+</Button>
              </View>
            </View>
          </Surface>
        </View>
        <View>
          <View style={s.saveButton}>
            <Button
              icon="plus-circle-outline"
              textColor="white"
              onPress={handleCreateTask}
            >
              Spara
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
const s = StyleSheet.create({
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
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    marginHorizontal: 10,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#5856D6",
    paddingVertical: 10,
    paddingHorizontal: 130,
  },
});
