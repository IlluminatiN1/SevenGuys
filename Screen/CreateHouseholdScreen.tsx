import { Alert, Text, View } from "react-native";
import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createHousehold } from "../store/household/houseHoldAction";

export default function CreateHouseholdScreen() {
  
 /*  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleCreateHousehold = () => {
      const owner = "currentUserId"; // Ersätt med admin's ID
      const members = [owner];
      dispatch(createHousehold({ name, owner, members }))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Household created successfully");
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
    }; */

  // Använd validateHouseholdName("name"); för att kontrollera att namnet på household är längre än 3 tecken.
  return (
    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Household screen</Text>
      
    </View>
    
    
  );
  
}
