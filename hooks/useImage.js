import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';

export const useImage =  () => {
    const [image, setImage] = useState();
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) {
            console.log(result)
            try {
              const imageBuffer = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                  encoding: FileSystem.EncodingType.Base64,
              });
  
              setImage({
                  uri: result.assets[0].uri,
                  buffer: imageBuffer,
                  name: result.assets[0].name
              });
          } catch (error) {
              console.error('Error reading image file:', error);
            
          }
          }
        console.log(result)  
        
    }
    return {pickImage, image}   
}

//RESULT SHAPE: 
// {
  // "assets":[
    //  {
        // "assetId":null,
        // "base64":null,
        // "duration":null,
        // "exif":null,
        // "fileName":null,
        // "fileSize":16726258,
        // "height":4285,
        // "mimeType":"image/jpeg",
        // "type":"image",
        // "uri": ""
        // "width":4284
    //  }
  // ],
  // "canceled":false
// }
// 