import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { db } from "../config/firebase";

export default function TaskDetailsModal({
  isVisible,
  onClose,
  task,
  onArchivedStatusChange,
}: {
  isVisible: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    reoccurence: number;
    score: number;
    id: string;
    isArchived: boolean;
  };
  onArchivedStatusChange: (taskId: string, newStatus: boolean) => void;
}) {
  const [isArchived, setIsArchived] = useState(task.isArchived);

  useEffect(() => {
    setIsArchived(task.isArchived);
  }, [task]);

  const toggleTaskArchivedStatus = async () => {
    const newStatus = !isArchived;
    const taskRef = doc(db, "task", task.id);
    await updateDoc(taskRef, { isArchived: newStatus });

    setIsArchived(newStatus);

    onArchivedStatusChange(task.id, newStatus);

    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={s.modalOverlay}>
        <Surface style={s.modalContainer}>
          <View style={s.modalHeader}>
            <Text style={s.modalHeaderText}>{task.title}</Text>
            <IconButton
              icon={"close"}
              onPress={onClose}
              style={s.closeIconButton}
            />
          </View>
          <Text style={s.label}>Beskrivning:</Text>
          <Text style={s.inlineValue}>{task.description}</Text>

          <View style={s.row}>
            <Text style={s.label}>Återkommer var:</Text>
            <Text style={s.inlineValue}>{task.reoccurence} dag(ar)</Text>
          </View>

          <View style={s.row}>
            <Text style={s.label}>Poängvärde:</Text>
            <Text style={s.inlineValue}>{task.score}</Text>
          </View>
          <TouchableOpacity
            style={[
              s.saveButton,
              { backgroundColor: isArchived ? "red" : "#3cb03a" },
            ]}
            onPress={toggleTaskArchivedStatus}
          >
            <Text style={s.saveButtonText}>
              {task.isArchived ? "Ej utförd" : "Utförd"}
            </Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  inlineValue: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#555",
  },
  saveButton: {
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
