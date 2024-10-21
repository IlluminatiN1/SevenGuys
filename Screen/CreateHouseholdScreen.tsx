import { Text, View } from "react-native";
import { validateHouseholdName } from "../utils/validations/household/HouseholdNameValidator";
export default function CreateHouseholdScreen() {
  
  // Använd validateHouseholdName("name"); för att kontrollera att namnet på household är längre än 3 tecken.
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Household screen</Text>
      
    </View>
    
    
  );
  
}
