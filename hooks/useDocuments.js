import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export const useDocuments = () => {
    const [document, setDocument] = useState();
    
    const selectDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync()
        if (!result.canceled){
            
            setDocument({
                name: result.assets[0].name,
                uri: result.assets[0].uri
            })
        }
    }
    return {selectDocument, document}
}