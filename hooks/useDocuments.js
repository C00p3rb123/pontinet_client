import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
//Custom hook to handle document selection.
export const useDocuments = () => {
  const [document, setDocument] = useState();
  //Function to open the document picker and set the selected document.
  const selectDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled) {
      setDocument({
        name: result.assets[0].name, // Use result.name instead of result.assets[0].name
        uri: result.assets[0].uri, // Use result.uri instead of result.assets[0].uri
      });
    }
  };
  return { selectDocument, document };
};
